"""Preview: Replace tiller-001 specs.zh with ONLY the lines the user specified.

User wants only:
  发动机: 170四冲程汽油机或两冲程汽油机，风冷单缸，马力5-15匹各种型号都有
  传动方式: 齿轮直连，省油经济实惠

All other spec lines (displacement, dimensions, weight, etc.) should be removed.
"""

import json

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

USER_ENGINE_ZH = "发动机：170四冲程汽油机或两冲程汽油机，风冷单缸，马力5-15匹各种型号都有"
USER_TRANS_ZH = "传动方式：齿轮直连，省油经济实惠"

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

# Only modify tiller-001 specs.zh (just for preview)
for p in products:
    if p['id'] == 'tiller-001':
        p.setdefault('specs', {})['zh'] = [USER_ENGINE_ZH, USER_TRANS_ZH]
        break

new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"tiller-001 specs.zh preview updated. Total bytes: {len(new_content)}")