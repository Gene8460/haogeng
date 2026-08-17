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
  // ===== 微耕机 Micro Tillers =====
  {
    name: { en: "170 Gasoline Micro Tiller", zh: "170汽油微耕机" },
    model: "1WG-4.0AQ",
    cat: "tiller",
    specs: { en: ["Ball cast iron reinforced", "Gasoline engine"], zh: ["球墨铸铁加强型", "汽油发动机"] },
    img: "tiller-001.jpg"
  },
  {
    name: { en: "170 Diesel Micro Tiller", zh: "170柴油微耕机" },
    model: "1WG-4.0A",
    cat: "tiller",
    specs: { en: ["Ball cast iron reinforced", "Diesel engine"], zh: ["球墨铸铁加强型", "柴油发动机"] },
    img: "tiller-002.jpg"
  },
  {
    name: { en: "173 Diesel Micro Tiller", zh: "173柴油微耕机" },
    model: "1WG-4.05A",
    cat: "tiller",
    specs: { en: ["Ball cast iron reinforced", "Diesel engine"], zh: ["球墨铸铁加强型", "柴油发动机"] },
    img: "tiller-003.jpg"
  },
  {
    name: { en: "178 Diesel Micro Tiller", zh: "178柴油微耕机" },
    model: "1WG-4.1B",
    cat: "tiller",
    specs: { en: ["23 / 32 shaft option", "7 gears", "Left-right steering", "All-gear transmission"], zh: ["可选23轴/32轴", "7档位", "左右转向", "全齿轮传动"] },
    img: "tiller-004.jpg"
  },

  // ===== 开沟培土机 Ditching Machines =====
  {
    name: { en: "170 Gasoline Ditching Machine", zh: "170汽油开沟培土机" },
    model: "1WG-4.0PT",
    cat: "ditching",
    specs: { en: ["23V shaft", "Front rotary"], zh: ["23V轴", "前旋款"] },
    img: "ditch-001.jpg"
  },
  {
    name: { en: "173 Diesel Ditching Machine", zh: "173柴油开沟培土机" },
    model: "1WG-4.05PT",
    cat: "ditching",
    specs: { en: ["23V shaft", "Front rotary"], zh: ["23V轴", "前旋款"] },
    img: "ditch-002.jpg"
  },
  {
    name: { en: "178 Diesel Ditching Machine", zh: "178柴油开沟培土机" },
    model: "1WG-4.1ZM",
    cat: "ditching",
    specs: { en: ["23V shaft", "Rear rotary"], zh: ["23V轴", "后旋款"] },
    img: "ditch-003.jpg"
  },
  {
    name: { en: "186 Diesel Ditching Machine", zh: "186柴油开沟培土机" },
    model: "1WG-6.3PT",
    cat: "ditching",
    specs: { en: ["32 flat shaft", "Rear rotary"], zh: ["32平轴", "后旋款"] },
    img: "ditch-004.jpg"
  },

  // ===== 抽水机 Water Pumps =====
  {
    name: { en: "170F Gasoline Water Pump", zh: "170F汽油抽水机" },
    model: "WP-170F",
    cat: "pump",
    specs: { en: ["Portable", "High head", "Gasoline engine"], zh: ["便携式", "高扬程", "汽油发动机"] },
    img: "pump-001.jpg"
  },
  {
    name: { en: "7.5HP Heavy-Duty Water Pump", zh: "7.5马力重型抽水机" },
    model: "WP-7.5",
    cat: "pump",
    specs: { en: ["Cast iron impeller", "Industrial use", "21CC"], zh: ["铸铁叶轮", "工业级", "21CC排量"] },
    img: "pump-002.jpg"
  },
  {
    name: { en: "2-inch Centrifugal Pump", zh: "2寸离心泵" },
    model: "2\"",
    cat: "pump",
    specs: { en: ["Centrifugal type"], zh: ["离心式"] },
    img: ""
  },
  {
    name: { en: "3-inch Centrifugal Pump", zh: "3寸离心泵" },
    model: "3\"",
    cat: "pump",
    specs: { en: ["Centrifugal type"], zh: ["离心式"] },
    img: ""
  },
  {
    name: { en: "170 Gasoline Self-Priming Pump", zh: "170汽油自吸泵" },
    model: "2~3\"",
    cat: "pump",
    specs: { en: ["Self-priming", "Gasoline engine"], zh: ["自吸式", "汽油发动机"] },
    img: ""
  },
  {
    name: { en: "170 Gasoline Fire Pump", zh: "170汽油消防泵" },
    model: "2\"",
    cat: "pump",
    specs: { en: ["Fire-fighting", "Gasoline engine"], zh: ["消防用", "汽油发动机"] },
    img: ""
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
      ? `<div class="product-img"><img src="images/${p.img}" alt="${name}" loading="lazy"></div>`
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
