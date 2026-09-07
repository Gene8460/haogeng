"""Restore '{kW} kW / 5-15 HP @ 3600 rpm' format for tiller products.

Previous (wrong) replacement: all 'X.X kW / X.X HP @ 3600 rpm' → '5-15HP'.
User's actual intent:           keep kW, change HP number to '5-15 HP', keep @ 3600 rpm.

Format rules:
  • In features / specs sections (have @ 3600 rpm in original): "{kW} kW / 5-15 HP @ 3600 rpm"
  • In desc section (no @ 3600 rpm in original): "{kW} kW / 5-15 HP"
"""

import json
import re

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

# Per-tiller kW value
TILLER_KW = {
    "tiller-001":   4.0,
    "1WG-4-0A":     2.9,
    "1WG-4-05A":    3.5,
    "1WG-4-05A-Pro":3.8,
    "1WG-4-1A":     4.0,
    "1WG-6-3A":     6.3,
    "1WG-4-0BQ":    4.0,
    "1WG-4-05B":    4.05,
    "1WG-4-1B":     4.1,
    "1WG-6-3B":     6.3,
    "1WG-6-3B-T":   6.3,
}

def kw_str(kw):
    """Format kW value: drop trailing .0, else keep 1 decimal."""
    if kw == int(kw):
        return f"{int(kw)}.0"
    return f"{kw:g}" if isinstance(kw, float) and kw == round(kw, 1) else f"{kw}"

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

LANGS = ['en', 'zh', 'es', 'ru', 'fr']
changed = 0
for p in products:
    if p.get('cat') != 'tiller':
        continue
    pid = p['id']
    kw = TILLER_KW[pid]
    kw_text = f"{kw:g} kW" if kw == int(kw) else f"{kw:g} kW"
    # Format: "4.0 kW" or "4.05 kW"
    if kw == int(kw):
        kw_text = f"{int(kw)}.0 kW"
    elif kw == round(kw, 2):
        kw_text = f"{kw:.2f}".rstrip('0').rstrip('.') + ' kW' if '.' in f"{kw:.2f}" else f"{kw:g} kW"
    else:
        kw_text = f"{kw} kW"

    replacement_full = f"{kw_text} / 5-15 HP @ 3600 rpm"
    replacement_no_rpm = f"{kw_text} / 5-15 HP"

    for lang in LANGS:
        for key in ['desc', 'bestFor', 'features', 'specs']:
            obj = p.get(key, {})
            if not isinstance(obj, dict) or lang not in obj:
                continue
            val = obj[lang]
            if isinstance(val, str):
                # Replace "5-15HP" with full version (has @3600rpm context nearby)
                if '5-15HP' in val:
                    new_val = val.replace('5-15HP', replacement_full)
                    obj[lang] = new_val
                    changed += 1
            elif isinstance(val, list):
                for idx, item in enumerate(val):
                    if isinstance(item, str) and '5-15HP' in item:
                        val[idx] = item.replace('5-15HP', replacement_full)
                        changed += 1

print(f"Replaced {changed} occurrences with restored kW + '5-15 HP @ 3600 rpm'")

# Write back
new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")
