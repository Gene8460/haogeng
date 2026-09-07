"""Validate products.js JSON structure and check each product's image fields."""
import re
import json

with open(r'C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('var PRODUCTS = [')
if start == -1:
    print('No PRODUCTS array found')
    exit(1)

# Find the matching closing bracket
depth = 0
i = start + len('var PRODUCTS = ')
in_string = False
escape = False
quote = None
while i < len(content):
    c = content[i]
    if escape:
        escape = False
        i += 1
        continue
    if c == '\\':
        escape = True
        i += 1
        continue
    if in_string:
        if c == quote:
            in_string = False
        i += 1
        continue
    if c in ('"', "'"):
        in_string = True
        quote = c
        i += 1
        continue
    if c == '[':
        depth += 1
    elif c == ']':
        depth -= 1
        if depth == 0:
            end = i + 1
            break
    i += 1
else:
    print('No closing bracket found')
    exit(1)

array_str = content[start + len('var PRODUCTS = '):end]
try:
    data = json.loads(array_str)
    print(f'Valid JSON. {len(data)} products.')
    for p in data:
        has_img = 'img' in p
        has_gallery = 'gallery' in p
        has_acc = 'accessoriesImg' in p
        print(f'  {p.get("id", "?"):25} cat={p.get("cat", "?"):10} img={p.get("img", "(none)"):28} gallery={has_gallery} acc={has_acc} model={p.get("model", "")}')
except json.JSONDecodeError as e:
    print(f'JSON ERROR: {e}')
    # Show problematic area
    lines = array_str.split('\n')
    if e.lineno <= len(lines):
        print(f'Line {e.lineno}: {lines[e.lineno-1]}')
