"""Restore detailed spec parameters for all 11 tillers.

User's correction: keep new 发动机 line, but bring back all detailed params.
For each tiller, restore the full 14-line spec list:

  1. 发动机：NEW FORMAT (170四冲程汽油机或两冲程柴油机...)
  2. 传动方式：齿轮直连，省油经济实惠
  3. 排量：xxx cc
  4. 额定功率：x.xx kW / 5-15 HP @ 3600 rpm
  5. 耕幅：xxx-xxx mm（可调）
  6. 耕深：xxx-xxx mm
  7. 变速箱：球墨铸铁，2 前进 + 1 倒档
  8. 离合器：摩擦片式，常开
  9. 旋刀数量：24 把旱地刀（3+1 组）
  10. 净重：xxx kg
  11. 油箱：xxx L
  12. 启动方式：手拉反启动 / Electric + Recoil
  13. 外形尺寸：xxx × xxx × xxx mm
  14. 质保：1 年
"""

import json

JS = r"C:/Users/Administrator/.qclaw/workspace-agent-643ee302/haogeng/js/products.js"

# Per-tiller specs
TILLER_DATA = {
    "tiller-001":    {"cc": 170, "fuel": "gasoline", "kw": 4.0,  "w": "600-900",   "d": "100-250", "weight": 68,  "tank": 3.6, "start": "手拉反启动",         "dims": "1380 × 650 × 900"},
    "1WG-4-0A":      {"cc": 170, "fuel": "diesel",   "kw": 2.9,  "w": "600-1000",  "d": "100-250", "weight": 95,  "tank": 3.5, "start": "手拉反启动",         "dims": "1480 × 700 × 950"},
    "1WG-4-05A":     {"cc": 173, "fuel": "diesel",   "kw": 3.5,  "w": "800-1050",  "d": "150-300", "weight": 105, "tank": 4.5, "start": "手拉反启动",         "dims": "1550 × 750 × 980"},
    "1WG-4-05A-Pro": {"cc": 173, "fuel": "diesel",   "kw": 3.8,  "w": "800-1050",  "d": "150-300", "weight": 110, "tank": 4.5, "start": "手拉反启动",         "dims": "1550 × 750 × 980"},
    "1WG-4-1A":      {"cc": 178, "fuel": "diesel",   "kw": 4.0,  "w": "800-1050",  "d": "150-300", "weight": 115, "tank": 4.5, "start": "手拉反启动",         "dims": "1580 × 760 × 990"},
    "1WG-6-3A":      {"cc": 186, "fuel": "diesel",   "kw": 6.3,  "w": "900-1200",  "d": "180-350", "weight": 135, "tank": 5.5, "start": "手拉反启动",         "dims": "1690 × 1000 × 1010"},
    "1WG-4-0BQ":     {"cc": 170, "fuel": "gasoline", "kw": 4.0,  "w": "600-1000",  "d": "100-250", "weight": 70,  "tank": 3.6, "start": "手拉反启动",         "dims": "1400 × 680 × 920"},
    "1WG-4-05B":     {"cc": 173, "fuel": "gasoline", "kw": 4.05, "w": "800-1050",  "d": "150-300", "weight": 78,  "tank": 4.5, "start": "手拉反启动",         "dims": "1520 × 720 × 960"},
    "1WG-4-1B":      {"cc": 178, "fuel": "gasoline", "kw": 4.1,  "w": "800-1050",  "d": "150-300", "weight": 82,  "tank": 4.5, "start": "手拉反启动",         "dims": "1540 × 730 × 970"},
    "1WG-6-3B":      {"cc": 186, "fuel": "diesel",   "kw": 6.3,  "w": "900-1200",  "d": "180-350", "weight": 130, "tank": 5.5, "start": "手拉反启动",         "dims": "1680 × 980 × 1000"},
    "1WG-6-3B-T":    {"cc": 186, "fuel": "diesel",   "kw": 6.3,  "w": "900-1200",  "d": "180-350", "weight": 140, "tank": 5.5, "start": "电启动 + 手拉反启动", "dims": "1690 × 1000 × 1010"},
}

FUEL_ZH = {"gasoline": "汽油机", "diesel": "柴油机"}
FUEL_EN = {"gasoline": "gasoline", "diesel": "diesel"}
FUEL_ES = {"gasoline": "gasolina", "diesel": "diésel"}
FUEL_RU = {"gasoline": "бензиновый", "diesel": "дизельный"}
FUEL_FR = {"gasoline": "essence", "diesel": "diśl"}


def build_specs(t):
    """Return dict {lang: [14-line spec list]}."""
    cc = t["cc"]
    fuel = t["fuel"]
    kw = t["kw"]
    w = t["w"]
    d = t["d"]
    weight = t["weight"]
    tank = t["tank"]
    start_zh = t["start"]
    dims = t["dims"]

    kw_str = f"{kw:g}"

    zh = [
        f"发动机：{cc}四冲程{FUEL_ZH[fuel]}或两冲程{FUEL_ZH[fuel]}，风冷单缸，马力5-15匹各种型号都有",
        f"传动方式：齿轮直连，省油经济实惠",
        f"排量：{cc} cc",
        f"额定功率：{kw_str} kW / 5-15 HP @ 3600 rpm",
        f"耕幅：{w} mm（可调）",
        f"耕深：{d} mm",
        "变速箱：球墨铸铁，2 前进 + 1 倒档",
        "离合器：摩擦片式，常开",
        "旋刀数量：24 把旱地刀（3+1 组）",
        f"净重：{weight} kg",
        f"油箱：{tank} L",
        f"启动方式：{start_zh}",
        f"外形尺寸：{dims} mm",
        "质保：1 年",
    ]

    en = [
        f"Engine: {cc}cc 4-stroke or 2-stroke {FUEL_EN[fuel]} engine, air-cooled single cylinder, 5-15 HP available across the full model range",
        "Transmission: Direct gear drive, fuel-efficient and economical",
        f"Displacement: {cc} cc",
        f"Rated power: {kw_str} kW / 5-15 HP @ 3600 rpm",
        f"Working width: {w} mm (adjustable)",
        f"Working depth: {d} mm",
        "Gearbox: ductile iron, 2 forward + 1 reverse",
        "Clutch: friction plate type, normally open",
        "Blades: 24 dryland rotary blades (3+1 groups)",
        f"Net weight: {weight} kg",
        f"Fuel tank: {tank} L",
        f"Starting: {'Electric + recoil' if '电启动' in start_zh else 'Manual recoil'}",
        f"Dimensions: {dims.replace('×', 'x')} mm",
        "Warranty: 1 year",
    ]

    es = [
        f"Motor: {cc}cc 4-tiempos o 2-tiempos {FUEL_ES[fuel]}, monocilíndrico refrigerado por aire, 5-15 HP en toda la gama",
        "Transmisión: directa por engranajes, bajo consumo y económica",
        f"Cilindrada: {cc} cc",
        f"Potencia nominal: {kw_str} kW / 5-15 HP @ 3600 rpm",
        f"Ancho de labor: {w} mm (ajustable)",
        f"Profundidad: {d} mm",
        "Caja: hierro dúctil, 2 adelante + 1 atrás",
        "Embrague: placas de fricción, normalmente abierto",
        "Cuchillas: 24 tierra seca (3+1 grupos)",
        f"Peso neto: {weight} kg",
        f"Tanque: {tank} L",
        f"Arranque: {'eléctrico + cuerda' if '电启动' in start_zh else 'manual por cuerda'}",
        f"Dimensiones: {dims.replace('×', 'x')} mm",
        "Garantía: 1 año",
    ]

    ru = [
        f"Двигатель: {cc}cc 4-тактный или 2-тактный {FUEL_RU[fuel]}, один цилиндр воздушное охлаждение, 5-15 л.с. во всей линейке",
        "Привод: прямой зубчатый, экономичный расход топлива",
        f"Объём: {cc} куб.см",
        f"Номинальная мощность: {kw_str} кВт / 5-15 л.с. @ 3600 об/мин",
        f"Ширина обработки: {w} мм (регулируемая)",
        f"Глубина обработки: {d} мм",
        "Коробка: ковкий чугун, 2 передних + 1 задняя",
        "Сцепление: фрикционное, нормально разомкнутое",
        "Ножи: 24 сухопутных (3+1 группы)",
        f"Вес нетто: {weight} кг",
        f"Топливный бак: {tank} л",
        f"Запуск: {'электростарт + ручной' if '电启动' in start_zh else 'ручной стартер'}",
        f"Габариты: {dims.replace('×', 'x')} мм",
        "Гарантия: 1 год",
    ]

    fr = [
        f"Moteur: {cc}cc 4-temps ou 2-temps {FUEL_FR[fuel]}, monocylindre refroidi par air, 5-15 HP sur toute la gamme",
        "Transmission: directe par engrenages, économique en carburant",
        f"Cylindrée: {cc} cc",
        f"Puissance nominale: {kw_str} kW / 5-15 HP @ 3600 rpm",
        f"Largeur: {w} mm (réglable)",
        f"Profondeur: {d} mm",
        "Boîte: fonte ductile, 2 avant + 1 arrière",
        "Embrayage: à friction, normalement ouvert",
        "Lames: 24 terre sèche (3+1 jeux)",
        f"Poids net: {weight} kg",
        f"Réservoir: {tank} L",
        f"Démarrage: {'électrique + lanceur' if '电启动' in start_zh else 'lanceur manuel'}",
        f"Dimensions: {dims.replace('×', 'x')} mm",
        "Garantie: 1 an",
    ]

    return {"zh": zh, "en": en, "es": es, "ru": ru, "fr": fr}


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
    if pid not in TILLER_DATA:
        continue
    new_specs = build_specs(TILLER_DATA[pid])
    for lang in LANGS:
        p['specs'][lang] = new_specs[lang]
        applied += 1

print(f"Restored 14-line spec for {applied} tiller entries (11 × 5 langs)")

new_array_str = json.dumps(products, ensure_ascii=False, indent=2)
prefix = content[:start_idx + len('var PRODUCTS = ')]
new_content = prefix + "\n" + new_array_str + "\n" + content[end_idx:]
with open(JS, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"products.js written: {len(new_content)} bytes")