/* =========================================================
   products.js — 产品数据
   ★ 维护指南：加产品/改产品就改下面的 PRODUCTS 数组
   - name: 产品名
   - model: 型号
   - cat: 分类 (tiller / ditching / pump)
   - specs: 参数列表（字符串数组）
   - img: 图片文件名（放到 images/ 文件夹）
   ========================================================= */

const PRODUCTS = [
  // ===== 微耕机 Micro Tillers (11款) =====
  {
    name: { en: "170 Gasoline Micro Tiller", zh: "170汽油微耕机", es: "Motocultor 170 Gasolina", ru: "Мотокультиватор 170 бензин", fr: "Motoculteur 170 Essence" },
    model: "1WG-4.0AQ",
    cat: "tiller",
    specs: { en: ["170 gasoline engine", "Ball cast iron reinforced", "Compact body"], zh: ["170汽油机", "球墨铸铁加强", "紧凑机身"], es: ["Motor gasolina 170", "Hierro dúctil reforzado", "Cuerpo compacto"], ru: ["Бензиновый двигатель 170", "Усиленный чугун", "Компактный корпус"], fr: ["Moteur essence 170", "Fonte ductile renforcée", "Corps compact"] },
    img: "tiller-001.jpg"
  },
  {
    name: { en: "170 Diesel Micro Tiller", zh: "170柴油微耕机", es: "Motocultor 170 Diésel", ru: "Мотокультиватор 170 дизель", fr: "Motoculteur 170 Diesel" },
    model: "1WG-4.0A",
    cat: "tiller",
    specs: { en: ["170 diesel engine", "Low fuel consumption", "Strong torque"], zh: ["170柴油机", "低油耗", "扭矩强劲"], es: ["Motor diésel 170", "Bajo consumo", "Alto par"], ru: ["Дизельный двигатель 170", "Низкий расход", "Сильный крутящий момент"], fr: ["Moteur diesel 170", "Faible consommation", "Couple élevé"] },
    img: "tiller-002.jpg"
  },
  {
    name: { en: "173 Diesel Micro Tiller", zh: "173柴油微耕机", es: "Motocultor 173 Diésel", ru: "Мотокультиватор 173 дизель", fr: "Motoculteur 173 Diesel" },
    model: "1WG-4.05A",
    cat: "tiller",
    specs: { en: ["173 diesel engine", "Heavy-duty gearbox", "Multi-gear"], zh: ["173柴油机", "重载齿轮箱", "多档位"], es: ["Motor diésel 173", "Caja de cambios reforzada", "Multi-velocidad"], ru: ["Дизельный двигатель 173", "Усиленная КПП", "Многоступенчатая"], fr: ["Moteur diesel 173", "Boîte renforcée", "Multi-vitesses"] },
    img: "tiller-003.jpg"
  },
  {
    name: { en: "173 Diesel Tiller (Pro)", zh: "173柴油微耕机(升级款)", es: "Motocultor 173 Pro Diésel", ru: "Мотокультиватор 173 Pro дизель", fr: "Motoculteur 173 Pro Diesel" },
    model: "1WG-4.05A Pro",
    cat: "tiller",
    specs: { en: ["173 diesel engine", "Upgraded chassis", "Field-proven"], zh: ["173柴油机", "加强底盘", "实战耐用"], es: ["Motor diésel 173", "Chasis mejorado", "Comprobado en campo"], ru: ["Дизельный двигатель 173", "Усиленное шасси", "Полевые испытания"], fr: ["Moteur diesel 173", "Châssis amélioré", "Éprouvé sur le terrain"] },
    img: "tiller-004.jpg"
  },
  {
    name: { en: "178 Diesel Tiller", zh: "178柴油微耕机", es: "Motocultor 178 Diésel", ru: "Мотокультиватор 178 дизель", fr: "Motoculteur 178 Diesel" },
    model: "1WG-4.1A",
    cat: "tiller",
    specs: { en: ["178 diesel engine", "Heavy-duty gearbox", "Farm use"], zh: ["178柴油机", "重载齿轮箱", "农场适用"], es: ["Motor diésel 178", "Caja de cambios reforzada", "Uso agrícola"], ru: ["Дизельный двигатель 178", "Усиленная КПП", "Фермерское использование"], fr: ["Moteur diesel 178", "Boîte renforcée", "Usage agricole"] },
    img: "tiller-005.jpg"
  },
  {
    name: { en: "186 Diesel Tiller (General)", zh: "186柴油微耕机(战将)", es: "Motocultor 186 Diésel", ru: "Мотокультиватор 186 дизель", fr: "Motoculteur 186 Diesel" },
    model: "1WG-6.3A",
    cat: "tiller",
    specs: { en: ["186 diesel engine", "Powerful", "Heavy-duty"], zh: ["186柴油机", "动力澎湃", "重载专用"], es: ["Motor diésel 186", "Potente", "Trabajo pesado"], ru: ["Дизельный двигатель 186", "Мощный", "Тяжёлые работы"], fr: ["Moteur diesel 186", "Puissant", "Travail lourd"] },
    img: "tiller-006.jpg"
  },
  {
    name: { en: "170 Gasoline Tiller (Lady)", zh: "170汽油微耕机(女神)", es: "Motocultor 170 Gasolina (Dama)", ru: "Мотокультиватор 170 бензин (Леди)", fr: "Motoculteur 170 Essence (Dame)" },
    model: "1WG-4.0BQ",
    cat: "tiller",
    specs: { en: ["170 gasoline", "Light body", "Easy to operate"], zh: ["170汽油机", "轻量化机身", "轻松操控"], es: ["Motor gasolina 170", "Cuerpo ligero", "Fácil manejo"], ru: ["Бензиновый 170", "Лёгкий корпус", "Простое управление"], fr: ["Moteur essence 170", "Corps léger", "Prise en main facile"] },
    img: "tiller-007.jpg"
  },
  {
    name: { en: "173 Gasoline Tiller (Lord)", zh: "173汽油微耕机(男神)", es: "Motocultor 173 Gasolina (Caballero)", ru: "Мотокультиватор 173 бензин (Джентльмен)", fr: "Motoculteur 173 Essence (Seigneur)" },
    model: "1WG-4.05B",
    cat: "tiller",
    specs: { en: ["173 gasoline", "Premium design", "Field-tested"], zh: ["173汽油机", "高端外观", "田间实测"], es: ["Motor gasolina 173", "Diseño premium", "Probado en campo"], ru: ["Бензиновый 173", "Премиум дизайн", "Полевые испытания"], fr: ["Moteur essence 173", "Design premium", "Testé sur le terrain"] },
    img: "tiller-008.jpg"
  },
  {
    name: { en: "178 Diesel Tiller (Lady)", zh: "178柴油微耕机(女神)", es: "Motocultor 178 Diésel (Dama)", ru: "Мотокультиватор 178 дизель (Леди)", fr: "Motoculteur 178 Diesel (Dame)" },
    model: "1WG-4.1B",
    cat: "tiller",
    specs: { en: ["178 diesel", "Premium build", "Long service life"], zh: ["178柴油机", "高端配置", "持久耐用"], es: ["Motor diésel 178", "Construcción premium", "Larga vida útil"], ru: ["Дизельный 178", "Премиум сборка", "Долгий срок службы"], fr: ["Moteur diesel 178", "Construction premium", "Longue durée de vie"] },
    img: "tiller-009.jpg"
  },
  {
    name: { en: "186 Diesel Tiller (Beast)", zh: "186柴油微耕机(战豹)", es: "Motocultor 186 Diésel (Bestia)", ru: "Мотокультиватор 186 дизель (Зверь)", fr: "Motoculteur 186 Diesel (Bête)" },
    model: "1WG-6.3B",
    cat: "tiller",
    specs: { en: ["186 diesel", "Premium model", "Heavy workload"], zh: ["186柴油机", "旗舰机型", "重负荷作业"], es: ["Motor diésel 186", "Modelo insignia", "Trabajo pesado"], ru: ["Дизельный 186", "Флагманская модель", "Тяжёлые нагрузки"], fr: ["Moteur diesel 186", "Modèle phare", "Charge lourde"] },
    img: "tiller-010.jpg"
  },
  {
    name: { en: "186 Diesel Tiller (Tiger)", zh: "186柴油微耕机(战虎)", es: "Motocultor 186 Diésel (Tigre)", ru: "Мотокультиватор 186 дизель (Тигр)", fr: "Motoculteur 186 Diesel (Tigre)" },
    model: "1WG-6.3B-T",
    cat: "tiller",
    specs: { en: ["186 diesel", "14-speed", "Top configuration"], zh: ["186柴油机", "14档位", "顶级配置"], es: ["Motor diésel 186", "14 velocidades", "Configuración top"], ru: ["Дизельный 186", "14 скоростей", "Топ комплектация"], fr: ["Moteur diesel 186", "14 vitesses", "Configuration haut de gamme"] },
    img: "tiller-011.jpg"
  },

  // ===== 开沟培土机 Ditching Machines (4款) =====
  {
    name: { en: "170 Ditching Machine (Dragon)", zh: "170开沟培土机(战龙号)", es: "Máquina Zanjas 170 (Dragón)", ru: "Машина для канав 170 (Дракон)", fr: "Machine à Fossés 170 (Dragon)" },
    model: "1WG-4.0ZL",
    cat: "ditching",
    specs: { en: ["170 gasoline", "23V shaft", "Front rotary"], zh: ["170汽油机", "23V轴", "前旋款"], es: ["Motor gasolina 170", "Eje 23V", "Giro frontal"], ru: ["Бензиновый 170", "Вал 23V", "Переднее вращение"], fr: ["Moteur essence 170", "Arbre 23V", "Rotation avant"] },
    img: "ditch-001.jpg"
  },
  {
    name: { en: "173 Ditching Machine (Horse)", zh: "173开沟培土机(战马号)", es: "Máquina Zanjas 173 (Caballo)", ru: "Машина для канав 173 (Конь)", fr: "Machine à Fossés 173 (Cheval)" },
    model: "1WG-4.05ZM",
    cat: "ditching",
    specs: { en: ["173 diesel", "23V shaft", "Front rotary"], zh: ["173柴油机", "23V轴", "前旋款"], es: ["Motor diésel 173", "Eje 23V", "Giro frontal"], ru: ["Дизельный 173", "Вал 23V", "Переднее вращение"], fr: ["Moteur diesel 173", "Arbre 23V", "Rotation avant"] },
    img: "ditch-002.jpg"
  },
  {
    name: { en: "178 Ditching Machine (Bull)", zh: "178开沟培土机(战牛号)", es: "Máquina Zanjas 178 (Toro)", ru: "Машина для канав 178 (Бык)", fr: "Machine à Fossés 178 (Taureau)" },
    model: "1WG-4.1ZN",
    cat: "ditching",
    specs: { en: ["178 diesel", "23V shaft", "Rear rotary"], zh: ["178柴油机", "23V轴", "后旋款"], es: ["Motor diésel 178", "Eje 23V", "Giro trasero"], ru: ["Дизельный 178", "Вал 23V", "Заднее вращение"], fr: ["Moteur diesel 178", "Arbre 23V", "Rotation arrière"] },
    img: "ditch-003.jpg"
  },
  {
    name: { en: "186 Ditching Machine (Bull Pro)", zh: "186开沟培土机(战牛Pro)", es: "Máquina Zanjas 186 (Toro Pro)", ru: "Машина для канав 186 (Бык Pro)", fr: "Machine à Fossés 186 (Taureau Pro)" },
    model: "1WG-6.3ZN",
    cat: "ditching",
    specs: { en: ["186 diesel", "32 flat shaft", "Rear rotary"], zh: ["186柴油机", "32平轴", "后旋款"], es: ["Motor diésel 186", "Eje plano 32", "Giro trasero"], ru: ["Дизельный 186", "Плоский вал 32", "Заднее вращение"], fr: ["Moteur diesel 186", "Arbre plat 32", "Rotation arrière"] },
    img: "ditch-004.jpg"
  },

  // ===== 抽水机 Water Pumps (8款) =====
  {
    name: { en: "High-Pressure Pump (Belt)", zh: "高压抽水机(皮带款)", es: "Bomba Alta Presión (Correa)", ru: "Насос высокого давления (ременной)", fr: "Pompe Haute Pression (Courroie)" },
    model: "200-5 Belt",
    cat: "pump",
    specs: { en: ["Head 200m", "Flow 3.6m³/h", "Inlet/Outlet 1.5\"", "Belt drive"], zh: ["扬程200m", "流量3.6m³/h", "进出口1.5寸", "皮带传动"], es: ["Altura 200m", "Caudal 3.6m³/h", "1.5\"", "Transmisión correa"], ru: ["Напор 200м", "Расход 3.6м³/ч", "1.5\"", "Ременной привод"], fr: ["Hauteur 200m", "Débit 3.6m³/h", "1.5\"", "Entraînement courroie"] },
    img: "pump-001.jpg"
  },
  {
    name: { en: "High-Pressure Pump (Direct)", zh: "高压抽水机(直连款)", es: "Bomba Alta Presión (Directa)", ru: "Насос высокого давления (прямой)", fr: "Pompe Haute Pression (Directe)" },
    model: "200-5 Direct",
    cat: "pump",
    specs: { en: ["Head 200m", "Flow 3.6m³/h", "Inlet/Outlet 1.5\"", "Direct drive"], zh: ["扬程200m", "流量3.6m³/h", "进出口1.5寸", "直连传动"], es: ["Altura 200m", "Caudal 3.6m³/h", "1.5\"", "Transmisión directa"], ru: ["Напор 200м", "Расход 3.6м³/ч", "1.5\"", "Прямой привод"], fr: ["Hauteur 200m", "Débit 3.6m³/h", "1.5\"", "Entraînement direct"] },
    img: "pump-002.jpg"
  },
  {
    name: { en: "2-inch Centrifugal Pump", zh: "2寸离心泵", es: "Bomba Centrífuga 2\"", ru: "Центробежный насос 2\"", fr: "Pompe Centrifuge 2\"" },
    model: "2\" Centrifugal",
    cat: "pump",
    specs: { en: ["2-inch inlet/outlet", "Centrifugal type", "High efficiency"], zh: ["2寸进出口", "离心式", "高效率"], es: ["2\" entrada/salida", "Centrífuga", "Alta eficiencia"], ru: ["2\" вход/выход", "Центробежный", "Высокий КПД"], fr: ["2\" entrée/sortie", "Centrifuge", "Haute efficacité"] },
    img: "pump-003.jpg"
  },
  {
    name: { en: "3-inch Centrifugal Pump", zh: "3寸离心泵", es: "Bomba Centrífuga 3\"", ru: "Центробежный насос 3\"", fr: "Pompe Centrifuge 3\"" },
    model: "3\" Centrifugal",
    cat: "pump",
    specs: { en: ["3-inch inlet/outlet", "Centrifugal type", "Higher flow"], zh: ["3寸进出口", "离心式", "更大流量"], es: ["3\" entrada/salida", "Centrífuga", "Mayor caudal"], ru: ["3\" вход/выход", "Центробежный", "Больший расход"], fr: ["3\" entrée/sortie", "Centrifuge", "Débit plus élevé"] },
    img: "pump-004.jpg"
  },
  {
    name: { en: "Self-Priming Pump", zh: "自吸泵", es: "Bomba Auto-aspirante", ru: "Самовсасывающий насос", fr: "Pompe Auto-amorçante" },
    model: "Self-Priming 2~3\"",
    cat: "pump",
    specs: { en: ["Self-priming", "2-3 inch", "Easy start"], zh: ["自吸式", "2-3寸", "易启动"], es: ["Auto-aspirante", "2-3\"", "Arranque fácil"], ru: ["Самовсасывающий", "2-3\"", "Лёгкий запуск"], fr: ["Auto-amorçante", "2-3\"", "Démarrage facile"] },
    img: "pump-005.jpg"
  },
  {
    name: { en: "Fire Pump", zh: "消防泵", es: "Bomba Contra Incendios", ru: "Пожарный насос", fr: "Pompe à Incendie" },
    model: "Fire 2\"",
    cat: "pump",
    specs: { en: ["Fire-fighting", "2-inch", "High pressure"], zh: ["消防用", "2寸", "高压力"], es: ["Contra incendios", "2\"", "Alta presión"], ru: ["Пожарный", "2\"", "Высокое давление"], fr: ["Anti-incendie", "2\"", "Haute pression"] },
    img: "pump-006.jpg"
  },
  {
    name: { en: "Diesel Well Pump", zh: "柴油井泵", es: "Bomba de Pozo Diésel", ru: "Дизельный скважинный насос", fr: "Pompe de Puits Diesel" },
    model: "195 Diesel",
    cat: "pump",
    specs: { en: ["195 diesel", "Electric start", "Head 100m", "Flow 50m³/h"], zh: ["195柴油机", "电启动", "扬程100m", "流量50m³/h"], es: ["Diésel 195", "Arranque eléctrico", "Altura 100m", "Caudal 50m³/h"], ru: ["Дизель 195", "Электростартер", "Напор 100м", "Расход 50м³/ч"], fr: ["Diesel 195", "Démarrage électrique", "Hauteur 100m", "Débit 50m³/h"] },
    img: "pump-007.jpg"
  },
  {
    name: { en: "Double-Impeller Pump", zh: "双叶轮压井泵", es: "Bomba Doble Impulsor", ru: "Двухлопастной насос", fr: "Pompe Double Roue" },
    model: "Double-Impeller",
    cat: "pump",
    specs: { en: ["Double impeller", "Deep well use", "Heavy-duty"], zh: ["双叶轮", "深井适用", "重载设计"], es: ["Doble impulsor", "Pozo profundo", "Trabajo pesado"], ru: ["Двойная крыльчатка", "Глубокая скважина", "Тяжёлые условия"], fr: ["Double roue", "Puits profond", "Travail lourd"] },
    img: "pump-008.jpg"
  }
];

// 产品分类的翻译键映射
const CAT_LABEL_KEY = {
  tiller: "products.filter.tiller",
  ditching: "products.filter.ditching",
  pump: "products.filter.pump"
};

let currentCategory = 'all';

function renderProducts(category) {
  currentCategory = category || currentCategory;
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const lang = currentLang || 'en';
  const list = PRODUCTS.filter(p => currentCategory === 'all' || p.cat === currentCategory);

  grid.innerHTML = list.map(p => {
    const name = (p.name && p.name[lang]) || p.name.en;
    const specs = (p.specs && p.specs[lang]) ? p.specs[lang] : (p.specs && p.specs.en) || [];
    const catLabel = t(CAT_LABEL_KEY[p.cat]) || p.cat;
    const inquire = t('products.inquire') || 'Send Inquiry';
    const imgHtml = p.img
      ? `<div class="product-img"><picture><source srcset="images/${p.img.replace(/\.(jpg|jpeg|png)$/i, '.webp')}" type="image/webp"><img src="images/${p.img}" alt="${name}" loading="lazy"></picture></div>`
      : `<div class="product-img">📷 <span style="margin-left:8px">${name}</span></div>`;

    return `
      <div class="product-card" data-cat="${p.cat}">
        ${imgHtml}
        <div class="product-body">
          <span class="product-cat">${catLabel}</span>
          <h3 class="product-name">${name}</h3>
          <div class="product-model">${p.model}</div>
          <ul class="product-specs">${specs.map(s => `<li>· ${s}</li>`).join('')}</ul>
          <a href="#contact" class="product-cta">${inquire} →</a>
        </div>
      </div>`;
  }).join('');
}

// 初始化分类过滤按钮
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.getAttribute('data-cat'));
    });
  });
}