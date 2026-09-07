"""Inspect the git version of products.js to find original detailed specs."""
import json

with open(r'C:/Users/Administrator/AppData/Local/Temp/products-original.js', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('var PRODUCTS = ')
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

# Write to a UTF-8 file to avoid console encoding issues
with open(r'C:/Users/Administrator/AppData/Local/Temp/original-specs.txt', 'w', encoding='utf-8') as out:
    for p in products:
        if p.get('cat') != 'tiller':
            continue
        out.write(f"\n=== {p['id']} ({p.get('model')}) ===\n")
        for lang in ['en', 'zh']:
            out.write(f"  [{lang}]\n")
            for s in p['specs'][lang]:
                out.write(f"    {s}\n")
print('Written to C:/Users/Administrator/AppData/Local/Temp/original-specs.txt')