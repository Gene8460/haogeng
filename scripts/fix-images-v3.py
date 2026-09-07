"""v3: 给所有产品补上 gallery 引用（每张主图至少 2 张 gallery）。

按用户反馈：8 个有 gallery 的产品在产品介绍页有图，其他 15 个没有。
本脚本：
  1. 读取 products.js 中的 img 字段
  2. 为每个没有 gallery 的产品，补 2 个 gallery 引用（X-2.jpg / X-3.jpg）
  3. 把对应主图复制为 X-2.jpg / X-3.jpg
  4. 重新生成 webp
"""
import os
import re
import shutil
import json
from PIL import Image

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"
IMG = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/images"

with open(JS, 'r', encoding='utf-8') as f:
    content = f.read()

# 解析 PRODUCTS 数组
start = content.find('var PRODUCTS = [')
i = start + len('var PRODUCTS = ')
depth = 0
while i < len(content):
    if content[i] == '[': depth += 1
    elif content[i] == ']':
        depth -= 1
        if depth == 0:
            end = i + 1
            break
    i += 1
products = json.loads(content[start + len('var PRODUCTS = '):end])

# 给没有 gallery 的产品补 2 张 gallery 引用（用主图复用）
new_gallery_count = 0
for p in products:
    if not p.get('gallery'):
        img_base = p['img'].rsplit('.', 1)[0]  # e.g. "tiller-001"
        p['gallery'] = [f"{img_base}-2.jpg", f"{img_base}-3.jpg"]
        new_gallery_count += 1

print(f"补了 {new_gallery_count} 个产品的 gallery 引用")

# 写回 products.js（保留 var PRODUCTS = [ ... ]; 之间的内容）
new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
# 原文缩进是 2 空格，每行 "    { ... }," 这样的格式
# 直接覆盖 PRODUCTS 数组内容（其它代码如 renderProducts 等保留）
new_content = content[:start + len('var PRODUCTS = ')] + "\n" + new_array_str + "\n" + content[end:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js 已更新（{new_gallery_count} 个新 gallery 引用）")

# 创建 / 复制对应 gallery 文件
created_files = []
for p in products:
    for g in p.get('gallery', []):
        g_path = os.path.join(IMG, g)
        if os.path.exists(g_path):
            continue
        # 从主图复制
        primary = os.path.join(IMG, p['img'])
        if os.path.exists(primary):
            shutil.copy2(primary, g_path)
            created_files.append(g)
            print(f"  [+] {g} (from {p['img']})")
        else:
            print(f"  [MISS] {g} (primary {p['img']} not found)")

print(f"\n新建 {len(created_files)} 个 gallery 文件")

# 生成对应 webp
webp_created = []
for f in created_files:
    src = os.path.join(IMG, f)
    dst = os.path.join(IMG, f.rsplit('.', 1)[0] + '.webp')
    img = Image.open(src)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    img.save(dst, 'WEBP', quality=80, method=6)
    webp_created.append(f.rsplit('.', 1)[0] + '.webp')

print(f"生成 {len(webp_created)} 个 webp")
