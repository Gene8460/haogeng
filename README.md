# 柳州浩耕国际 — 外贸网站使用说明

## 网站是什么

一套**纯静态**外贸展示网站，无需服务器，可免费托管在 GitHub Pages / Gitee Pages。

- 主页默认**英文**，右上角可切换 中文 / 英文 / 西班牙语 / 俄语 / 法语
- 产品按三大类展示：微耕机、开沟培土机、抽水机
- 有询盘表单（点击后打开访客的邮箱客户端，直接发到你邮箱）

## 目录结构

```
haogeng-website/
├── index.html          # 页面结构（一般不用动）
├── product.html        # 详情页模板
├── css/
│   ├── style.css       # 首页样式
│   └── product.css     # 详情页样式
├── js/
│   ├── i18n.js         # ★ 多语言文字（改文案在这里）
│   ├── products.js     # ★ 产品数据（加/改产品在这里）
│   ├── product.js      # 详情页渲染
│   └── main.js         # 逻辑（一般不用动）
├── images/             # ★ 产品图片放这里
├── robots.txt          # 搜索引擎爬虫规则
├── sitemap.xml         # 站点地图
└── README.md           # 本说明
```

## 日常怎么维护（改这 2 个文件就够）

### 1. 改产品 / 加产品 → 打开 `js/products.js`

每个产品是一段这样的代码：

```js
{
  id: "tiller-001",
  name: { en: "170 Gasoline Micro Tiller", zh: "170汽油微耕机" },
  model: "1WG-4.0AQ",
  cat: "tiller",                      // 分类：tiller/ditching/pump
  specs: { en: ["...", "..."], zh: ["...", "..."], es: [...], ru: [...], fr: [...] },
  img: "tiller-001.jpg",              // 主图（放 images/）
  gallery: ["tiller-001-2.jpg"],      // 选填：详情页图集
  desc:    { en: "...", zh: "...", es: "...", ru: "...", fr: "..." },
  bestFor: { en: [...], zh: [...], ... },
  features:{ en: [...], zh: [...], ... }
}
```

- **加新产品**：复制一段，改文字即可。`id` 必须唯一
- **改参数**：改 `specs` 里的内容（**5 个语种都要改**，否则其他语种会回退到英文）
- **配图片**：图片放到 `images/` 文件夹，`img` 填文件名
- **配图集**：`gallery` 数组里的图会出现在详情页轮播里

### 2. 改文案 / 换语言 → 打开 `js/i18n.js`

里面按语言分了字典（en / zh / es / ru / fr），想改哪句就找到对应文字改掉。

例如改英文首页标题：
```js
title: "Factory-Direct Agricultural Machinery",
```
改成：
```js
title: "Your New Title Here",
```

### 3. 换联系方式（邮箱/电话/地址）

打开 `index.html`，搜索 `138 7722 8460` 和 `sales@haogeng.net`，换成你的真实信息。
**三处都要改**：
1. 页面显示的 `contact-info` 区块
2. `js/main.js` 里 `WA_NUMBER` 和 `MAIL_TO` 两个常量
3. `js/product.js` 里同样两个常量（询盘弹窗）

## 分类对照

| cat 值 | 含义 |
|--------|------|
| `tiller` | 微耕机 |
| `ditching` | 开沟培土机 |
| `pump` | 抽水机 |

## 当前联系方式

- **WhatsApp / Phone**：+86 138 7722 8460
- **Email**：sales@haogeng.net
- **地址**：No. 86, Liugong Avenue, Liunan District, Liuzhou City, Guangxi, China

## SEO 必做项

### 已完成（P0 技术修复，2026-11-14）

- ✅ 首页 title / description 关键词化：`Micro Tiller & Water Pump Manufacturer China | Liuzhou Haogeng`
- ✅ 全站 canonical（首页静态 + 详情页按产品 id 由 JS 注入）
- ✅ `meta robots`：`index, follow, max-image-preview:large, max-snippet:-1`
- ✅ JSON-LD：首页 `Organization + WebSite + WebPage`；详情页 `Organization + WebSite`（静态）+ `Product + BreadcrumbList + WebPage`（JS 注入）
- ✅ Product schema 修掉 `offers.price: "0"`（Google 会判 Missing price 直接忽略）→ 整块移除 Offer，**没有真实 FOB 价前不要加回来**；`offers` 模板注释留在 `js/product.js`
- ✅ Product 参数表 → `additionalProperty`（PropertyValue），可进 Google 商品规格富摘要
- ✅ 详情页 OG / Twitter 卡片按产品动态覆写（`og:url` 带 id，23 个产品不再共用同一个分享链接）
- ✅ 品牌实体统一：`brand: Guigeng`（alternateName: Haogeng）、`manufacturer: 广西立创机械`、`seller: 浩耕`
- ✅ 详情页 description 按词截断（原来 `substring(0,160)` 会把词切一半），并按语种追加工厂直供补充句
- ✅ 详情页 `<html lang>` 跟随当前语言
- ✅ hreflang：6 个语种共用一个 URL 会被 Google 整组忽略 → 只保留合法的 `x-default`，等 P1 真实多语言 URL 上线再补全互指
- ✅ ES / FR 配件文案乱码（`dise馻das` / `Rizi猫res` 等 UTF-8→GBK 损坏）已修复
- ✅ `sitemap.xml` 24 条 URL 全部补 `lastmod`；新增 `404.html`（robots.txt 早已引用但文件缺失）
- ✅ 修掉 `index.html` 里重复的 `alt` 属性

### P1：多语言静态站（✅ 2026-11-15 已上线：165 个页面 + 新 sitemap）

站点根目录现在只有 24 个可索引 URL，6 个语种在爬虫眼里是同一个页面 —— 这是 SEO 的天花板。
P1 用静态生成把每个语种拆成真实 URL：

```
/en/                                     首页（每个语种一份）
/en/micro-tiller.html                    品类落地页（3 个品类 × 6 语种 = 18）
/en/product/1wg-4-05a-gasoline-micro-tiller.html    产品页（23 产品 × 6 语种 = 138）
/zh/…  /sw/…  /es/…  /ru/…  /fr/…        同一套结构，各语种独立
```

合计 **165 个页面**（162 主体 + EN 的 FAQ / 指南索引 / 指南文章 3 个），每个页面都有自己的 title / description / canonical / hreflang 互指 / JSON-LD。

**生成器**：`scripts/build-static.js`（Node，零依赖）

```bash
node scripts/build-static.js          # 输出到 ./dist（不动线上）
node scripts/build-static.js .        # 直接写站点根目录（上线用）
```

生成器做的事：
- 读 `js/products.js` + `js/i18n.js`，把 `data-i18n` 的文案在**服务端**替换成目标语种（不靠 JS 渲染，爬虫直接看到正文）
- 首页产品区渲染成三个品类分块（不再用 JS 筛选按钮）
- 品类页 = 真实落地页；产品页 = 完整参数表 + 描述 + 适用场景 + 特性（服务端渲染）
- 资源路径全部改成根绝对路径（`/css/`、`/js/`、`/images/`），子目录下才不会 404
- 语言切换器改成真实 `<a>` 链接（跳到对应语种的同一个页面）
- canonical 自指 + 6 语种 hreflang 互指 + x-default → 英文
- JSON-LD：首页 `Organization+WebSite+WebPage`，品类页 `CollectionPage+ItemList+BreadcrumbList`，产品页 `Product+additionalProperty+BreadcrumbList`
- 重新生成 `sitemap.xml`（带 `lastmod` + `xhtml:link` 多语种互指）
- 跑完打印报告：缺翻译的 i18n key、缺主图的产品、重复 URL

**URL 规则**写在 `js/seo-urls.js`（浏览器端和生成器共用一份，不会跑偏）：
`/{lang}/` · `/{lang}/{品类slug}.html` · `/{lang}/product/{型号}-{燃料}-{品类slug}.html`
例：`/en/product/1wg-4-05a-gasoline-micro-tiller.html`、`/fr/motoculteur.html`、`/zh/wei-geng-ji.html`
⚠️ 这套地址一旦上线并被收录就不能再改，改了等于换站（外链和 sitemap 全废）。

**上线步骤（顺序很重要）**

1. `node scripts/build-static.js .` —— 把生成的 `en/ zh/ sw/ es/ ru/ fr/ sitemap.xml` 写进站点根目录
2. 检查一遍 `dist`/`en` 里的页面有没有异常，再一起提交、推送
3. 推送后 `https://haogeng.net/en/`、`https://haogeng.net/zh/` 应能正常打开
4. 到 Google Search Console 提交 `https://haogeng.net/sitemap.xml`，用 URL 检查工具请求索引

⚠️ 不要只推 `index.html` 的 canonical/hreflang 改动而不推静态页 —— 会全部指向 404。

### 配套改动（已改好）

- `js/seo-urls.js`（新）：URL 规则、品类 slug、燃料识别（从参数表判断汽油/柴油）
- `js/main.js`：静态页用 `<html data-lang>` 钉死语言（否则用户上次选的语种会改掉页面语言，hreflang 对不上）；`renderProducts/initFilters` 加了存在性判断（静态页不加载 `products.js`）
- `js/product.js`：老页面 `product.html?id=xx` 的 canonical 改指到新的静态产品页，并注入 6 语种 hreflang —— 新旧两套 URL 不再抢权重
- `js/products.js`：列表卡片链接改指静态产品页
- `css/style.css`：`url('images/…')` 改绝对路径（子目录下会 404）；新增 `.cat-block` 样式
- `index.html`：canonical → `https://haogeng.net/en/`，补全 6 语种 hreflang

### P2：选型指南 / FAQ（技术底座已完成，内容待灌入）

P1 的 162 个页面全是产品说明书型页面，接得住"型号""参数"类搜索词，接不住"怎么选""X 还是 Y"这类有量的长尾词。P2 就是补这一层。

**新增 URL 规则**（跟 P1 一样，上线被收录后不能改）：

```
/en/guides.html                    指南索引页
/en/guide/{slug}.html              单篇指南
/en/faq.html                       汇总 FAQ 页
```

**内容文件**：`content/articles.js`（结构见文件头注释）

**参数占位符（关键设计）**：文章正文里的机型参数**不手写**，用占位符，生成器从 `js/products.js` 现取现填：

{% raw %}
{{spec:1WG-4.05A:Rated power}}   →  3.5 kW / 5-15 HP @ 3600 rpm
```
{% endraw %}

- 产品表改了，所有文章自动跟着改，不会出现"文章和产品表打架"
- **AI 起草文章时不可能编造参数** —— 数字根本不是 AI 写的
- 写错了（型号名或字段名不存在）生成器报告会列出来，必须清零

**站内链接占位符**：`[[model:1WG-4.05A]]`（链产品页）、`[[cat:ditching|文字]]`（链品类页）、`[[home|文字]]`（链首页联系区）—— 跨语种自动改路径，翻译时不会指到错页面。

**生成器新增**：`buildGuidesIndex` / `buildArticle` / `buildFaq`；首页挂「选型指南」区块，品类页和产品页挂相关指南（消孤岛页），导航加 Guides 入口，sitemap 加新 URL，报告新增「文章缺翻译」「参数占位符错误」「文章缺首图」三项检查。

> 当前状态：技术底座已就绪，EN 母稿 1 篇（`how-to-choose-a-micro-tiller`）待老板校术语。SW / FR 翻译等 EN 定稿后再做。

### 待做

- ⚠️ **P2 内容**：EN 母稿还差 14 篇（选型 7 + 对比 3 + 使用维护 2 + FAQ 1），见 `docs/P2-content-plan.md`
- ⚠️ **待老板操作**：到 Google Search Console 提交 sitemap `https://haogeng.net/sitemap.xml`（站内已上线），用 URL 检查工具批量请求索引
- ⚠️ **待老板操作**：到 Bing Webmaster 提交一次 `https://haogeng.net/sitemap.xml`
- ⚠️ 用 Rich Results Test 验证结构化数据
- ✅ ES / RU / FR 的 `news` 字典键、`nav.news`、6 语种 `brand.tagline` 已补齐，生成器报告 [i18n 缺失] = 0

自检脚本：`python scripts/seo_check.py`

## 分析追踪

- **Google Analytics 4**：测量 ID `G-EN7BG78YJV`（在 `index.html` 和 `product.html` 的 `<head>`）
- **Microsoft Clarity**：项目 ID `yc0hril0fu`
- 已埋事件：`view_product`（产品卡片点击）、`language_switch`、`generate_lead`（询盘提交）、`contact`（WhatsApp/Email 点击）

## 如何免费上线

1. 注册 GitHub 账号 → 新建仓库 `haogeng`（或 `用户名.github.io`）
2. 把 `haogeng-website` 文件夹里的内容上传
3. Settings → Pages → 选 main 分支根目录 → 保存
4. 得到免费网址 `你的用户名.github.io/haogeng`

（国内可用 Gitee Pages 替代，速度更快）

## 需要改的重要事项（上线前必做）

- [x] 把邮箱换成企业邮箱 `sales@haogeng.net`
- [ ] 把电话 `+86 138 7722 8460` 确认无误
- [ ] 上传所有产品真实图片到 `images/`（当前可能缺 `hero-tiller.jpg`；`tiller_acc_v10.jpg`、`tiller_acc_v11.jpg` 已存在）
- [ ] 绑定自己的域名 `haogeng.net`（`CNAME` 文件已写好）
- [ ] 到 Google Search Console 提交 sitemap
- [ ] 检查 GA4 / Clarity ID 是否为你自己的号