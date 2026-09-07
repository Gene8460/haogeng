"""Cleanup: undo overly-eager prefix additions.

The previous add-spec-labels.py incorrectly added '发动机：' prefix to the rated-power
line (it matched because line contains '5-15 HP'), and added '传动方式：' prefix
to the transmission line.

User instruction: '只要我写出来的话其他的都不要' (only what I wrote, other updates
are not needed). So we revert the unintended prefix additions.
"""

import json

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

# Patterns that got wrongly prefixed:
#   "发动机：额定功率：..."  →  "额定功率：..."
#   "发动机：Rated power:..." →  "Rated power: ..."
#   "发动机：Potencia nominal:..." →  "Potencia nominal: ..."
#   "发动机：Puissance nominale:..." →  "Puissance nominale: ..."
#   "发动机：Номинальная мощность:..." →  "Номинальная мощность: ..."
#   "传动方式：齿轮直连，省油经济实惠" →  "齿轮直连，省油经济实惠"
#   "Transmission: Direct gear drive..." →  "Direct gear drive..."
#   etc.

RATED_POWER_PATTERNS = [
    ("发动机：额定功率：", "额定功率："),
    ("发动机：Rated power: ", "Rated power: "),
    ("发动机：Potencia nominal: ", "Potencia nominal: "),
    ("发动机：Puissance nominale: ", "Puissance nominale: "),
    ("发动机：Номинальная мощность: ", "Номинальная мощность: "),
]

TRANSMISSION_PATTERNS = [
    ("传动方式：齿轮直连，", "齿轮直连，"),
    ("Transmission: Direct gear drive, ", "Direct gear drive, "),
    ("Transmisión: directa por engranajes, ", "directa por engranajes, "),
    ("Привод: прямой зубчатый, ", "прямой зубчатый, "),
    ("Transmission: directe par engrenages, ", "directe par engrenages, "),
]


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
fixed = 0
for p in products:
    if p.get('cat') != 'tiller':
        continue
    specs = p.get('specs', {})
    for lang in LANGS:
        lang_specs = specs.get(lang, [])
        if not isinstance(lang_specs, list):
            continue
        for idx, s in enumerate(lang_specs):
            if not isinstance(s, str):
                continue
            new_s = s
            # Strip wrongly added '发动机：' before rated-power patterns
            for bad, good in RATED_POWER_PATTERNS:
                if bad in new_s:
                    new_s = new_s.replace(bad, good)
                    fixed += 1
            # Strip wrongly added '传动方式：' / 'Transmission:' before transmission patterns
            for bad, good in TRANSMISSION_PATTERNS:
                if bad in new_s:
                    new_s = new_s.replace(bad, good)
                    fixed += 1
            if new_s != s:
                lang_specs[idx] = new_s

print(f"Cleaned {fixed} wrongly-prefixed entries")

# Write back
new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")