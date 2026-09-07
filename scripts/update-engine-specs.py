"""Rewrite 发动机 (engine) and 传动方式 (transmission) lines for all 11 tiller products.

User's spec template for tiller-001 (170 gasoline):
  发动机: 170四冲程汽油机或两冲程汽油机，风冷单缸，马力5-15匹各种型号都有
  传动方式: 齿轮直连，省油经济实惠

Applied to all 11 tillers, displacing only the displacement number (170/173/178/186)
and fuel type (gasoline → 汽油机 / diesel → 柴油机).
"""

import json

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

# Per-tiller: (displacement, fuel)
TILLER_ENGINE = {
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


def build_engine_lines(cc, fuel):
    """Return dict {lang: (engine_line, transmission_line)}."""
    if fuel == "gasoline":
        fuel_zh = "汽油机"
        fuel_en = "gasoline"
        fuel_es = "gasolina"
        fuel_ru = "бензиновый"
        fuel_fr = "essence"
    else:
        fuel_zh = "柴油机"
        fuel_en = "diesel"
        fuel_es = "diésel"
        fuel_ru = "дизельный"
        fuel_fr = "diésel"

    engine_lines = {
        "zh": f"发动机：{cc}四冲程{fuel_zh}或两冲程{fuel_zh}，风冷单缸，马力5-15匹各种型号都有，传动方式齿轮直连，省油经济实惠",
        "en": f"Engine: {cc}cc 4-stroke or 2-stroke {fuel_en} engine, air-cooled single cylinder, 5-15 HP available across the full model range, direct gear drive, fuel-efficient and economical",
        "es": f"Motor: {fuel_es} {cc}cc 4-tiempos o 2-tiempos, monocilíndrico refrigerado por aire, 5-15 HP en toda la gama, transmisión directa por engranajes, bajo consumo y económico",
        "ru": f"Двигатель: {cc}cc 4-тактный или 2-тактный {fuel_ru} двигатель, один цилиндр воздушное охлаждение, 5-15 л.с. во всей линейке, прямой зубчатый привод, экономичный расход топлива",
        "fr": f"Moteur: {fuel_fr} {cc}cc 4-temps ou 2-temps, monocylindre refroidi par air, 5-15 HP sur toute la gamme, transmission directe par engrenages, économique en carburant",
    }

    transmission_lines = {
        "zh": "传动方式：齿轮直连，省油经济实惠",
        "en": "Transmission: Direct gear drive, fuel-efficient and economical",
        "es": "Transmisión: directa por engranajes, bajo consumo y económica",
        "ru": "Привод: прямой зубчатый, экономичный расход топлива",
        "fr": "Transmission: directe par engrenages, économique en carburant",
    }
    return engine_lines, transmission_lines


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
    cc, fuel = TILLER_ENGINE[pid]
    engine_lines, trans_lines = build_engine_lines(cc, fuel)

    specs = p.setdefault('specs', {})
    for lang in LANGS:
        lang_specs = specs.setdefault(lang, [])
        if not isinstance(lang_specs, list):
            continue

        # Find indices of 发动机 and 传动方式 entries
        idx_engine = next((i for i, s in enumerate(lang_specs) if s.startswith('Engine:') or s.startswith('发动机：') or s.startswith('Motor:') or s.startswith('Двигатель:') or s.startswith('Moteur:')), None)
        idx_trans = next((i for i, s in enumerate(lang_specs) if s.startswith('Transmission:') or s.startswith('传动方式：') or s.startswith('Transmisión:') or s.startswith('Привод:') or s.startswith('Transmission')), None)

        if idx_engine is not None:
            lang_specs[idx_engine] = engine_lines[lang]
            changed += 1
        if idx_trans is not None:
            lang_specs[idx_trans] = trans_lines[lang]
            changed += 1

print(f"Updated {changed} spec entries (engine + transmission) across 11 tillers × 5 langs")

# Write back
new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")