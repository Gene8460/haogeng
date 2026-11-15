"""Find English words in Chinese ditching specs."""
import json
import re

with open(r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js", "r", encoding="utf-8") as f:
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

# Find English words (3+ char ASCII starting with uppercase) in ZH specs
print("=== ZH lines containing English words ===")
for p in products:
    if p.get('cat') != 'ditching':
        continue
    print(f"\n--- {p['id']} ---")
    for idx, line in enumerate(p['specs'].get('zh', [])):
        eng = re.findall(r'\b[A-Z][a-zA-Z]{2,}\b', line)
        if eng:
            print(f"  L{idx+1}: {line}  ← English: {','.join(eng)}")