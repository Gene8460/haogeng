"""Replace 'X.X kW / X.X HP @ 3600 rpm' with '5-15HP' across all 11 tiller products.

Scope: only products where cat == 'tiller'. Five languages affected: en/zh/es/ru/fr.
Two patterns to replace:
  1. 'X.X kW / X.X HP @ 3600 rpm' (in features and specs)
  2. 'X.X kW / X.X HP'           (in desc, no @rpm)
"""

import json
import re

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

# Pattern 1: "4.0 kW / 5.4 HP @ 3600 rpm" → "5-15HP"
# Pattern 2: "4.0 kW / 5.4 HP" (without @ rpm) → "5-15HP"
PATTERN_RPM = re.compile(r'\d+(?:\.\d+)?\s*kW\s*/\s*\d+(?:\.\d+)?\s*HP\s*@\s*3600\s*rpm')
PATTERN_NO_RPM = re.compile(r'\d+(?:\.\d+)?\s*kW\s*/\s*\d+(?:\.\d+)?\s*HP(?!\s*@)')

LANGS = ['en', 'zh', 'es', 'ru', 'fr']

# Per-language label for "rated power" prefix in specs (so the result reads naturally)
def localize_replacement(text, lang):
    return text  # all languages use plain "5-15HP" — that's a universal format

changed = 0
for p in products:
    if p.get('cat') != 'tiller':
        continue
    for lang in LANGS:
        for key in ['desc', 'bestFor', 'features', 'specs']:
            obj = p.get(key, {})
            if not isinstance(obj, dict) or lang not in obj:
                continue
            val = obj[lang]
            if isinstance(val, str):
                new_val = PATTERN_RPM.sub('5-15HP', val)
                new_val = PATTERN_NO_RPM.sub('5-15HP', new_val)
                if new_val != val:
                    obj[lang] = new_val
                    changed += 1
            elif isinstance(val, list):
                for idx, item in enumerate(val):
                    if isinstance(item, str):
                        new_item = PATTERN_RPM.sub('5-15HP', item)
                        new_item = PATTERN_NO_RPM.sub('5-15HP', new_item)
                        if new_item != item:
                            val[idx] = new_item
                            changed += 1

print(f"Replaced {changed} occurrences across tiller products")

# Write back
new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")
