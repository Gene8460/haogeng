"""Replace English words in Chinese specs (Recoil etc.) with proper Chinese."""

import json
import re

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

# Translations for common English words in ZH specs
TRANSLATE = {
    "Recoil": "手拉反启动",
    "Electric": "电启动",
}

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
    zh = p.get('specs', {}).get('zh', [])
    for idx, line in enumerate(zh):
        new_line = line
        for eng, zh_word in TRANSLATE.items():
            new_line = re.sub(r'\b' + eng + r'\b', zh_word, new_line)
        if new_line != line:
            zh[idx] = new_line
            changed += 1
            print(f"  {p['id']} L{idx+1}: {line}  →  {new_line}")

print(f"\nFixed {changed} ZH lines")

new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")