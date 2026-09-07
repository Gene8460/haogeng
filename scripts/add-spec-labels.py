"""Add '发动机：' prefix to engine entries and '传动方式：' to transmission entries.

After the previous run, the engine line lost its prefix because the detection logic
couldn't find entries starting with '发动机：' (they had been replaced with content
that no longer starts with that prefix).

This script simply prepends the right prefix to each line, in each language.
"""

import json

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

# Per-language prefix mappings
# We detect by content (engine line contains "4-stroke" or "4-tiempos" or contains
# the "5-15 HP" / "5-15 匹" / "5-15 л.с." marker), then prepend the proper label.
PREFIX = {
    "zh": "发动机：",
    "en": "Engine: ",
    "es": "Motor: ",
    "ru": "Двигатель: ",
    "fr": "Moteur: ",
}

TRANSMISSION_PREFIX = {
    "zh": "传动方式：",
    "en": "Transmission: ",
    "es": "Transmisión: ",
    "ru": "Привод: ",
    "fr": "Transmission: ",
}


def detect_engine(line, lang):
    """Engine line: contains '5-15 HP' / '5-15匹' / '5-15 HP' / '5-15 л.с.' / '5-15 HP'."""
    if "5-15" in line and ("HP" in line or "匹" in line or "л.с." in line):
        return True
    return False


def detect_transmission(line, lang):
    """Transmission line: short, mentions '齿轮直连' / 'gear drive' / 'engranajes' etc."""
    keywords = {
        "zh": ["齿轮直连"],
        "en": ["gear drive"],
        "es": ["engranajes"],
        "ru": ["зубчат"],
        "fr": ["engrenages"],
    }
    return any(kw in line for kw in keywords[lang]) and len(line) < 60


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
    specs = p.get('specs', {})
    for lang in LANGS:
        lang_specs = specs.get(lang, [])
        if not isinstance(lang_specs, list):
            continue
        for idx, s in enumerate(lang_specs):
            if not isinstance(s, str):
                continue
            # Add engine prefix if missing
            if detect_engine(s, lang) and not s.startswith(PREFIX[lang]):
                lang_specs[idx] = PREFIX[lang] + s
                changed += 1
            # Add transmission prefix if missing
            elif detect_transmission(s, lang) and not s.startswith(TRANSMISSION_PREFIX[lang]):
                lang_specs[idx] = TRANSMISSION_PREFIX[lang] + s
                changed += 1

print(f"Added {changed} prefixes (engine + transmission)")

# Write back
new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")