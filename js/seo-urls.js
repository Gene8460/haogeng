/* =========================================================
   seo-urls.js — 站点 URL 规则（浏览器 + 静态生成器共用）
   ---------------------------------------------------------
   规则（上线并被收录后不要再改，改了等于换站，外链和 sitemap 会全废）：
     首页     /{lang}/
     品类页   /{lang}/{品类slug}.html
     产品页   /{lang}/product/{型号}-{燃料}-{品类slug}.html
     指南索引 /{lang}/guides.html
     指南文章 /{lang}/guide/{slug}.html
     FAQ 页   /{lang}/faq.html
     工厂页   /{lang}/factory.html

   例：/en/product/1wg-4-05a-gasoline-micro-tiller.html
       /zh/wei-geng-ji.html
       /fr/motoculteur.html

   ⚠️ 这份文件同时被 js/product.js（浏览器）和 scripts/build-static.js
      （Node 生成器）引用，两边 slug 必须完全一致，所以只此一份实现。
   ========================================================= */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) { module.exports = api; }
  if (root) { root.HaogengUrls = api; }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof self !== 'undefined' ? self : this), function () {
  'use strict';

  var SITE = 'https://haogeng.net';
  var LANGS = ['en', 'zh', 'sw', 'es', 'ru', 'fr'];
  var CATS = ['tiller', 'ditching', 'pump'];

  /* 品类 slug（按语种，带该语种的核心关键词） */
  var CAT_SLUG = {
    tiller: {
      en: 'micro-tiller', zh: 'wei-geng-ji', sw: 'matrekta',
      es: 'motocultor', ru: 'motokultivator', fr: 'motoculteur'
    },
    ditching: {
      en: 'ditching-machine', zh: 'kai-gou-pei-tu-ji', sw: 'mashine-ya-makorongo',
      es: 'maquina-zanjas', ru: 'mashina-dlya-kanav', fr: 'machine-a-fosses'
    },
    pump: {
      en: 'water-pump', zh: 'chou-shui-ji', sw: 'pampu-ya-maji',
      es: 'bomba-de-agua', ru: 'vodyanoy-nasos', fr: 'pompe-a-eau'
    }
  };

  /* 品类显示名（与 js/product.js 里的 CAT_LABEL_MAP 保持一致） */
  var CAT_LABEL = {
    tiller: { en: 'Micro Tiller', zh: '微耕机', es: 'Motocultor', ru: 'Мотокультиватор', fr: 'Motoculteur', sw: 'Matrekta' },
    ditching: { en: 'Ditching Machine', zh: '开沟培土机', es: 'Máquina Zanjas', ru: 'Машина для канав', fr: 'Machine à Fossés', sw: 'Mashine ya Makorongo' },
    pump: { en: 'Water Pump', zh: '抽水机', es: 'Bomba de Agua', ru: 'Водяной насос', fr: 'Pompe à Eau', sw: 'Pampu ya Maji' }
  };

  /* 燃料类型：URL 里带 fuel 关键词（gasoline / diesel 是农机搜索高频词） */
  var FUEL_SLUG = {
    gasoline: { en: 'gasoline', zh: 'ranqiao', sw: 'petroli', es: 'gasolina', ru: 'benzin', fr: 'essence' },
    diesel: { en: 'diesel', zh: 'chaiyou', sw: 'dizeli', es: 'diesel', ru: 'dizel', fr: 'gazole' }
  };

  /* 从参数表识别燃料用的关键词（按语种列，命中即判定） */
  var FUEL_HINT = {
    gasoline: ['汽油', 'gasoline', 'petrol', 'бензин', 'essence', 'nafta'],
    diesel: ['柴油', 'diesel', 'дизел', 'gazole', 'gasoil']
  };

  /* 识别燃料时优先看的语种顺序：中文参数最全，英文次之 */
  var FUEL_SCAN_LANGS = ['zh', 'en', 'es', 'ru', 'fr', 'sw'];

  function catSlug(cat, lang) {
    var m = CAT_SLUG[cat];
    if (!m) return String(cat || '');
    return m[lang] || m.en || cat;
  }

  function catLabel(cat, lang) {
    var m = CAT_LABEL[cat];
    if (!m) return String(cat || '');
    return m[lang] || m.en || cat;
  }

  /* 看参数表前 3 行（发动机那几行）判断是汽油还是柴油 */
  function detectFuel(product) {
    if (!product || !product.specs) return null;
    for (var i = 0; i < FUEL_SCAN_LANGS.length; i++) {
      var arr = product.specs[FUEL_SCAN_LANGS[i]];
      if (!arr || !arr.length) continue;
      var head = arr.slice(0, 3).join(' ');
      var keys = Object.keys(FUEL_HINT);
      for (var k = 0; k < keys.length; k++) {
        var words = FUEL_HINT[keys[k]];
        for (var j = 0; j < words.length; j++) {
          if (head.indexOf(words[j]) >= 0) return keys[k];
        }
      }
    }
    return null;
  }

  function slugify(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /* 产品 slug：{型号}-{燃料}-{品类}，例 1wg-4-05a-gasoline-micro-tiller */
  function productSlug(product, lang) {
    var parts = [];
    var model = slugify(product && product.model);
    if (model) parts.push(model);
    var fuel = detectFuel(product);
    /* 型号里已经带了燃料词（如 "195 Diesel"）就不再重复加，否则会出现
       195-diesel-diesel-water-pump 这种 URL */
    if (fuel && FUEL_SLUG[fuel][lang] && model.indexOf(FUEL_SLUG[fuel].en) < 0) {
      parts.push(FUEL_SLUG[fuel][lang]);
    }
    var cs = catSlug(product && product.cat, lang);
    if (cs) parts.push(cs);
    return parts.join('-');
  }

  function homePath(lang) { return '/' + lang + '/'; }
  function catPath(cat, lang) { return '/' + lang + '/' + catSlug(cat, lang) + '.html'; }
  function productPath(product, lang) { return '/' + lang + '/product/' + productSlug(product, lang) + '.html'; }

  /* ---------- P2 内容页（指南 / FAQ / 指南索引） ----------
     规则（同样，上线被收录后不能改）：
       指南索引   /{lang}/guides.html
       指南文章   /{lang}/guide/{slug}.html
       FAQ 页     /{lang}/faq.html

     slug 各语种共用同一份（英文小写连字符），只换路径前缀 —— hreflang 互指最省事。
  */
  function guidesIndexPath(lang) { return '/' + lang + '/guides.html'; }
  function guidePath(slug, lang) { return '/' + lang + '/guide/' + slugify(slug) + '.html'; }
  function faqPath(lang) { return '/' + lang + '/faq.html'; }
  function factoryPath(lang) { return '/' + lang + '/factory.html'; }

  /* ---------- 图片版本 ----------
     浏览器 / CDN 对 images/ 下的文件缓存 4 小时（Cache-Control: max-age=14400）。
     换了图但 URL 不变 -> 老用户打开页面看到的还是旧图（老板 2026-11-16 在 /zh/factory.html 踩过：
     页面里还是旧图，点开大图才是新的）。
     所以换任何 images/ 里的图，都要把 IMG_V +1，全站图片 URL 立刻换新。
     浏览器端（js/products.js / js/product.js）与生成器（scripts/build-static.js）共用这一份。 */
  var IMG_V = 2;

  function imgUrl(file, absolute) {
    if (!file) return '';
    var base = (absolute === false) ? 'images/' : '/images/';
    return base + file + '?v=' + IMG_V;
  }

  function abs(p) { return SITE + p; }

  return {
    SITE: SITE,
    LANGS: LANGS,
    CATS: CATS,
    catSlug: catSlug,
    catLabel: catLabel,
    detectFuel: detectFuel,
    slugify: slugify,
    productSlug: productSlug,
    homePath: homePath,
    catPath: catPath,
    productPath: productPath,
    guidesIndexPath: guidesIndexPath,
    guidePath: guidePath,
    faqPath: faqPath,
    factoryPath: factoryPath,
    IMG_V: IMG_V,
    imgUrl: imgUrl,
    abs: abs
  };
});
