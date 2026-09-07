"""Update ditching machine specs to new 发动机 line format.

User's new template (per ditching machines, all diesel):
  发动机：{cc}战马号四冲程或两冲程柴油机，风冷单缸，马力8-15HP各种型号都有货
  传动方式：齿轮直连，省油经济实惠

Applies to first 2 lines of all 4 ding machines, all 5 languages.
Detail page keeps all 14 lines (engine + transmission + 12 detailed params).
"""

import json

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

DITCHING_CC = {
    "1WG-4-0ZL":  170,
    "1WG-4-05ZM": 173,
    "1WG-4-1ZN":  178,
    "1WG-6-3ZN":  186,
}


def build_lines(cc):
    """Return first-2-lines dict {lang: [engine, transmission]}."""
    return {
        "zh": [
            f"发动机：{cc}战马号四冲程或两冲程柴油机，风冷单缸，马力8-15HP各种型号都有货",
            "传动方式：齿轮直连，省油经济实惠",
        ],
        "en": [
            f"Engine: {cc}cc Zhanma 4-stroke or 2-stroke diesel engine, air-cooled single cylinder, 8-15 HP available across the full model range",
            "Transmission: Direct gear drive, fuel-efficient and economical",
        ],
        "es": [
            f"Motor: Zhanma {cc}cc 4-tiempos o 2-tiempos diésel, monocilíndrico refrigerado por aire, 8-15 HP en toda la gama",
            "Transmisión: directa por engranajes, bajo consumo y económica",
        ],
        "ru": [
            f"Двигатель: {cc}cc Чжаньма 4-тактный или 2-тактный дизельный, один цилиндр воздушное охлаждение, 8-15 л.с. во всей линейке",
            "Привод: прямой зубчатый, экономичный расход топлива",
        ],
        "fr": [
            f"Moteur: Zhanma {cc}cc 4-temps ou 2-temps diesel, monocylindre refroidi par air, 8-15 HP sur toute la gamme",
            "Transmission: directe par engrenages, économique en carburant",
        ],
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

LANGS = ['en', 'zh', 'es', 'ru', 'fr']
applied = 0
for p in products:
    if p.get('cat') != 'ditching':
        continue
    pid = p['id']
    if pid not in DITCHING_CC:
        continue
    cc = DITCHING_CC[pid]
    new_first_two = build_lines(cc)
    for lang in LANGS:
        existing = p['specs'].get(lang, [])
        # Replace first 2 lines, keep the rest (detailed params)
        if len(existing) >= 2:
            new_specs = new_first_two[lang] + existing[2:]
        else:
            new_specs = new_first_two[lang]
        p['specs'][lang] = new_specs
        applied += 1

print(f"Updated first-2-line engine+transmission for {applied} ditching entries (4 machines × 5 langs)")

new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")