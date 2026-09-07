"""Add 货 (in stock) marker to tiller and ditching machine spec lines.

User's spec:
  微耕机: 马力5-15匹各种型号都有货
  培土机: 马力8-15匹各种型号都有货

ZH is explicit; EN/ES/RU/FR get parallel "in stock" wording.
"""

import json

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"


def add_stock(text, lang, hp_unit):
    """Insert 'in stock' / '货' marker into the engine-line HP clause."""
    if lang == "zh":
        if "各种型号都有货" in text:
            return text
        if "各种型号都有" in text:
            return text.replace("各种型号都有", "各种型号都有货")
        return text
    if lang == "en":
        if "in stock" in text:
            return text
        if "available across the full model range" in text:
            return text.replace("available across the full model range",
                                "in stock across the full model range")
        return text
    if lang == "es":
        if "en stock" in text:
            return text
        if "en toda la gama" in text:
            return text.replace("en toda la gama", "en stock en toda la gama")
        return text
    if lang == "ru":
        if "в наличии" in text:
            return text
        if "во всей линейке" in text:
            return text.replace("во всей линейке", "в наличии во всей линейке")
        return text
    if lang == "fr":
        if "en stock" in text:
            return text
        if "sur toute la gamme" in text:
            return text.replace("sur toute la gamme", "en stock sur toute la gamme")
        return text


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
    if p.get('cat') not in ('tiller', 'ditching'):
        continue
    for lang in LANGS:
        specs = p.get('specs', {}).get(lang, [])
        if not specs:
            continue
        # Engine line is always first for tiller/ditching
        engine_line = specs[0]
        new_engine = add_stock(engine_line, lang, "5-15" if p['cat'] == 'tiller' else "8-15")
        if new_engine != engine_line:
            specs[0] = new_engine
            changed += 1

print(f"Updated {changed} engine-line entries (tiller + ditching, all 5 langs)")

new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")