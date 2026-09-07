"""Apply user's confirmed 2-line spec template to all 11 tillers, all 5 languages.

Format (per user spec for tiller-001):
  Line 1 — Engine: {cc} {4-stroke/2-stroke} engine, air-cooled, single cylinder, 5-15 HP
  Line 2 — Transmission: Direct gear drive, fuel-efficient and economical

Per-tiller displacement and fuel:
  tiller-001:    170 gasoline
  1WG-4-0A:      170 diesel
  1WG-4-05A:     173 diesel
  1WG-4-05A-Pro: 173 diesel
  1WG-4-1A:      178 diesel
  1WG-6-3A:      186 diesel
  1WG-4-0BQ:     170 gasoline
  1WG-4-05B:     173 gasoline
  1WG-4-1B:      178 gasoline
  1WG-6-3B:      186 diesel
  1WG-6-3B-T:    186 diesel
"""

import json

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

TILLER_SPEC = {
    "tiller-001":    (170, "gasoline"),
    "1WG-4-0A":      (170, "diesel"),
    "1WG-4-05A":     (173, "diesel"),
    "1WG-4-05A-Pro": (173, "diesel"),
    "1WG-4-1A":      (178, "diesel"),
    "1WG-6-3A":      (186, "diesel"),
    "1WG-4-0BQ":     (170, "gasoline"),
    "1WG-4-05B":     (173, "gasoline"),
    "1WG-4-1B":      (178, "gasoline"),
    "1WG-6-3B":      (186, "diesel"),
    "1WG-6-3B-T":    (186, "diesel"),
}


def build_lines(cc, fuel):
    """Return dict {lang: (engine_line, transmission_line)} — exactly the two lines per lang."""
    if fuel == "gasoline":
        f_zh, f_en, f_es, f_ru, f_fr = "汽油机", "gasoline", "gasolina", "бензиновый", "essence"
    else:
        f_zh, f_en, f_es, f_ru, f_fr = "柴油机", "diesel", "diésel", "дизельный", "diésel"

    return {
        "zh": [
            f"发动机：{cc}四冲程{f_zh}或两冲程{f_zh}，风冷单缸，马力5-15匹各种型号都有",
            "传动方式：齿轮直连，省油经济实惠",
        ],
        "en": [
            f"Engine: {cc}cc 4-stroke or 2-stroke {f_en} engine, air-cooled single cylinder, 5-15 HP available across the full model range",
            "Transmission: Direct gear drive, fuel-efficient and economical",
        ],
        "es": [
            f"Motor: {f_es} {cc}cc 4-tiempos o 2-tiempos, monocilíndrico refrigerado por aire, 5-15 HP en toda la gama",
            "Transmisión: Directa por engranajes, bajo consumo y económica",
        ],
        "ru": [
            f"Двигатель: {cc}cc 4-тактный или 2-тактный {f_ru}, один цилиндр воздушное охлаждение, 5-15 л.с. во всей линейке",
            "Привод: Прямой зубчатый, экономичный расход топлива",
        ],
        "fr": [
            f"Moteur: {f_fr} {cc}cc 4-temps ou 2-temps, monocylindre refroidi par air, 5-15 HP sur toute la gamme",
            "Transmission: Directe par engrenages, économique en carburant",
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
    if p.get('cat') != 'tiller':
        continue
    pid = p['id']
    if pid not in TILLER_SPEC:
        continue
    cc, fuel = TILLER_SPEC[pid]
    lang_lines = build_lines(cc, fuel)
    for lang in LANGS:
        p.setdefault('specs', {})[lang] = lang_lines[lang]
        applied += 1

print(f"Applied 2-line spec template to {applied} tiller entries (11 tillers × 5 langs)")

new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")