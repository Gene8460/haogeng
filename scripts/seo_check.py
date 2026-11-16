#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""P0 SEO 自检：JSON-LD / 关键标签 / hreflang 互指 / canonical / 资源 / 乱码 / sitemap。

跑法：python scripts/seo_check.py
ROOT 取本脚本所在仓库根目录，脚本在哪个副本里跑就检查哪个副本。
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://haogeng.net"
LANGS = ["en", "zh", "sw", "es", "ru", "fr"]
ok = True


def fail(msg):
    global ok
    ok = False
    print("  [FAIL] " + msg)


def good(msg):
    print("  [ OK ] " + msg)


def read(rel):
    rel = rel.replace("/", os.sep).lstrip(os.sep)
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


def url_to_rel(url):
    if not url.startswith(SITE):
        return None
    return url[len(SITE):]


def rel_to_file(rel):
    rel = rel.split("?")[0].split("#")[0]
    if rel.endswith("/"):
        rel += "index.html"
    return os.path.join(ROOT, rel.lstrip("/").replace("/", os.sep))


def generated_pages():
    pages = []
    for lang in LANGS:
        d = os.path.join(ROOT, lang)
        if not os.path.isdir(d):
            continue
        for cur, _dirs, files in os.walk(d):
            for fn in files:
                if fn.endswith(".html"):
                    full = os.path.join(cur, fn)
                    rel = "/" + os.path.relpath(full, ROOT).replace(os.sep, "/")
                    pages.append(rel)
    return sorted(pages)


def jsonld_check(files):
    bad = 0
    for f in files:
        s = read(f.replace("/", os.sep))
        blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
        if not blocks:
            fail(f + " 没有 JSON-LD")
            bad += 1
            continue
        for i, b in enumerate(blocks):
            try:
                d = json.loads(b)
            except Exception as e:
                fail("%s block%d JSON 解析失败: %s" % (f, i, e))
                bad += 1
                continue
            txt = json.dumps(d, ensure_ascii=False)
            if '"price": "0"' in txt or '"price":"0"' in txt:
                fail("%s block%d 仍含 price:0" % (f, i))
                bad += 1
    return bad


pages = generated_pages()
print("=== 1. JSON-LD 解析校验（模板 + 全部静态页）===")
# 根目录 index.html 现在是「跳转到 /en/」的跳转页，没有 JSON-LD 属正常；
# 真正的首页模板在 templates/index.html
targets = ["templates/index.html", "product.html"] + [p.replace(os.sep, "/") for p in pages]
if jsonld_check(targets) == 0:
    good("%d 个页面的 JSON-LD 全部可解析，且不含 price:0" % len(targets))

print("=== 2. 关键标签检查 ===")
checks = {
    "index.html": [("canonical", r'<link rel="canonical" href="https://haogeng\.net/en/">'),
                   ("robots meta", r'name="robots"'),
                   ("og:title", r'property="og:title"'),
                   ("twitter:card", r'name="twitter:card"')],
    "product.html": [("robots meta", r'name="robots"'),
                     ("og:title(静态兜底)", r'property="og:title"'),
                     ("twitter:card", r'name="twitter:card"')],
}
checks["templates/index.html"] = checks["index.html"]
for f, cs in checks.items():
    s = read(f)
    for label, pat in cs:
        (good if re.search(pat, s) else fail)("%s: %s" % (f, label))

# 根目录必须跳到 /en/（裸域名不能停在旧英文模板上）
root = read("index.html")
for label, pat in [("根页 meta refresh → /en/", r'http-equiv="refresh" content="0; url=/en/"'),
                   ("根页 canonical → /en/", r'<link rel="canonical" href="https://haogeng\.net/en/">'),
                   ("根页 noindex", r'name="robots" content="noindex, follow"'),
                   ("根页 6 语种 hreflang", r'hreflang="zh"'),
                   ("根页语言直链兜底", r'href="/zh/"')]:
    (good if re.search(pat, root) else fail)(label)

print("=== 3. hreflang 互指（x-default 允许与某个语种同 URL）===")
if not pages:
    fail("没有找到任何静态页 —— 先跑 node scripts/build-static.js .")
def page_url(rel):
    if rel.endswith("/index.html"):
        return SITE + rel[:-len("index.html")]
    return SITE + rel


page_urls = {}
page_alts = {}
for rel in pages:
    u = page_url(rel)
    page_urls[u] = rel
    page_alts[u] = re.findall(r'hreflang="([^"]+)"\s+href="([^"]+)"', read(rel))

hl_bad = 0
for rel in pages:
    u = page_url(rel)
    alts = page_alts[u]
    langs = [a for a, _ in alts]
    if len(alts) < 2 or "x-default" not in langs:
        fail("%s: hreflang %d 条（%s）" % (rel, len(alts), ",".join(langs)))
        hl_bad += 1
        continue
    m = re.match(r"^/([a-z]{2})/", rel)
    self_lang = m.group(1) if m else None
    if dict(alts).get(self_lang) != u:
        fail("%s: 自己的 hreflang 未自指" % rel)
        hl_bad += 1
        continue
    for _lang2, u2 in alts:
        if u2 not in page_urls:
            fail("%s: alternate 目标不存在 %s" % (rel, u2))
            hl_bad += 1
            continue
        back = dict(page_alts[u2]).get(self_lang)
        if back != u:
            fail("%s: 与 %s 互指断裂（对方 %s 指回 %s）" % (rel, u2, self_lang, back))
            hl_bad += 1
if hl_bad == 0:
    good("%d 个静态页：hreflang 自指 + 双向互指全部正确" % len(pages))


print("=== 4. canonical 自指 ===")
cbad = 0
for rel in pages:
    s = read(rel.replace("/", os.sep))
    m = re.search(r'<link rel="canonical" href="([^"]+)"', s)
    if not m:
        fail("%s: 没有 canonical" % rel)
        cbad += 1
    elif m.group(1) != page_url(rel):
        fail("%s: canonical=%s，应为 %s" % (rel, m.group(1), page_url(rel)))
        cbad += 1
if cbad == 0:
    good("%d 个静态页 canonical 全部自指" % len(pages))

print("=== 5. 静态页资源绝对路径 + 文件存在 ===")
rbad = 0
for rel in pages:
    s = read(rel.replace("/", os.sep))
    for path in re.findall(r'(?:src|href)="((?:css|js|images)/[^"]*)"', s):
        fail("%s: 相对路径未转绝对: %s" % (rel, path))
        rbad += 1
    for p in re.findall(r'(?:src|href)="(/[^"]+)"', s):
        pp = p.split("?")[0].split("#")[0]
        if not re.search(r"\.(css|js|jpg|jpeg|png|webp|svg|ico|json)$", pp):
            continue
        if not os.path.isfile(rel_to_file(pp)):
            fail("%s: 资源不存在 %s" % (rel, pp))
            rbad += 1
if rbad == 0:
    good("静态页没有相对路径，所有本地资源文件都存在")

print("=== 6. 乱码残留扫描（es/ru/fr/sw 语种块） ===")
lat = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")


def bad(s):
    if not s or not any("\u4e00" <= c <= "\u9fff" or "\u3000" <= c <= "\u303f" for c in s):
        return False
    try:
        fixed = s.encode("gbk").decode("utf-8")
    except Exception:
        return False
    return sum(c in lat for c in fixed) * 2 >= len(fixed)


hits = 0
for path in ("js/i18n.js", "js/products.js"):
    with open(os.path.join(ROOT, path), encoding="utf-8") as f:
        for n, line in enumerate(f, 1):
            for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', line):
                try:
                    s = json.loads('"' + m.group(1) + '"')
                except Exception:
                    continue
                if bad(s):
                    hits += 1
                    fail("%s L%d: %s" % (path, n, s[:70]))
if hits == 0:
    good("没有 UTF-8/GBK 乱码残留")


print("=== 7. sitemap 覆盖 ===")
sm = read("sitemap.xml")
locs = re.findall(r"<loc>(.*?)</loc>", sm)
if len(locs) != len(set(locs)):
    fail("sitemap 有重复 URL")
else:
    good("sitemap %d 条 URL，无重复" % len(locs))
if "<lastmod>" not in sm:
    fail("sitemap 缺 lastmod")
else:
    good("sitemap 已带 lastmod (%d 条)" % sm.count("<lastmod>"))
page_urls_all = set(page_url(r) for r in pages)
sm_urls = set(locs)
missing = [r for r in pages if page_url(r) not in sm_urls]
stale = [u for u in locs if u not in page_urls_all]
if missing:
    fail("sitemap 漏了 %d 个页面: %s" % (len(missing), missing[:5]))
if stale:
    fail("sitemap 里有 %d 个页面文件不存在: %s" % (len(stale), stale[:5]))
else:
    good("sitemap 覆盖全部 %d 个静态页" % len(pages))

print("=== 8. 脚本版本号一致性 ===")
for f in ("templates/index.html", "product.html"):
    s = read(f)
    vs = set(re.findall(r'js/([\w-]+\.js)\?v=(\d+)', s))
    vers = set(v for _, v in vs)
    (good if len(vers) == 1 else fail)("%s 缓存版本: %s" % (f, sorted(vers)))

print("=== 9. GitHub Pages / Jekyll 构建安全（Liquid 冲突） ===")
# Pages 用 Jekyll 构建，.md / .html 会被 Liquid 渲染；正文里出现 {{...}} 会直接让构建失败
liq_bad = []
liq_files = [f for f in os.listdir(".") if f.lower().endswith((".md", ".markdown", ".html", ".htm"))]
if os.path.isdir("docs"):
    liq_files += ["docs/" + f for f in os.listdir("docs")]
for rel in sorted(set(liq_files)):
    if not os.path.isfile(rel):
        continue
    depth = 0
    for n, line in enumerate(read(rel).split("\n"), 1):
        opens = line.count("{% raw %}")
        closes = line.count("{% endraw %}")
        if depth == 0 and "{{" in line and opens == 0:
            liq_bad.append("%s L%d 裸双花括号" % (rel, n))
        depth += opens
        depth -= closes
        if depth < 0:
            liq_bad.append("%s L%d endraw 多余（raw 块嵌套错乱）" % (rel, n))
            depth = 0
    if depth != 0:
        liq_bad.append("%s raw 块未闭合" % rel)
if liq_bad:
    fail("这些文件里的 {{ 会被 Jekyll 当成 Liquid 变量，构建必挂（用 {% raw %} 包起来）: %s" % liq_bad[:6])
else:
    good("Markdown / HTML 里没有裸露的 {{ }}，Jekyll 构建不会被 Liquid 打挂")

print("=== 10. 图片 URL 版本号一致性（换图不 bust 缓存 = 老用户看旧图） ===")
# 背景：浏览器/CDN 对 images/ 下的文件缓存 4 小时（max-age=14400）。
#      换了图但 URL 不变，老板浏览器里还是旧图（2026-11-16 /zh/factory.html 实测）。
#      规则：js/seo-urls.js 里的 IMG_V 是唯一版本号，换任何图都要 +1；
#            生成器（versionImages）会给所有 /images/... 补 ?v=IMG_V。
url_js = read("js/seo-urls.js")
m = re.search(r"var\s+IMG_V\s*=\s*(\d+)", url_js)
if not m:
    fail("js/seo-urls.js 里找不到 IMG_V 定义")
    img_v = None
else:
    img_v = m.group(1)
    # 客户端 JS 必须从同一份取版本号，不能各自硬编码
    for js in ("js/products.js", "js/product.js"):
        s2 = read(js)
        if "HaogengUrls" not in s2:
            fail("%s 没有从 HaogengUrls 取 IMG_V" % js)
        elif re.search(r"['\"]/?images/\$\{", s2):
            fail("%s 里还有没加版本号的图片路径" % js)

if img_v:
    unversioned = []
    checked = 0
    targets = ["index.html", "templates/index.html", "product.html"] + pages
    for rel in targets:
        fp = rel_to_file(rel)
        if not os.path.isfile(fp):
            continue
        s3 = read(fp)
        for mm in re.finditer(r"""(/images/[A-Za-z0-9._-]+)(\?[^"'\s<>]*)?""", s3):
            checked += 1
            q = mm.group(2) or ""
            if q != "?v=" + img_v:
                unversioned.append("%s: %s%s" % (rel, mm.group(1), q or "(无版本号)"))
    if unversioned:
        fail("%d 处图片 URL 版本不对（当前 IMG_V=%s）: %s" % (len(unversioned), img_v, unversioned[:6]))
    else:
        good("IMG_V=%s，%d 处图片 URL 版本号全部一致" % (img_v, checked))

print()
print("结果: " + ("全部通过 ✅" if ok else "有失败项 ❌"))
sys.exit(0 if ok else 1)
