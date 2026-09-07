"""Change ditching machine ZH spec: HP -> 匹, matching tiller format."""

import json

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

with open(JS, 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('var PRODUCTS = ')
i = start_idx + len('var PRODUCTS = ')
depth = 0
while i < len(content):
    if content[i] == '[': depth += 1
    elif content[i] == ']':
        depth -= 1
        if depth == 0:
            end_idx = i + 1
            break
    i += 1
products = json.loads(content[start_idx + len('var PRODUCTS = '):end_idx])

changed = 0
for p in products:
    if p.get('cat') != 'ditching':
        continue
    specs = p.get('specs', {})
    zh = specs.get('zh', [])
    if not zh:
        continue
    engine = zh[0]
    if '马力8-15HP' in engine:
        zh[0] = engine.replace('马力8-15HP', '马力8-15匹')
        changed += 1

print(f"Changed {changed} ditching ZH engine lines (HP -> 匹)")

new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")