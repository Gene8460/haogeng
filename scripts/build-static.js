#!/usr/bin/env node
/* =========================================================
   build-static.js — 多语言静态站生成器
   ---------------------------------------------------------
   用法：
     node scripts/build-static.js            # 输出到 ./dist（预览用）
     node scripts/build-static.js .          # 直接写站点根目录（上线用）
     node scripts/build-static.js dist 2026-11-14   # 指定 lastmod 日期

   生成物：
     {out}/{lang}/index.html                 每个语种的首页
     {out}/{lang}/{品类slug}.html            每个语种的品类落地页
     {out}/{lang}/product/{型号}-{燃料}-{品类}.html   每个语种的产品页
     {out}/sitemap.xml                      含 hreflang alternate 的新 sitemap

   数据来源：js/products.js（产品）+ js/i18n.js（文案）
   URL 规则：js/seo-urls.js（与浏览器端共用，不会两边跑偏）
   ========================================================= */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.resolve(ROOT, process.argv[2] || 'dist');
const BUILD_DATE = process.argv[3] || new Date().toISOString().slice(0, 10);

const SITE = 'https://haogeng.net';
const LANGS = ['en', 'zh', 'sw', 'es', 'ru', 'fr'];
const CATS = ['tiller', 'ditching', 'pump'];
const OG_LOCALE = { en: 'en_US', zh: 'zh_CN', sw: 'sw_KE', es: 'es_ES', ru: 'ru_RU', fr: 'fr_FR' };
const DESC_SUFFIX = {
  en: ' Factory-direct from Liuzhou Haogeng, China. Request a quote.',
  zh: ' 工厂直供，柳州浩耕出品，欢迎询价。',
  sw: ' Moja kwa moja kutoka kiwanda cha Liuzhou Haogeng, China. Tuma uchunguzi wako.',
  es: ' Directo de fábrica de Liuzhou Haogeng, China. Solicite cotización.',
  ru: ' Напрямую с завода Liuzhou Haogeng, Китай. Запросите цену.',
  fr: ' Direct usine de Liuzhou Haogeng, Chine. Demandez un devis.'
};

const urls = require(path.join(ROOT, 'js', 'seo-urls.js'));

/* ---------------------------------------------------------
   0. 工具
   --------------------------------------------------------- */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getByPath(obj, pathStr) {
  return String(pathStr).split('.').reduce(function (o, k) {
    return (o && o[k] !== undefined) ? o[k] : undefined;
  }, obj);
}

/* 取值 + 缺失记录（缺哪个语种的哪个 key，最后统一报告） */
const missingI18n = [];
function T(lang, key) {
  const v = getByPath(I18N[lang], key);
  if (typeof v === 'string' && v !== '') return v;
  const en = getByPath(I18N.en, key);
  missingI18n.push({ lang: lang, key: key, fellBackToEn: typeof en === 'string' });
  return typeof en === 'string' ? en : '';
}

function pickI18n(obj, lang) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  const v = obj[lang];
  if (typeof v === 'string' && v !== '') return v;
  if (typeof obj.en === 'string' && obj.en !== '') return obj.en;
  const first = Object.keys(obj).map(function (k) { return obj[k]; })
    .filter(function (x) { return typeof x === 'string' && x !== ''; })[0];
  return first || '';
}

/* 截断到指定长度（不把单词切一半） */
function truncateWords(str, max) {
  const s = String(str == null ? '' : str).replace(/\s+/g, ' ').trim();
  if (!s) return '';
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  const body = (sp > max * 0.6) ? cut.slice(0, sp) : cut;
  return body.replace(/[\s,;:.·、，。；：-]+$/, '') + '…';
}

function truncateWordsByLang(str, max, lang) {
  // 中文没有空格，按字截；其他语种按词截
  if (lang === 'zh') {
    const s = String(str == null ? '' : str).replace(/\s+/g, ' ').trim();
    return s.length <= max ? s : s.slice(0, max) + '…';
  }
  return truncateWords(str, max);
}

/* ---------------------------------------------------------
   1. 读数据
   --------------------------------------------------------- */
function extractLiteral(src, marker, fromEnd) {
  const i = fromEnd ? src.lastIndexOf(marker) : src.indexOf(marker);
  if (i < 0) throw new Error('找不到标记: ' + marker);
  let j = i + marker.length;
  while (j < src.length && /\s/.test(src[j])) j++;
  const open = src[j];
  const close = open === '{' ? '}' : ']';
  let depth = 0, inStr = false, quote = '', escFlag = false;
  for (let k = j; k < src.length; k++) {
    const ch = src[k];
    if (inStr) {
      if (escFlag) { escFlag = false; continue; }
      if (ch === '\\') { escFlag = true; continue; }
      if (ch === quote) inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = true; quote = ch; continue; }
    if (ch === open) depth++;
    else if (ch === close) { depth--; if (depth === 0) return src.slice(j, k + 1); }
  }
  throw new Error('字面量没有闭合: ' + marker);
}

const productsSrc = fs.readFileSync(path.join(ROOT, 'js', 'products.js'), 'utf8');
const PRODUCTS = JSON.parse(extractLiteral(productsSrc, 'var PRODUCTS ='));

const i18nSrc = fs.readFileSync(path.join(ROOT, 'js', 'i18n.js'), 'utf8');
const I18N = (new Function('return (' + extractLiteral(i18nSrc, 'var I18N =') + ')'))();

/* P2 内容（指南 / FAQ）。文件不存在就当没有内容，不报错。
   注意：content/articles.js 的文件头注释里也出现了一次 "var ARTICLES ="，
   所以这里必须取最后一次出现（fromEnd=true），并且用 new Function 解析
   —— articles.js 是 JS 字面量（无引号键名 / 单引号 / 尾逗号），不是 JSON。 */
const ARTICLES_PATH = path.join(ROOT, 'content', 'articles.js');
const ARTICLES = fs.existsSync(ARTICLES_PATH)
  ? (new Function('return (' + extractLiteral(fs.readFileSync(ARTICLES_PATH, 'utf8'), 'var ARTICLES =', true) + ')'))()
  : [];

const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const productHtml = fs.readFileSync(path.join(ROOT, 'product.html'), 'utf8');

const IMG_DIR = path.join(ROOT, 'images');
function imgExists(file) {
  if (!file) return false;
  try { return fs.statSync(path.join(IMG_DIR, file)).isFile(); } catch (e) { return false; }
}
function webpOf(file) {
  return String(file || '').replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

/* ---------------------------------------------------------
   2. HTML 骨架改造
   --------------------------------------------------------- */
function mustReplace(html, re, replacement, what) {
  /* 注意：不能靠 "替换后是否变化" 判断成败 —— 有些值（例：en 首页的 canonical
     已经是 https://haogeng.net/en/）替换前后完全一样，会被误判成模板变了。
     正确做法是判断正则有没有匹配上。 */
  if (!re.test(html)) {
    throw new Error('替换失败（模板变了？）: ' + what);
  }
  return html.replace(re, replacement);
}

function setCanonical(html, canonical) {
  const tag = '<link rel="canonical" href="' + canonical + '">';
  if (/<link rel="canonical" href="[^"]*">/.test(html)) {
    return html.replace(/<link rel="canonical" href="[^"]*">/, tag);
  }
  return mustReplace(html, /(<meta name="description" content="[^"]*">)/, '$1\n  ' + tag, 'canonical');
}

/* 相对路径 → 根绝对路径（静态页在子目录下，相对路径会 404） */
function absolutize(html) {
  return html.replace(/(src|href|srcset)="(css|js|images)\//g, '$1="/$2/');
}

/* data-i18n / data-i18n-placeholder → 服务端渲染成目标语种 */
function applyI18n(html, lang) {
  html = html.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*?)\bdata-i18n="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g,
    function (m, tag, a1, key, a2) {
      const val = T(lang, key);
      if (!val) return m;
      return '<' + tag + a1 + 'data-i18n="' + key + '"' + a2 + '>' + esc(val) + '</' + tag + '>';
    }
  );
  html = html.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*?)\bdata-i18n-placeholder="([^"]+)"([^>]*?)>/g,
    function (m, tag, a1, key, a2) {
      const val = T(lang, key);
      if (!val) return m;
      return '<' + tag + a1 + 'data-i18n-placeholder="' + key + '"' + a2 + ' placeholder="' + esc(val) + '">';
    }
  );
  return html;
}

/* 语言切换 → 真实链接（静态站每个语种是独立 URL，切换 = 跳转） */
const LANG_LABEL = { en: 'EN', zh: '中文', sw: 'SW', es: 'ES', ru: 'RU', fr: 'FR' };
function langSwitcher(lang, pathFor) {
  const items = LANGS.map(function (l) {
    const cls = 'lang-btn' + (l === lang ? ' active' : '');
    return '<a class="' + cls + '" data-lang="' + l + '" href="' + pathFor(l) + '">' + LANG_LABEL[l] + '</a>';
  }).join('\n        ');
  return '<div class="lang-switch" id="langSwitch">\n        ' + items + '\n      </div>';
}
function replaceLangSwitcher(html, lang, pathFor) {
  return mustReplace(
    html,
    /<div class="lang-switch" id="langSwitch">[\s\S]*?<\/div>/,
    langSwitcher(lang, pathFor),
    '语言切换块'
  );
}

/* 页面 <html> 标签 */
function setHtmlLang(html, lang) {
  return mustReplace(
    html,
    /<html[^>]*>/,
    '<html lang="' + lang + '" dir="ltr" data-lang="' + lang + '">',
    '<html> 标签'
  );
}

/* 头部 SEO 标签 */
function setHead(html, seo) {
  html = mustReplace(html, /<title>[\s\S]*?<\/title>/, '<title>' + esc(seo.title) + '</title>', 'title');
  html = mustReplace(html, /<meta name="description" content="[^"]*">/,
    '<meta name="description" content="' + esc(seo.description) + '">', 'description');
  html = setCanonical(html, seo.canonical);

  html = mustReplace(html, /<meta property="og:title" content="[^"]*">/,
    '<meta property="og:title" content="' + esc(seo.title) + '">', 'og:title');
  html = mustReplace(html, /<meta property="og:description" content="[^"]*">/,
    '<meta property="og:description" content="' + esc(seo.description) + '">', 'og:description');
  html = mustReplace(html, /<meta property="og:url" content="[^"]*">/,
    '<meta property="og:url" content="' + seo.canonical + '">', 'og:url');
  html = mustReplace(html, /<meta property="og:type" content="[^"]*">/,
    '<meta property="og:type" content="' + (seo.ogType || 'website') + '">', 'og:type');
  html = mustReplace(html, /<meta property="og:locale" content="[^"]*">/,
    '<meta property="og:locale" content="' + (OG_LOCALE[seo.lang] || 'en_US') + '">', 'og:locale');
  if (/<meta property="og:image" content="[^"]*">/.test(html)) {
    html = html.replace(/<meta property="og:image" content="[^"]*">/,
      '<meta property="og:image" content="' + seo.image + '">', 'og:image');
  }
  if (/<meta property="og:image:alt" content="[^"]*">/.test(html)) {
    html = html.replace(/<meta property="og:image:alt" content="[^"]*">/,
      '<meta property="og:image:alt" content="' + esc(seo.imageAlt || '') + '">', 'og:image:alt');
  }

  html = mustReplace(html, /<meta name="twitter:title" content="[^"]*">/,
    '<meta name="twitter:title" content="' + esc(seo.title) + '">', 'twitter:title');
  html = mustReplace(html, /<meta name="twitter:description" content="[^"]*">/,
    '<meta name="twitter:description" content="' + esc(seo.description) + '">', 'twitter:description');
  html = mustReplace(html, /<meta name="twitter:image" content="[^"]*">/,
    '<meta name="twitter:image" content="' + seo.image + '">', 'twitter:image');

  // hreflang：先删掉模板里旧的 alternate，再按当前页在各语种的对应 URL 重建
  html = html.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n?/g, '');
  const alternates = seo.alternates.map(function (a) {
    return '  <link rel="alternate" hreflang="' + a.lang + '" href="' + a.href + '">';
  }).join('\n');
  html = html.replace(/(<link rel="canonical" href="[^"]*">)/, '$1\n' + alternates);
  return html;
}

/* JSON-LD：整块替换 */
function setJsonLd(html, graph) {
  const block = '<script type="application/ld+json">\n  ' +
    JSON.stringify({ '@context': 'https://schema.org/', '@graph': graph }, null, 2).split('\n').join('\n  ') +
    '\n  </script>';
  const re = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  if (!re.test(html)) throw new Error('找不到 JSON-LD 块');
  return html.replace(re, block);
}

/* ---------------------------------------------------------
   3. 公共 JSON-LD 节点
   --------------------------------------------------------- */
function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': SITE + '/#organization',
    'name': 'Liuzhou Haogeng International Trade Co., Ltd.',
    'alternateName': ['Haogeng', '浩耕', 'Guigeng Agricultural Machinery'],
    'url': SITE + '/',
    'logo': SITE + '/images/logo-haogeng.jpg',
    'image': SITE + '/images/og-image.jpg',
    'description': 'Export and trading arm of the Guigeng agricultural machinery factory (Guangxi Lichuang Machinery Manufacturing Co., Ltd.), Liuzhou, Guangxi, China. Factory-direct micro tillers, ditching machines and water pumps.',
    'email': 'sales@haogeng.net',
    'telephone': '+86-138-7722-8460',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'No. 86, Liugong Avenue, Liunan District',
      'addressLocality': 'Liuzhou',
      'addressRegion': 'Guangxi',
      'addressCountry': 'CN'
    },
    'contactPoint': [{
      '@type': 'ContactPoint',
      '@id': SITE + '/#contactpoint',
      'contactType': 'sales',
      'email': 'sales@haogeng.net',
      'telephone': '+86-138-7722-8460',
      'availableLanguage': LANGS,
      'areaServed': 'Worldwide'
    }]
  };
}
function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE + '/#website',
    'url': SITE + '/',
    'name': 'Liuzhou Haogeng International Trade Co., Ltd.',
    'inLanguage': 'en',
    'publisher': { '@id': SITE + '/#organization' }
  };
}
function breadcrumbNode(items, pageUrl) {
  return {
    '@type': 'BreadcrumbList',
    '@id': pageUrl + '#breadcrumb',
    itemListElement: items.map(function (it, i) {
      return { '@type': 'ListItem', position: i + 1, name: it.name, item: it.url };
    })
  };
}

/* ---------------------------------------------------------
   4. 产品卡片 / 产品详情（服务端渲染版）
   --------------------------------------------------------- */
function cardSpecsFor(p, lang) {
  const specs = (p.specs && p.specs[lang]) ? p.specs[lang] : ((p.specs && p.specs.en) || []);
  if (p.cat === 'tiller' || p.cat === 'ditching') return specs.slice(0, 2);
  if (p.cat === 'pump') {
    const find = function (kws) {
      return specs.find(function (s) { return kws.some(function (kw) { return s.indexOf(kw) >= 0; }); });
    };
    const engine = find(['发动机', 'Engine', 'Motor', 'Двигатель', 'Moteur']);
    const port = find(['进出水口径', 'Inlet/outlet', 'Diámetro', 'Патрубки', 'Diamètre']);
    const disp = find(['排量', 'Displacement', 'Cilindrada', 'Объём', 'Cylindrée']);
    return [engine, port, disp].filter(Boolean);
  }
  return specs;
}

function cardHtml(p, lang) {
  const name = pickI18n(p.name, lang);
  const catLabel = urls.catLabel(p.cat, lang);
  const inquire = T(lang, 'products.inquire') || 'Send Inquiry';
  const specs = cardSpecsFor(p, lang);

  let imgHtml;
  if (p.img && imgExists(p.img)) {
    const webp = webpOf(p.img);
    const hasWebp = imgExists(webp);
    imgHtml = '<div class="product-img">' +
      (hasWebp ? '<picture><source srcset="/images/' + esc(webp) + '" type="image/webp">' : '') +
      '<img src="/images/' + esc(p.img) + '" alt="' + esc(name) + '" loading="lazy" ' +
      'style="width:auto;height:auto;max-width:100%;max-height:100%;object-fit:contain;"></picture></div>';
  } else {
    imgHtml = '<div class="product-img">📷 <span style="margin-left:8px">' + esc(name) + '</span></div>';
  }

  return '<div class="product-card" data-cat="' + esc(p.cat) + '">' +
    '<a class="product-link" href="' + urls.productPath(p, lang) + '">' +
    imgHtml +
    '<div class="product-body">' +
    '<span class="product-cat">' + esc(catLabel) + '</span>' +
    '<h3 class="product-name">' + esc(name) + '</h3>' +
    '<div class="product-model">' + esc(p.model || '') + '</div>' +
    '<ul class="product-specs">' + specs.map(function (s) { return '<li>· ' + esc(s) + '</li>'; }).join('') + '</ul>' +
    '<span class="product-cta">' + esc(inquire) + ' →</span>' +
    '</div></a></div>';
}

function productsGridHtml(list, lang) {
  return '<div class="product-grid">' + list.map(function (p) { return cardHtml(p, lang); }).join('\n') + '</div>';
}

function detailHtml(p, lang, extraHtml) {
  const name = pickI18n(p.name, lang);
  const desc = pickI18n(p.desc, lang);
  const bestFor = pickI18n(p.bestFor, lang);
  const features = pickI18n(p.features, lang);
  const specs = pickI18n(p.specs, lang);
  const catLabel = urls.catLabel(p.cat, lang);

  const t = function (key) { return T(lang, key); };

  const imgFile = p.img || '';
  let imgHtml;
  if (imgFile && imgExists(imgFile)) {
    const webp = webpOf(imgFile);
    imgHtml = '<picture>' +
      (imgExists(webp) ? '<source srcset="/images/' + esc(webp) + '" type="image/webp">' : '') +
      '<img src="/images/' + esc(imgFile) + '" alt="' + esc(name) + '" loading="lazy">' +
      '</picture>';
  } else {
    imgHtml = '<div style="color:#adb5bd;">📷 No image available</div>';
  }

  const galleryImgs = Array.isArray(p.gallery) ? p.gallery : [];
  let galleryHtml = '';
  if (galleryImgs.length) {
    galleryHtml = '<div class="pd-gallery" id="pdGallery">' +
      '<button type="button" class="pd-gallery-prev" id="pdGalleryPrev" aria-label="Previous">‹</button>' +
      '<div class="pd-gallery-track" id="pdGalleryTrack">' +
      galleryImgs.map(function (g, i) {
        const gWebp = webpOf(g);
        const src = imgExists(g) ? '/images/' + esc(g) : '';
        const srcset = imgExists(gWebp) ? '/images/' + esc(gWebp) : '';
        if (!src) return '';
        return '<div class="pd-gallery-slide' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '">' +
          '<picture>' + (srcset ? '<source srcset="' + srcset + '" type="image/webp">' : '') +
          '<img src="' + src + '" alt="' + esc(name) + ' — view ' + (i + 1) + '" loading="lazy">' +
          '</picture></div>';
      }).join('') +
      '</div>' +
      '<button type="button" class="pd-gallery-next" id="pdGalleryNext" aria-label="Next">›</button>' +
      '<div class="pd-gallery-dots">' +
      galleryImgs.map(function (_, i) { return '<span class="pd-gallery-dot' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"></span>'; }).join('') +
      '</div></div>';
  }

  const specsRows = (specs || []).map(function (line) {
    const idx = line.indexOf(':');
    if (idx === -1) return '<tr><td colspan="2">' + esc(line) + '</td></tr>';
    return '<tr><td>' + esc(line.substring(0, idx).trim()) + '</td><td>' + esc(line.substring(idx + 1).trim()) + '</td></tr>';
  }).join('');

  const bestForItems = (bestFor || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
  const featuresItems = (features || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');

  // 配件区块
  let accessoriesBlock = '';
  if (p.accessoriesImg && imgExists(p.accessoriesImg)) {
    const accWebp = webpOf(p.accessoriesImg);
    const accItems = [1, 2, 3, 4].map(function (i) {
      const item = I18N[lang] && getByPath(I18N[lang], 'products.detail.accessories.item' + i);
      if (!item || !item.name) return '';
      return '<li class="pd-acc-item">' +
        '<div class="pd-acc-bullet">' + i + '</div>' +
        '<div class="pd-acc-body">' +
        '<div class="pd-acc-head">' +
        '<span class="pd-acc-name">' + esc(item.name) + '</span>' +
        '<span class="pd-acc-qty">×' + esc(item.qty) + '</span>' +
        '</div>' +
        '<div class="pd-acc-desc">' + esc(item.desc) + '</div>' +
        '</div></li>';
    }).filter(Boolean).join('');

    accessoriesBlock =
      '<section class="pd-section pd-accessories" id="pd-accessories">' +
      '<h2 class="pd-section-title">' + esc(t('products.detail.accessories.title')) + '</h2>' +
      '<p class="pd-acc-subtitle">' + esc(t('products.detail.accessories.subtitle')) + '</p>' +
      '<div class="pd-acc-image"><picture>' +
      (imgExists(accWebp) ? '<source srcset="/images/' + esc(accWebp) + '" type="image/webp">' : '') +
      '<img src="/images/' + esc(p.accessoriesImg) + '" alt="' + esc(name) + ' accessories" loading="lazy">' +
      '</picture></div>' +
      '<ol class="pd-acc-list">' + accItems + '</ol>' +
      '</section>';
  }

  const homeHref = urls.homePath(lang);

  return '' +
    '<div class="pd-breadcrumb"><div class="container">' +
    '<a href="' + homeHref + '#products">' + esc(t('products.detail.back')) + '</a>' +
    '<span class="pd-sep">/</span>' +
    '<span class="pd-current">' + esc(name) + '</span>' +
    '</div></div>' +

    '<div class="container">' +
    '<section class="pd-hero">' +
    '<div class="pd-hero-info">' +
    '<span class="pd-cat-tag">' + esc(catLabel) + '</span>' +
    '<h1 class="pd-title">' + esc(name) + '</h1>' +
    '<div class="pd-model">Model: ' + esc(p.model || '') + '</div>' +
    '<div class="pd-cta-row">' +
    '<button class="pd-cta-primary" id="pdGetQuoteBtn" data-product-id="' + esc(p.id || '') + '">📩 ' + esc(t('products.detail.getQuote')) + '</button>' +
    '<a href="#pd-specs" class="pd-cta-secondary">📋 ' + esc(t('products.detail.specs')) + '</a>' +
    '</div></div>' +
    '<div class="pd-hero-image">' + imgHtml + '</div>' +
    '</section>' +

    galleryHtml +

    '<section class="pd-section" id="pd-overview">' +
    '<h2 class="pd-section-title">' + esc(t('products.detail.description')) + '</h2>' +
    '<p style="font-size:15px; line-height:1.8; color:#495057;">' + esc(desc) + '</p>' +
    '</section>' +

    '<section class="pd-section">' +
    '<h2 class="pd-section-title">' + esc(t('products.detail.bestFor')) + '</h2>' +
    '<ul class="pd-bestfor-grid">' + bestForItems + '</ul>' +
    '</section>' +

    '<section class="pd-section">' +
    '<h2 class="pd-section-title">' + esc(t('products.detail.features')) + '</h2>' +
    '<ul class="pd-features">' + featuresItems + '</ul>' +
    '</section>' +

    accessoriesBlock +

    '<section class="pd-section" id="pd-specs">' +
    '<h2 class="pd-section-title">' + esc(t('products.detail.specs')) + '</h2>' +
    '<table class="pd-specs-table"><tbody>' + specsRows + '</tbody></table>' +
    '</section>' +

    (extraHtml || '') +

    '<section class="pd-bottom-cta">' +
    '<h2>' + esc(t('products.detail.getQuote')) + '</h2>' +
    '<p>' + esc(t('products.detail.contactSection')) + '</p>' +
    '<div class="pd-cta-row">' +
    '<button class="pd-cta-primary" id="pdGetQuoteBtn2" data-product-id="' + esc(p.id || '') + '">📩 ' + esc(t('products.detail.getQuote')) + '</button>' +
    '<a href="' + homeHref + '#contact" class="pd-cta-secondary">' + esc(t('nav.inquiry')) + '</a>' +
    '</div></section>' +
    '</div>';
}

/* 产品页的小脚本：图集切换 + 询盘弹窗（对应 js/product.js 里的同名逻辑，
   静态页不加载 product.js，所以这里内联一份，避免改线上渲染代码） */
function detailScript(p, lang) {
  const name = pickI18n(p.name, lang);
  const payload = {
    id: p.id || '',
    model: p.model || '',
    name: name,
    cat: p.cat || '',
    page: urls.productPath(p, lang)
  };
  return '<script>\n' +
    '(function(){\n' +
    '  var P = ' + JSON.stringify(payload) + ';\n' +
    '  // 图集\n' +
    '  var track=document.getElementById("pdGalleryTrack");\n' +
    '  if(track){\n' +
    '    var slides=track.querySelectorAll(".pd-gallery-slide");\n' +
    '    var dots=document.querySelectorAll(".pd-gallery-dot");\n' +
    '    var total=slides.length, idx=0;\n' +
    '    function show(i){ idx=(i+total)%total;\n' +
    '      for(var j=0;j<slides.length;j++){slides[j].classList.toggle("active",j===idx);}\n' +
    '      for(var k=0;k<dots.length;k++){dots[k].classList.toggle("active",k===idx);} }\n' +
    '    var prev=document.getElementById("pdGalleryPrev"), next=document.getElementById("pdGalleryNext");\n' +
    '    if(prev)prev.addEventListener("click",function(){show(idx-1);});\n' +
    '    if(next)next.addEventListener("click",function(){show(idx+1);});\n' +
    '    for(var d=0;d<dots.length;d++){(function(n){dots[d].addEventListener("click",function(){show(n);});})(d);}\n' +
    '  }\n' +
    '  // 询盘\n' +
    '  var WA="8613877228460", MAIL="sales@haogeng.net";\n' +
    '  var subject="Inquiry: "+P.name+" (Model "+P.model+")";\n' +
    '  var body="Hello Haogeng,\\n\\nI am interested in the following product:\\n\\nProduct: "+P.name+"\\nModel: "+(P.model||"N/A")+"\\nCategory: "+(P.cat||"N/A")+"\\n\\nPlease send me a quotation with:\\n- FOB price\\n- MOQ\\n- Lead time\\n- Payment terms\\n\\nThank you.";\n' +
    '  var text=body+"\\n\\n--\\nSent from https://haogeng.net"+P.page;\n' +
    '  function open(){\n' +
    '    var overlay=document.getElementById("inquiryOverlay"); if(!overlay)return;\n' +
    '    var pv=document.getElementById("inquiryPreview"), wa=document.getElementById("inquiryWA"), ml=document.getElementById("inquiryMail");\n' +
    '    var gm=document.getElementById("inquiryGmail"), ol=document.getElementById("inquiryOutlook"), cp=document.getElementById("inquiryCopy");\n' +
    '    var wb=document.getElementById("inquiryWebmail"), hint=document.getElementById("inquiryAutoCopy");\n' +
    '    if(pv)pv.textContent="Subject: "+subject+"\\n\\n"+body;\n' +
    '    if(wa)wa.href="https://wa.me/"+WA+"?text="+encodeURIComponent(text);\n' +
    '    if(ml)ml.href="mailto:"+MAIL+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);\n' +
    '    if(gm)gm.href="https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(MAIL)+"&su="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);\n' +
    '    if(ol)ol.href="https://outlook.live.com/mail/0/deeplink/compose?to="+encodeURIComponent(MAIL)+"&subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);\n' +
    '    if(cp)cp.dataset.text=text;\n' +
    '    if(wb)wb.style.display="flex";\n' +
    '    if(hint)hint.style.display="none";\n' +
    '    overlay.classList.add("open"); overlay.setAttribute("aria-hidden","false");\n' +
    '    document.body.style.overflow="hidden";\n' +
    '    try{ if(typeof gtag==="function"){gtag("event","generate_lead",{method:"product_detail",product_id:P.id});} }catch(e){}\n' +
    '  }\n' +
    '  var bs=document.querySelectorAll("#pdGetQuoteBtn,#pdGetQuoteBtn2");\n' +
    '  for(var i=0;i<bs.length;i++){bs[i].addEventListener("click",function(e){e.preventDefault();open();});}\n' +
    '})();\n' +
    '</script>';
}

/* ---------------------------------------------------------
   4b. P2 内容（指南 / FAQ / 指南索引）
   ---------------------------------------------------------
   核心：文章里的机型参数一律用 {{spec:型号:字段}} 占位，生成时从
   js/products.js 现取现填 —— 保证文章和产品表永远一致，AI 起草也不会编参数。
   --------------------------------------------------------- */
const specIssues = [];
const missingArticleLangs = [];

function normModel(s) {
  return String(s == null ? '' : s).toLowerCase().replace(/[\s_]+/g, '');
}
function productByModel(model) {
  const k = normModel(model);
  return PRODUCTS.find(function (p) { return normModel(p.model) === k; }) || null;
}

/* 在参数表里按字段名找行号（字段名不区分大小写；先精确匹配，再包含匹配） */
function findSpecIndex(specs, f) {
  let hit = -1;
  specs.forEach(function (line, i) {
    if (hit >= 0) return;
    const key = String(line).split(/[:：]/)[0].trim().toLowerCase();
    if (key === f) hit = i;
  });
  if (hit < 0) {
    specs.forEach(function (line, i) {
      if (hit >= 0) return;
      if (String(line).toLowerCase().indexOf(f) >= 0) hit = i;
    });
  }
  return hit;
}

/* 取某个型号的某个参数值。
   参数表 6 个语种「行序完全一致」（js/products.js），所以先用英文参数表
   定位行号，再取目标语种同一行的值 —— 这样文章正文统一写英文字段名
   {{spec:型号:Rated power}}，翻成中/西/斯/俄/法后仍然取得到数。 */
function specValue(product, field, lang) {
  const f = String(field == null ? '' : field).trim().toLowerCase();
  if (!f) return null;
  const enSpecs = (product.specs && product.specs.en) || [];
  const langSpecs = (product.specs && (product.specs[lang] || product.specs.en)) || [];
  let idx = findSpecIndex(langSpecs, f);
  if (idx < 0) {
    const enIdx = findSpecIndex(enSpecs, f);
    if (enIdx < 0 || enIdx >= langSpecs.length) return null;
    idx = enIdx;
  }
  const line = langSpecs[idx];
  const cut = line.search(/[:：]/);
  return cut === -1 ? String(line).trim() : String(line).substring(cut + 1).trim();
}

/* 把 {{spec:型号:字段}} 换成真实参数值 */
function resolveSpecs(text, lang, where) {
  return String(text == null ? '' : text).replace(/\{\{spec:([^:}]+):([^}]+)\}\}/g, function (m, model, field) {
    const p = productByModel(model);
    if (!p) {
      specIssues.push({ where: where, model: model, field: field, reason: '找不到型号' });
      return '[' + model + ' ' + field + ']';
    }
    const v = specValue(p, field, lang);
    if (v === null) {
      specIssues.push({ where: where, model: model, field: field, reason: '找不到参数项' });
      return '[' + field + ']';
    }
    return v;
  });
}

/* 行内 Markdown：**加粗** · [文字](链接) · [[model:型号|文字]]（自动链产品页）
   · [[cat:品类|文字]]（链到品类页） · [[home|文字]]（链到首页联系区）
   —— 分类/首页链接必须用占位符，否则翻译成别的语种时链接还是英文路径。 */
function inlineMd(s, lang) {
  /* 占位符先解析、转义后再回填 —— 型号里带 " 的（如 2" Centrifugal）
     若先整体转义，型号就查不到了。 */
  const slots = [];
  function hold(html) { slots.push(html); return '\u0000' + (slots.length - 1) + '\u0000'; }
  let raw = String(s == null ? '' : s);
  raw = raw.replace(/\[\[model:([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (m, model, text) {
    const p = productByModel(model);
    if (!p) {
      specIssues.push({ where: 'model link', model: model, field: '-', reason: '找不到型号' });
      return hold(esc(model));
    }
    return hold('<a href="' + urls.productPath(p, lang) + '">' + esc(text || model) + '</a>');
  });
  raw = raw.replace(/\[\[cat:([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (m, cat, text) {
    const c = String(cat).trim();
    if (CATS.indexOf(c) < 0) {
      specIssues.push({ where: 'cat link', model: c, field: '-', reason: '品类不存在' });
      return hold(esc(text || c));
    }
    return hold('<a href="' + urls.catPath(c, lang) + '">' + esc(text || urls.catLabel(c, lang)) + '</a>');
  });
  raw = raw.replace(/\[\[home(?:\|([^\]]+))?\]\]/g, function (m, text) {
    return hold('<a href="' + urls.homePath(lang) + '#contact">' + esc(text || 'Contact us') + '</a>');
  });
  let out = esc(raw);
  out = out.replace(/\u0000(\d+)\u0000/g, function (m, i) { return slots[Number(i)]; });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return out;
}

/* 极简 Markdown → HTML：## / ### 标题、- 列表、空行分段 */
function renderMd(src, lang) {
  const lines = String(src == null ? '' : src).split(/\r?\n/);
  let html = '', inList = false;
  const para = [];
  function flushPara() {
    if (para.length) { html += '<p>' + inlineMd(para.join(' '), lang) + '</p>\n'; para.length = 0; }
  }
  function closeList() {
    if (inList) { html += '</ul>\n'; inList = false; }
  }
  lines.forEach(function (line) {
    const t = line.trim();
    if (!t) { flushPara(); closeList(); return; }
    if (/^###\s+/.test(t)) { flushPara(); closeList(); html += '<h3>' + inlineMd(t.replace(/^###\s+/, ''), lang) + '</h3>\n'; return; }
    if (/^##\s+/.test(t)) { flushPara(); closeList(); html += '<h2>' + inlineMd(t.replace(/^##\s+/, ''), lang) + '</h2>\n'; return; }
    if (/^#\s+/.test(t)) { flushPara(); closeList(); html += '<h2>' + inlineMd(t.replace(/^#\s+/, ''), lang) + '</h2>\n'; return; }
    if (/^[-*]\s+/.test(t)) {
      flushPara();
      if (!inList) { html += '<ul>\n'; inList = true; }
      html += '<li>' + inlineMd(t.replace(/^[-*]\s+/, ''), lang) + '</li>\n';
      return;
    }
    para.push(t);
  });
  flushPara();
  closeList();
  return html;
}

/* 某篇文章在某语种有没有正文 */
function hasBody(a, lang) {
  const b = a.body || {};
  return typeof b[lang] === 'string' && b[lang].trim() !== '';
}
function articlesOfLang(lang) {
  return ARTICLES.filter(function (a) { return hasBody(a, lang); });
}
function articleTitle(a, lang) {
  const t = a.title || {};
  if (typeof t[lang] === 'string' && t[lang] !== '') return t[lang];
  if (typeof t.en === 'string' && t.en !== '') {
    missingArticleLangs.push({ slug: a.slug, lang: lang, field: 'title', fellBackToEn: true });
    return t.en;
  }
  missingArticleLangs.push({ slug: a.slug, lang: lang, field: 'title', fellBackToEn: false });
  return a.slug;
}
function articleDesc(a, lang) {
  const d = a.desc || {};
  const v = (typeof d[lang] === 'string' && d[lang]) ? d[lang] : (d.en || '');
  return v;
}
/* 该文章在哪些语种有正文（hreflang 只指真正存在的页面，避免 404） */
function articleLangs(a) {
  return LANGS.filter(function (l) { return hasBody(a, l); });
}

/* 相关指南：同品类优先，最多 3 篇 */
function relatedArticles(a, lang, limit) {
  const max = limit || 3;
  const pool = articlesOfLang(lang).filter(function (x) { return x.slug !== a.slug; });
  const same = pool.filter(function (x) { return x.cat && x.cat === a.cat; });
  const rest = pool.filter(function (x) { return !(x.cat && x.cat === a.cat); });
  return same.concat(rest).slice(0, max);
}
function relatedGuidesHtml(a, lang, limit) {
  const list = relatedArticles(a, lang, limit);
  if (!list.length) return '';
  const t = function (k) { return T(lang, k); };
  return '<section class="pd-section article-related">' +
    '<h2 class="pd-section-title">' + esc(t('articles.related')) + '</h2>' +
    '<ul class="article-related-list">' +
    list.map(function (x) {
      return '<li><a href="' + urls.guidePath(x.slug, lang) + '">' + esc(articleTitle(x, lang)) + '</a>' +
        '<span class="article-related-meta">' + esc(x.cat ? urls.catLabel(x.cat, lang) : '') + '</span></li>';
    }).join('') +
    '</ul></section>';
}

/* 某个品类下的相关指南（品类页 / 产品页用） */
function relatedGuidesForCat(cat, lang, limit) {
  const list = articlesOfLang(lang).filter(function (a) { return a.cat === cat; }).slice(0, limit || 3);
  if (!list.length) return '';
  const t = function (k) { return T(lang, k); };
  return '<section class="pd-section article-related">' +
    '<h2 class="pd-section-title">' + esc(t('articles.related')) + '</h2>' +
    '<div class="guide-grid">' + list.map(function (a) {
      const d = articleDesc(a, lang);
      return '<div class="guide-card">' +
        '<h3 class="guide-card-title"><a href="' + urls.guidePath(a.slug, lang) + '">' + esc(articleTitle(a, lang)) + '</a></h3>' +
        (d ? '<p class="guide-card-desc">' + esc(truncateWordsByLang(d, 140, lang)) + '</p>' : '') +
        '</div>';
    }).join('') + '</div></section>';
}

/* 指南列表项（首页 / 索引页 / 品类页复用） */
function guideCardsHtml(list, lang, limit) {
  const max = limit || list.length;
  const t = function (k) { return T(lang, k); };
  return '<div class="guide-grid">' + list.slice(0, max).map(function (a) {
    const desc = articleDesc(a, lang);
    return '<div class="guide-card">' +
      '<h3 class="guide-card-title"><a href="' + urls.guidePath(a.slug, lang) + '">' + esc(articleTitle(a, lang)) + '</a></h3>' +
      (desc ? '<p class="guide-card-desc">' + esc(truncateWordsByLang(desc, 160, lang)) + '</p>' : '') +
      '<span class="guide-card-cta">' + esc(t('articles.readMore')) + ' →</span>' +
      '</div>';
  }).join('') + '</div>';
}

/* FAQ 区块（页面可见 + FAQPage 结构化数据）
   FAQ 文本里的 {{spec:}} 也要解析，否则结构化数据里会出现占位符原文。 */
function faqText(f, lang, where) {
  const q = (f.q && (f.q[lang] || f.q.en)) || '';
  const a = (f.a && (f.a[lang] || f.a.en)) || '';
  return {
    q: resolveSpecs(q, lang, where || 'faq'),
    a: resolveSpecs(a, lang, where || 'faq')
  };
}
function faqSectionHtml(faqItems, lang, where) {
  if (!faqItems || !faqItems.length) return '';
  const t = function (k) { return T(lang, k); };
  const rows = faqItems.map(function (f) {
    const x = faqText(f, lang, where);
    if (!x.q || !x.a) return '';
    return '<div class="faq-item"><h3 class="faq-q">' + esc(x.q) + '</h3>' +
      '<div class="faq-a">' + esc(x.a) + '</div></div>';
  }).filter(Boolean).join('');
  if (!rows) return '';
  return '<section class="pd-section article-faq" id="faq">' +
    '<h2 class="pd-section-title">' + esc(t('articles.faqTitle')) + '</h2>' +
    '<p class="article-lead">' + esc(t('articles.faqLead')) + '</p>' +
    rows + '</section>';
}
function faqNode(faqItems, lang, pageUrl, where) {
  const items = (faqItems || []).map(function (f) {
    const x = faqText(f, lang, where);
    if (!x.q || !x.a) return null;
    return {
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a }
    };
  }).filter(Boolean);
  if (!items.length) return null;
  return { '@type': 'FAQPage', '@id': pageUrl + '#faq', mainEntity: items };
}

/* ---------------------------------------------------------
   5. 各类页面
   --------------------------------------------------------- */
function productsOf(cat) {
  return PRODUCTS.filter(function (p) { return p.cat === cat; });
}

/* 首页：以 index.html 为骨架 */
function buildHome(lang) {
  let html = indexHtml;

  html = setHtmlLang(html, lang);
  html = absolutize(html);
  html = applyI18n(html, lang);
  html = replaceLangSwitcher(html, lang, function (l) { return urls.homePath(l); });

  // 产品区：去掉筛选按钮（静态站不做前端筛选），改成三个品类分块
  const catBlocks = CATS.map(function (cat) {
    const list = productsOf(cat);
    const label = urls.catLabel(cat, lang);
    const modelsLabel = T(lang, 'hero.stat2.label') || 'Product Models';
    const lead = T(lang, 'products.lead') || '';
    const countTxt = list.length + ' ' + modelsLabel.toLowerCase() + '.';
    return '' +
      '<div class="cat-block" id="cat-' + cat + '">' +
      '<h3 class="cat-block-title"><a href="' + urls.catPath(cat, lang) + '">' + esc(label) + '</a></h3>' +
      '<p class="cat-block-lead">' + esc(countTxt + ' ' + lead) + '</p>' +
      productsGridHtml(list, lang) +
      '<p style="text-align:center;margin-top:22px">' +
      '<a class="btn btn-primary" href="' + urls.catPath(cat, lang) + '">' + esc(label) + ' →</a></p>' +
      '</div>';
  }).join('\n');

  const productsBlockRe = /<div class="filter-bar" id="filterBar">[\s\S]*?<div class="product-grid" id="productGrid">[\s\S]*?<\/div>/;
  if (!productsBlockRe.test(html)) throw new Error('首页产品区结构变了，找不到 filter-bar / product-grid');
  html = html.replace(productsBlockRe, '<div class="cat-blocks">\n' + catBlocks + '\n      </div>');

  // 首页不需要 products.js（列表已经是静态渲染的）
  html = html.replace(/[ \t]*<script src="\/js\/products\.js[^"]*"><\/script>\n?/g, '');

  // 导航加 Guides 入口
  html = addContentNav(html, lang);
  html = addFactoryEntry(html, lang);

  // 首页挂「选型指南」区块（消孤岛页，把长尾内容引到首页）
  const guidesBlock = guidesSectionHtml(lang, 6);
  if (guidesBlock) {
    if (!/<footer class="footer">/.test(html)) throw new Error('首页结构变了，找不到 footer');
    html = html.replace('<footer class="footer">', guidesBlock + '<footer class="footer">');
  }

  const canonical = urls.abs(urls.homePath(lang));
  const desc = T(lang, 'hero.sub') + ' ' + (DESC_SUFFIX[lang] || DESC_SUFFIX.en);
  const seo = {
    lang: lang,
    title: T(lang, 'hero.title') + ' | Liuzhou Haogeng',
    description: truncateWordsByLang(desc, 160, lang),
    canonical: canonical,
    ogType: 'website',
    image: SITE + '/images/og-image.jpg',
    imageAlt: T(lang, 'hero.title'),
    alternates: LANGS.map(function (l) { return { lang: l, href: urls.abs(urls.homePath(l)) }; })
      .concat([{ lang: 'x-default', href: urls.abs(urls.homePath('en')) }])
  };
  html = setHead(html, seo);

  const graph = [organizationNode(), websiteNode(), {
    '@type': 'WebPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: seo.title,
    isPartOf: { '@id': SITE + '/#website' },
    about: { '@id': SITE + '/#organization' },
    inLanguage: lang
  }, breadcrumbNode([{ name: T(lang, 'nav.home') || 'Home', url: canonical }], canonical)];
  html = setJsonLd(html, graph);

  return { html: html, path: urls.homePath(lang) };
}

/* 品类页：以 product.html 为骨架 */
function buildCategory(cat, lang) {
  const list = productsOf(cat);
  const label = urls.catLabel(cat, lang);
  let html = productHtml;

  html = setHtmlLang(html, lang);
  html = absolutize(html);
  html = applyI18n(html, lang);
  html = html.replace(/href="index\.html#/g, 'href="/' + lang + '/#');
  html = replaceLangSwitcher(html, lang, function (l) { return urls.catPath(cat, l); });
  html = html.replace(/[ \t]*<script src="\/js\/products\.js[^"]*"><\/script>\n?/g, '');
  html = html.replace(/[ \t]*<script src="\/js\/product\.js[^"]*"><\/script>\n?/g, '');
  html = addContentNav(html, lang);

  const modelsLabel = T(lang, 'hero.stat2.label') || 'Product Models';
  const lead = T(lang, 'products.lead') || '';
  const canonical = urls.abs(urls.catPath(cat, lang));

  const main = '' +
    '<main class="section" id="products">' +
    '<div class="container">' +
    '<div class="pd-breadcrumb" style="padding-top:0;"><div class="container" style="padding:0;">' +
    '<a href="' + urls.homePath(lang) + '">' + esc(T(lang, 'nav.home') || 'Home') + '</a>' +
    '<span class="pd-sep">/</span>' +
    '<span class="pd-current">' + esc(label) + '</span>' +
    '</div></div>' +
    '<h1 class="pd-title" style="margin:10px 0 8px;">' + esc(label) + '</h1>' +
    '<p class="section-lead">' + esc(list.length + ' ' + modelsLabel.toLowerCase() + '. ' + lead) + '</p>' +
    productsGridHtml(list, lang) +
    relatedGuidesForCat(cat, lang, 3) +
    '<section class="pd-bottom-cta" style="margin-top:48px;">' +
    '<h2>' + esc(T(lang, 'products.detail.getQuote')) + '</h2>' +
    '<p>' + esc(T(lang, 'products.detail.contactSection')) + '</p>' +
    '<div class="pd-cta-row">' +
    '<a class="btn btn-primary" href="' + urls.homePath(lang) + '#contact">' + esc(T(lang, 'nav.inquiry')) + '</a>' +
    '<a class="btn btn-ghost" href="' + urls.homePath(lang) + '#why">' + esc(T(lang, 'nav.why')) + '</a>' +
    '</div></section>' +
    '</div></main>';

  html = mustReplace(html, /<main id="productDetail" class="product-detail">[\s\S]*?<\/main>/, main, '详情页 main 容器');

  const seo = {
    lang: lang,
    title: label + ' Manufacturer China | Liuzhou Haogeng',
    description: truncateWordsByLang(
      list.length + ' ' + modelsLabel.toLowerCase() + '. ' + lead + ' ' + (DESC_SUFFIX[lang] || DESC_SUFFIX.en), 160, lang),
    canonical: canonical,
    ogType: 'website',
    image: SITE + '/images/og-image.jpg',
    imageAlt: label,
    alternates: LANGS.map(function (l) { return { lang: l, href: urls.abs(urls.catPath(cat, l)) }; })
      .concat([{ lang: 'x-default', href: urls.abs(urls.catPath(cat, 'en')) }])
  };
  html = setHead(html, seo);

  const graph = [organizationNode(), websiteNode(), {
    '@type': 'CollectionPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: seo.title,
    isPartOf: { '@id': SITE + '/#website' },
    about: { '@id': SITE + '/#organization' },
    inLanguage: lang,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: list.map(function (p, i) {
        return {
          '@type': 'ListItem',
          position: i + 1,
          url: urls.abs(urls.productPath(p, lang)),
          name: pickI18n(p.name, lang)
        };
      })
    }
  }, breadcrumbNode([
    { name: T(lang, 'nav.home') || 'Home', url: urls.abs(urls.homePath(lang)) },
    { name: T(lang, 'nav.products') || 'Products', url: urls.abs(urls.homePath(lang)) + '#products' },
    { name: label, url: canonical }
  ], canonical)];
  html = setJsonLd(html, graph);

  return { html: html, path: urls.catPath(cat, lang) };
}

/* 产品页：以 product.html 为骨架 */
function buildProduct(p, lang) {
  let html = productHtml;

  html = setHtmlLang(html, lang);
  html = absolutize(html);
  html = applyI18n(html, lang);
  html = html.replace(/href="index\.html#/g, 'href="/' + lang + '/#');
  html = replaceLangSwitcher(html, lang, function (l) { return urls.productPath(p, l); });
  html = html.replace(/[ \t]*<script src="\/js\/products\.js[^"]*"><\/script>\n?/g, '');
  html = html.replace(/[ \t]*<script src="\/js\/product\.js[^"]*"><\/script>\n?/g, '');
  html = addContentNav(html, lang);

  const name = pickI18n(p.name, lang);
  const desc = pickI18n(p.desc, lang);
  const suffix = DESC_SUFFIX[lang] || DESC_SUFFIX.en;
  const metaDesc = desc.length + suffix.length <= 160
    ? desc + suffix
    : truncateWordsByLang(desc, 160 - suffix.length, lang) + suffix;

  const canonical = urls.abs(urls.productPath(p, lang));

  html = mustReplace(html, /<main id="productDetail" class="product-detail">[\s\S]*?<\/main>/,
    '<main class="product-detail">\n    ' + detailHtml(p, lang, relatedGuidesForCat(p.cat, lang, 3)) + '\n  </main>', '详情页 main 容器');

  // 内联小脚本（图集 + 询盘）
  html = html.replace('</body>', detailScript(p, lang) + '\n</body>');

  const imgFile = p.img || '';
  const imgUrl = imgFile ? SITE + '/images/' + imgFile : SITE + '/images/og-image.jpg';
  const gallery = Array.isArray(p.gallery) ? p.gallery : [];
  const images = [imgFile].concat(gallery).filter(Boolean).map(function (f) { return SITE + '/images/' + f; });

  const seo = {
    lang: lang,
    title: name + (p.model ? ' (' + p.model + ')' : '') + ' | Liuzhou Haogeng',
    description: metaDesc,
    canonical: canonical,
    ogType: 'product',
    image: imgUrl,
    imageAlt: name,
    alternates: LANGS.map(function (l) { return { lang: l, href: urls.abs(urls.productPath(p, l)) }; })
      .concat([{ lang: 'x-default', href: urls.abs(urls.productPath(p, 'en')) }])
  };
  html = setHead(html, seo);

  // 参数表 → additionalProperty
  const specs = pickI18n(p.specs, lang) || [];
  const additionalProperty = specs.map(function (line) {
    const m = String(line).match(/^(.+?)\s*[:：]\s*(.+)$/);
    if (!m) return null;
    return { '@type': 'PropertyValue', name: m[1].trim(), value: m[2].trim() };
  }).filter(Boolean);

  const productNode = {
    '@type': 'Product',
    '@id': canonical + '#product',
    name: name,
    url: canonical,
    sku: p.id || '',
    mpn: p.model || '',
    model: p.model || '',
    description: desc,
    image: images,
    category: urls.catLabel(p.cat, lang),
    inLanguage: lang,
    brand: { '@type': 'Brand', name: 'Guigeng', alternateName: 'Haogeng' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Guangxi Lichuang Machinery Manufacturing Co., Ltd.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 86, Liugong Avenue, Liunan District',
        addressLocality: 'Liuzhou',
        addressRegion: 'Guangxi',
        addressCountry: 'CN'
      }
    },
    additionalProperty: additionalProperty
    // ⚠️ 有真实 FOB 价后再加 offers（price 必须 > 0，否则 Google 报 Missing price 整块忽略）
  };

  const graph = [organizationNode(), websiteNode(), {
    '@type': 'WebPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: seo.title,
    isPartOf: { '@id': SITE + '/#website' },
    about: { '@id': SITE + '/#organization' },
    breadcrumb: { '@id': canonical + '#breadcrumb' },
    inLanguage: lang
  }, breadcrumbNode([
    { name: T(lang, 'nav.home') || 'Home', url: urls.abs(urls.homePath(lang)) },
    { name: T(lang, 'nav.products') || 'Products', url: urls.abs(urls.homePath(lang)) + '#products' },
    { name: label0(p, lang), url: canonical }
  ], canonical), productNode];
  html = setJsonLd(html, graph);

  return { html: html, path: urls.productPath(p, lang) };
}

function label0(p, lang) {
  return urls.catLabel(p.cat, lang);
}

/* ---------------------------------------------------------
   5b. P2 页面：指南索引 / 指南文章 / FAQ
   --------------------------------------------------------- */

/* 某语种的目标页：优先文章页 → 指南索引 → 首页（避免链到不存在的页面） */
function guideTarget(lang, article) {
  if (article && hasBody(article, lang)) return urls.guidePath(article.slug, lang);
  if (articlesOfLang(lang).length) return urls.guidesIndexPath(lang);
  return urls.homePath(lang);
}
function guidesTarget(lang) {
  return articlesOfLang(lang).length ? urls.guidesIndexPath(lang) : urls.homePath(lang);
}
function faqTarget(lang) {
  return articlesOfLang(lang).length ? urls.faqPath(lang) : urls.homePath(lang);
}

/* 导航里插入 Guides 入口（首页 <nav class="menu">，详情页 <ul class="nav-menu">）
   该语种一篇文章都没有时不做入口 —— 否则导航指向不存在的页面。 */
/* 顶部导航：有文章的语种才注入「选型指南 / 常见问题」两个入口（其余语种无这两页，避免死链） */
/* 顶部导航：有文章的语种才注入「选型指南 / 常见问题」两个入口（其余语种无这两页，避免死链） */
function addContentNav(html, lang) {
  if (!articlesOfLang(lang).length) return html;
  if (html.indexOf('nav-guides') >= 0) return html;
  const gLabel = T(lang, 'nav.guides') || 'Guides';
  const fLabel = T(lang, 'nav.faq') || 'FAQ';
  const gLink = '<a href="' + urls.guidesIndexPath(lang) + '" class="nav-guides">' + esc(gLabel) + '</a>';
  const fLink = '<a href="' + urls.faqPath(lang) + '" class="nav-faq">' + esc(fLabel) + '</a>';
  if (/<nav class="menu" id="menu">/.test(html)) {
    return html.replace(/(<nav class="menu" id="menu">)([\s\S]*?)(<\/nav>)/, function (m, a, body, c) {
      return a + body.replace(/([\s]+)$/, '') + '\n        ' + gLink + '\n        ' + fLink + '\n      ' + c;
    });
  }
  if (/<ul class="nav-menu" id="navMenu">/.test(html)) {
    return html.replace(/(<ul class="nav-menu" id="navMenu">)([\s\S]*?)(<\/ul>)/, function (m, a, body, c) {
      return a + body.replace(/([\s]+)$/, '') + '\n        <li>' + gLink + '</li>\n        <li>' + fLink + '</li>\n      ' + c;
    });
  }
  return html;
}

function addFactoryEntry(html, lang) {
  return html.replace(/href="\/en\/factory\.html"/g, 'href="/' + lang + '/factory.html"');
}

/* 首页的「选型指南」区块 */
function guidesSectionHtml(lang, limit) {
  const list = articlesOfLang(lang);
  if (!list.length) return '';
  const t = function (k) { return T(lang, k); };
  return '<section class="section section-alt" id="guides">\n' +
    '    <div class="container">\n' +
    '      <h2 class="section-title">' + esc(t('articles.indexTitle')) + '</h2>\n' +
    '      <p class="section-lead">' + esc(t('articles.indexLead')) + '</p>\n' +
    guideCardsHtml(list, lang, limit || 6) + '\n' +
    '      <p style="text-align:center;margin-top:22px"><a class="btn btn-primary" href="' +
    urls.guidesIndexPath(lang) + '">' + esc(t('articles.allGuides')) + ' →</a></p>\n' +
    '    </div>\n  </section>\n\n  ';
}

/* 指南索引页 */
function buildGuidesIndex(lang) {
  let html = productHtml;
  html = setHtmlLang(html, lang);
  html = absolutize(html);
  html = applyI18n(html, lang);
  html = html.replace(/href="index\.html#/g, 'href="/' + lang + '/#');
  html = replaceLangSwitcher(html, lang, function (l) { return guidesTarget(l); });
  html = html.replace(/[ \t]*<script src="\/js\/products\.js[^"]*"><\/script>\n?/g, '');
  html = html.replace(/[ \t]*<script src="\/js\/product\.js[^"]*"><\/script>\n?/g, '');
  html = addContentNav(html, lang);

  const list = articlesOfLang(lang);
  const t = function (k) { return T(lang, k); };
  const canonical = urls.abs(urls.guidesIndexPath(lang));

  const groups = CATS.map(function (cat) {
    const items = list.filter(function (a) { return a.cat === cat; });
    if (!items.length) return '';
    return '<section class="pd-section">' +
      '<h2 class="pd-section-title">' + esc(urls.catLabel(cat, lang)) + '</h2>' +
      guideCardsHtml(items, lang) +
      '</section>';
  }).join('');

  const main = '<main class="section" id="guidesIndex">' +
    '<div class="container">' +
    '<div class="pd-breadcrumb" style="padding-top:0;"><div class="container" style="padding:0;">' +
    '<a href="' + urls.homePath(lang) + '">' + esc(t('nav.home') || 'Home') + '</a>' +
    '<span class="pd-sep">/</span>' +
    '<span class="pd-current">' + esc(t('articles.indexTitle')) + '</span>' +
    '</div></div>' +
    '<h1 class="pd-title" style="margin:10px 0 8px;">' + esc(t('articles.indexTitle')) + '</h1>' +
    '<p class="section-lead">' + esc(t('articles.indexLead')) + '</p>' +
    (groups || '<p class="section-lead">' + esc(t('articles.indexLead')) + '</p>') +
    '<section class="pd-bottom-cta" style="margin-top:48px;">' +
    '<h2>' + esc(t('products.detail.getQuote')) + '</h2>' +
    '<p>' + esc(t('products.detail.contactSection')) + '</p>' +
    '<div class="pd-cta-row">' +
    '<a class="btn btn-primary" href="' + urls.homePath(lang) + '#contact">' + esc(t('nav.inquiry')) + '</a>' +
    '<a class="btn btn-ghost" href="' + urls.faqPath(lang) + '">' + esc(t('articles.faqTitle')) + '</a>' +
    '</div></section>' +
    '</div></main>';

  html = mustReplace(html, /<main id="productDetail" class="product-detail">[\s\S]*?<\/main>/, main, '指南索引页 main');

  const seo = {
    lang: lang,
    title: t('articles.indexTitle') + ' | Liuzhou Haogeng',
    description: truncateWordsByLang(t('articles.indexLead'), 160, lang),
    canonical: canonical,
    ogType: 'website',
    image: SITE + '/images/og-image.jpg',
    imageAlt: t('articles.indexTitle'),
    alternates: LANGS.filter(function (l) { return articlesOfLang(l).length; })
      .map(function (l) { return { lang: l, href: urls.abs(urls.guidesIndexPath(l)) }; })
      .concat([{ lang: 'x-default', href: urls.abs(urls.guidesIndexPath(articlesOfLang('en').length ? 'en' : lang)) }])
  };
  html = setHead(html, seo);

  const graph = [organizationNode(), websiteNode(), {
    '@type': 'CollectionPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: seo.title,
    isPartOf: { '@id': SITE + '/#website' },
    about: { '@id': SITE + '/#organization' },
    inLanguage: lang,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: list.map(function (a, i) {
        return {
          '@type': 'ListItem',
          position: i + 1,
          url: urls.abs(urls.guidePath(a.slug, lang)),
          name: articleTitle(a, lang)
        };
      })
    }
  }, breadcrumbNode([
    { name: t('nav.home') || 'Home', url: urls.abs(urls.homePath(lang)) },
    { name: t('articles.indexTitle'), url: canonical }
  ], canonical)];
  html = setJsonLd(html, graph);

  return { html: html, path: urls.guidesIndexPath(lang) };
}

/* 单篇指南 */
function buildArticle(a, lang) {
  let html = productHtml;
  html = setHtmlLang(html, lang);
  html = absolutize(html);
  html = applyI18n(html, lang);
  html = html.replace(/href="index\.html#/g, 'href="/' + lang + '/#');
  html = replaceLangSwitcher(html, lang, function (l) { return guideTarget(l, a); });
  html = html.replace(/[ \t]*<script src="\/js\/products\.js[^"]*"><\/script>\n?/g, '');
  html = html.replace(/[ \t]*<script src="\/js\/product\.js[^"]*"><\/script>\n?/g, '');
  html = addContentNav(html, lang);

  const t = function (k) { return T(lang, k); };
  const title = articleTitle(a, lang);
  const raw = (a.body && a.body[lang]) || (a.body && a.body.en) || '';
  const bodyHtml = renderMd(resolveSpecs(raw, lang, a.slug), lang);
  const canonical = urls.abs(urls.guidePath(a.slug, lang));

  const coverSrc = (a.img && imgExists(a.img)) ? '/images/' + a.img : '/images/og-image.jpg';
  const cover = '<figure class="article-cover">' +
    '<picture>' +
    (a.img && imgExists(webpOf(a.img)) ? '<source srcset="/images/' + esc(webpOf(a.img)) + '" type="image/webp">' : '') +
    '<img src="' + esc(coverSrc) + '" alt="' + esc(title) + '" loading="lazy">' +
    '</picture></figure>';

  const meta = '<p class="article-meta">' +
    (a.date ? '<span>' + esc(t('articles.published')) + ': ' + esc(a.date) + '</span>' : '') +
    (a.cat ? '<span>' + esc(t('products.title') || 'Products') + ': <a href="' + urls.catPath(a.cat, lang) + '">' + esc(urls.catLabel(a.cat, lang)) + '</a></span>' : '') +
    '</p>';

  const faq = Array.isArray(a.faq) ? a.faq : [];
  const main = '<main class="section article-page" id="articleDetail">' +
    '<div class="container">' +
    '<div class="pd-breadcrumb" style="padding-top:0;"><div class="container" style="padding:0;">' +
    '<a href="' + urls.homePath(lang) + '">' + esc(t('nav.home') || 'Home') + '</a>' +
    '<span class="pd-sep">/</span>' +
    '<a href="' + urls.guidesIndexPath(lang) + '">' + esc(t('articles.allGuides')) + '</a>' +
    '<span class="pd-sep">/</span>' +
    '<span class="pd-current">' + esc(title) + '</span>' +
    '</div></div>' +
    '<h1 class="pd-title" style="margin:10px 0 8px;">' + esc(title) + '</h1>' +
    meta + cover +
    '<div class="article-body">' + bodyHtml + '</div>' +
    faqSectionHtml(faq, lang, a.slug) +
    relatedGuidesHtml(a, lang, 3) +
    '<section class="pd-bottom-cta">' +
    '<h2>' + esc(t('products.detail.getQuote')) + '</h2>' +
    '<p>' + esc(t('products.detail.contactSection')) + '</p>' +
    '<div class="pd-cta-row">' +
    '<a class="btn btn-primary" href="' + urls.homePath(lang) + '#contact">' + esc(t('nav.inquiry')) + '</a>' +
    '<a class="btn btn-ghost" href="' + urls.catPath(a.cat || 'tiller', lang) + '">' + esc(urls.catLabel(a.cat || 'tiller', lang)) + '</a>' +
    '</div></section>' +
    '</div></main>';

  html = mustReplace(html, /<main id="productDetail" class="product-detail">[\s\S]*?<\/main>/, main, '文章页 main');

  const desc = articleDesc(a, lang) || bodyHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const seo = {
    lang: lang,
    title: title + ' | Liuzhou Haogeng',
    description: truncateWordsByLang(desc, 160, lang),
    canonical: canonical,
    ogType: 'article',
    image: SITE + coverSrc,
    imageAlt: title,
    alternates: articleLangs(a).map(function (l) { return { lang: l, href: urls.abs(urls.guidePath(a.slug, l)) }; })
      .concat([{ lang: 'x-default', href: urls.abs(urls.guidePath(a.slug, articleLangs(a).indexOf('en') >= 0 ? 'en' : lang)) }])
  };
  html = setHead(html, seo);

  const graph = [organizationNode(), websiteNode(), {
    '@type': 'WebPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: seo.title,
    isPartOf: { '@id': SITE + '/#website' },
    about: { '@id': SITE + '/#organization' },
    inLanguage: lang
  }, breadcrumbNode([
    { name: t('nav.home') || 'Home', url: urls.abs(urls.homePath(lang)) },
    { name: t('articles.allGuides'), url: urls.abs(urls.guidesIndexPath(lang)) },
    { name: title, url: canonical }
  ], canonical), {
    '@type': 'Article',
    '@id': canonical + '#article',
    headline: title,
    description: truncateWordsByLang(desc, 200, lang),
    url: canonical,
    inLanguage: lang,
    datePublished: a.date || BUILD_DATE,
    dateModified: BUILD_DATE,
    image: [SITE + coverSrc],
    author: { '@id': SITE + '/#organization' },
    publisher: { '@id': SITE + '/#organization' },
    mainEntityOfPage: { '@id': canonical + '#webpage' }
  }];

  const fq = faqNode(faq, lang, canonical, a.slug);
  if (fq) graph.push(fq);
  html = setJsonLd(html, graph);

  return { html: html, path: urls.guidePath(a.slug, lang) };
}

/* 汇总 FAQ 页 */
function buildFaq(lang) {
  let html = productHtml;
  html = setHtmlLang(html, lang);
  html = absolutize(html);
  html = applyI18n(html, lang);
  html = html.replace(/href="index\.html#/g, 'href="/' + lang + '/#');
  html = replaceLangSwitcher(html, lang, function (l) { return faqTarget(l); });
  html = html.replace(/[ \t]*<script src="\/js\/products\.js[^"]*"><\/script>\n?/g, '');
  html = html.replace(/[ \t]*<script src="\/js\/product\.js[^"]*"><\/script>\n?/g, '');
  html = addContentNav(html, lang);

  const t = function (k) { return T(lang, k); };
  const allFaq = [];
  ARTICLES.forEach(function (a) {
    if (!hasBody(a, lang)) return;
    (Array.isArray(a.faq) ? a.faq : []).forEach(function (f) { allFaq.push(f); });
  });

  const canonical = urls.abs(urls.faqPath(lang));
  const main = '<main class="section article-page" id="faqIndex">' +
    '<div class="container">' +
    '<div class="pd-breadcrumb" style="padding-top:0;"><div class="container" style="padding:0;">' +
    '<a href="' + urls.homePath(lang) + '">' + esc(t('nav.home') || 'Home') + '</a>' +
    '<span class="pd-sep">/</span>' +
    '<span class="pd-current">' + esc(t('articles.faqTitle')) + '</span>' +
    '</div></div>' +
    '<h1 class="pd-title" style="margin:10px 0 8px;">' + esc(t('articles.faqTitle')) + '</h1>' +
    '<p class="section-lead">' + esc(t('articles.faqLead')) + '</p>' +
    '<div class="article-faq-list">' +
    (allFaq.length
      ? allFaq.map(function (f) {
        const x = faqText(f, lang, 'faq-page');
        if (!x.q || !x.a) return '';
        return '<div class="faq-item"><h3 class="faq-q">' + esc(x.q) + '</h3><div class="faq-a">' + esc(x.a) + '</div></div>';
      }).filter(Boolean).join('')
      : '<p class="section-lead">' + esc(t('articles.faqLead')) + '</p>') +
    '</div>' +
    '<section class="pd-bottom-cta">' +
    '<h2>' + esc(t('products.detail.getQuote')) + '</h2>' +
    '<p>' + esc(t('products.detail.contactSection')) + '</p>' +
    '<div class="pd-cta-row">' +
    '<a class="btn btn-primary" href="' + urls.homePath(lang) + '#contact">' + esc(t('nav.inquiry')) + '</a>' +
    '<a class="btn btn-ghost" href="' + urls.guidesIndexPath(lang) + '">' + esc(t('articles.allGuides')) + '</a>' +
    '</div></section>' +
    '</div></main>';

  html = mustReplace(html, /<main id="productDetail" class="product-detail">[\s\S]*?<\/main>/, main, 'FAQ 页 main');

  const seo = {
    lang: lang,
    title: t('articles.faqTitle') + ' | Liuzhou Haogeng',
    description: truncateWordsByLang(t('articles.faqLead'), 160, lang),
    canonical: canonical,
    ogType: 'website',
    image: SITE + '/images/og-image.jpg',
    imageAlt: t('articles.faqTitle'),
    alternates: LANGS.filter(function (l) { return articlesOfLang(l).length; })
      .map(function (l) { return { lang: l, href: urls.abs(urls.faqPath(l)) }; })
      .concat([{ lang: 'x-default', href: urls.abs(urls.faqPath(articlesOfLang('en').length ? 'en' : lang)) }])
  };
  html = setHead(html, seo);

  const graph = [organizationNode(), websiteNode(), {
    '@type': 'FAQPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: seo.title,
    isPartOf: { '@id': SITE + '/#website' },
    about: { '@id': SITE + '/#organization' },
    inLanguage: lang,
    mainEntity: (faqNode(allFaq, lang, canonical, 'faq-page') || { mainEntity: [] }).mainEntity
  }, breadcrumbNode([
    { name: t('nav.home') || 'Home', url: urls.abs(urls.homePath(lang)) },
    { name: t('articles.faqTitle'), url: canonical }
  ], canonical)];
  html = setJsonLd(html, graph);

  return { html: html, path: urls.faqPath(lang) };
}

/* ---------------------------------------------------------
   5.5 工厂实拍页
   --------------------------------------------------------- */
const FACTORY_PHOTOS = [
  { file: 'news-showroom.jpg', cap: 'factory.capShowroom' },
  { file: 'news-assembly.jpg', cap: 'factory.capAssembly' },
  { file: 'news-packing.jpg', cap: 'factory.capPacking' },
  { file: 'tiller-001.jpg', cat: 'tiller' },
  { file: 'ditch-001.jpg', cat: 'ditching' },
  { file: 'pump-001.jpg', cat: 'pump' }
];

function factoryGalleryHtml(lang) {
  const t = function (k) { return T(lang, k); };
  return '<div class="factory-gallery">' +
    FACTORY_PHOTOS.filter(function (p) { return imgExists(p.file); }).map(function (p) {
      const cap = p.cap ? (t(p.cap) || '') : (urls.catLabel(p.cat, lang) || '');
      const webp = webpOf(p.file);
      return '<figure class="factory-photo">' +
        '<picture>' +
        (imgExists(webp) ? '<source srcset="/images/' + esc(webp) + '" type="image/webp">' : '') +
        '<img src="/images/' + esc(p.file) + '" alt="' + esc(cap) + '" loading="lazy">' +
        '</picture>' +
        '<figcaption>' + esc(cap) + '</figcaption>' +
        '</figure>';
    }).join('') +
    '</div>';
}

function buildFactory(lang) {
  let html = productHtml;
  html = setHtmlLang(html, lang);
  html = absolutize(html);
  html = applyI18n(html, lang);
  html = html.replace(/href="index\.html#/g, 'href="/' + lang + '/#');
  html = replaceLangSwitcher(html, lang, function (l) { return urls.factoryPath(l); });
  html = html.replace(/[ \t]*<script src="\/js\/products\.js[^"]*"><\/script>\n?/g, '');
  html = html.replace(/[ \t]*<script src="\/js\/product\.js[^"]*"><\/script>\n?/g, '');
  html = addContentNav(html, lang);

  const t = function (k) { return T(lang, k); };
  const title = t('factory.title');
  const canonical = urls.abs(urls.factoryPath(lang));

  let main = '<main class="section article-page" id="factoryPage">' +
    '<div class="container">' +
    '<div class="pd-breadcrumb" style="padding-top:0;"><div class="container" style="padding:0;">' +
    '<a href="' + urls.homePath(lang) + '">' + esc(t('nav.home') || 'Home') + '</a>' +
    '<span class="pd-sep">/</span>' +
    '<span class="pd-current">' + esc(title) + '</span>' +
    '</div></div>' +
    '<h1 class="pd-title" style="margin:10px 0 8px;">' + esc(title) + '</h1>' +
    '<p class="section-lead">' + esc(t('factory.lead')) + '</p>' +
    factoryGalleryHtml(lang);

  for (let i = 1; i <= 5; i++) {
    const h = t('factory.s' + i + 'Title');
    const p = t('factory.s' + i + 'Text');
    if (!h || !p) continue;
    main += '<section class="factory-block">' +
      '<h2 class="factory-h2">' + esc(h) + '</h2>' +
      '<p class="factory-p">' + esc(p) + '</p>' +
      '</section>';
  }

  main += '<section class="pd-bottom-cta">' +
    '<h2>' + esc(t('factory.cta')) + '</h2>' +
    '<p>' + esc(t('products.detail.contactSection')) + '</p>' +
    '<div class="pd-cta-row">' +
    '<a class="btn btn-primary" href="' + urls.homePath(lang) + '#contact">' + esc(t('nav.inquiry')) + '</a>' +
    '<a class="btn btn-ghost" href="' + urls.catPath('tiller', lang) + '">' + esc(urls.catLabel('tiller', lang)) + '</a>' +
    '</div></section>' +
    '</div></main>';

  html = mustReplace(html, /<main id="productDetail" class="product-detail">[\s\S]*?<\/main>/, main, '工厂页 main');

  const seo = {
    lang: lang,
    title: title + ' | Liuzhou Haogeng',
    description: truncateWordsByLang(t('factory.lead'), 160, lang),
    canonical: canonical,
    ogType: 'website',
    image: SITE + '/images/og-image.jpg',
    imageAlt: title,
    alternates: LANGS.map(function (l) { return { lang: l, href: urls.abs(urls.factoryPath(l)) }; })
      .concat([{ lang: 'x-default', href: urls.abs(urls.factoryPath('en')) }])
  };
  html = setHead(html, seo);

  const graph = [organizationNode(), websiteNode(), {
    '@type': 'WebPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': SITE + '/#website' },
    about: { '@id': SITE + '/#organization' },
    inLanguage: lang
  }, breadcrumbNode([
    { name: t('nav.home') || 'Home', url: urls.abs(urls.homePath(lang)) },
    { name: title, url: canonical }
  ], canonical)];
  html = setJsonLd(html, graph);

  return { html: html, path: urls.factoryPath(lang) };
}

/* ---------------------------------------------------------
   6. sitemap
   --------------------------------------------------------- */
function buildSitemap(pages) {
  const byPath = {};
  pages.forEach(function (p) {
    byPath[p.key] = p;
  });
  const blocks = pages.map(function (p) {
    const altLangs = p.altsLangs || LANGS;
    const alts = altLangs.map(function (l) {
      const alt = byPath[p.key.replace('{' + p.lang + '}', '{' + l + '}')];
      return alt ? '    <xhtml:link rel="alternate" hreflang="' + l + '" href="' + alt.url + '"/>' : null;
    }).filter(Boolean).concat([
      '    <xhtml:link rel="alternate" hreflang="x-default" href="' + p.defaultUrl + '"/>'
    ]);
    return '  <url>\n' +
      '    <loc>' + p.url + '</loc>\n' +
      '    <lastmod>' + BUILD_DATE + '</lastmod>\n' +
      '    <changefreq>weekly</changefreq>\n' +
      '    <priority>' + p.priority + '</priority>\n' +
      alts.join('\n') + '\n' +
      '  </url>';
  }).join('\n');

  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    blocks + '\n' +
    '</urlset>\n';
}

/* ---------------------------------------------------------
   7. 主流程
   --------------------------------------------------------- */
function writeFile(relPath, content) {
  const full = path.join(OUT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function main() {
  // 先清掉上一轮生成的语种目录：改了型号/slug 之后旧页面会残留成死链
  LANGS.forEach(function (lang) {
    const dir = path.join(OUT, lang);
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  });

  const written = [];
  const sitemapPages = [];

  // slug 冲突检查
  const seen = {};
  PRODUCTS.forEach(function (p) {
    LANGS.forEach(function (lang) {
      const s = urls.productPath(p, lang);
      if (seen[s]) {
        console.log('  [冲突] ' + s + '  ← ' + p.id + ' 与 ' + seen[s] + ' 重复');
      }
      seen[s] = p.id;
    });
  });

  // 文章 slug 冲突检查（同 slug 会互相覆盖）
  const seenSlug = {};
  ARTICLES.forEach(function (a) {
    if (seenSlug[a.slug]) {
      console.log('  [冲突] 文章 slug "' + a.slug + '" 出现两次');
    }
    seenSlug[a.slug] = a.slug;
    LANGS.forEach(function (lang) {
      if (!hasBody(a, lang)) return;
      const s = urls.guidePath(a.slug, lang);
      if (seen[s]) console.log('  [冲突] ' + s + '  ← 两条文章同 slug');
      seen[s] = a.slug;
    });
  });

  LANGS.forEach(function (lang) {
    // 首页
    const home = buildHome(lang);
    writeFile(lang + '/index.html', home.html);
    written.push(home.path);
    sitemapPages.push({
      key: 'home{' + lang + '}', lang: lang, url: urls.abs(urls.homePath(lang)),
      defaultUrl: urls.abs(urls.homePath('en')), priority: '1.0'
    });

    // 品类页
    CATS.forEach(function (cat) {
      const page = buildCategory(cat, lang);
      writeFile(lang + '/' + path.basename(page.path), page.html);
      written.push(page.path);
      sitemapPages.push({
        key: 'cat-' + cat + '{' + lang + '}', lang: lang, url: urls.abs(page.path),
        defaultUrl: urls.abs(urls.catPath(cat, 'en')), priority: '0.9'
      });
    });

    // 产品页
    PRODUCTS.forEach(function (p) {
      const page = buildProduct(p, lang);
      writeFile(lang + '/product/' + path.basename(page.path), page.html);
      written.push(page.path);
      sitemapPages.push({
        key: 'product-' + p.id + '{' + lang + '}', lang: lang, url: urls.abs(page.path),
        defaultUrl: urls.abs(urls.productPath(p, 'en')), priority: '0.8'
      });
    });

    // 工厂实拍页
    {
      const page = buildFactory(lang);
      writeFile(lang + '/factory.html', page.html);
      written.push(page.path);
      sitemapPages.push({
        key: 'factory{' + lang + '}', lang: lang, url: urls.abs(page.path),
        defaultUrl: urls.abs(urls.factoryPath('en')), priority: '0.7'
      });
    }

    // P2：指南索引页（该语种一篇文章都没有就不生成，避免空页面）
    if (articlesOfLang(lang).length) {
      const page = buildGuidesIndex(lang);
      writeFile(lang + '/guides.html', page.html);
      written.push(page.path);
      sitemapPages.push({
        key: 'guides{' + lang + '}', lang: lang, url: urls.abs(page.path),
        defaultUrl: urls.abs(urls.guidesIndexPath('en')), priority: '0.7'
      });
    }

    // P2：单篇指南（只生成有正文的语种）
    ARTICLES.forEach(function (a) {
      if (!hasBody(a, lang)) return;
      const page = buildArticle(a, lang);
      writeFile(lang + '/guide/' + path.basename(page.path), page.html);
      written.push(page.path);
      const altsLangs = articleLangs(a);
      const defaultLang = altsLangs.indexOf('en') >= 0 ? 'en' : lang;
      sitemapPages.push({
        key: 'guide-' + a.slug + '{' + lang + '}', lang: lang, url: urls.abs(page.path),
        defaultUrl: urls.abs(urls.guidePath(a.slug, defaultLang)),
        priority: '0.7', altsLangs: altsLangs
      });
    });

    // P2：汇总 FAQ 页（同上，没内容不生成）
    if (articlesOfLang(lang).length) {
      const page = buildFaq(lang);
      writeFile(lang + '/faq.html', page.html);
      written.push(page.path);
      sitemapPages.push({
        key: 'faq{' + lang + '}', lang: lang, url: urls.abs(page.path),
        defaultUrl: urls.abs(urls.faqPath('en')), priority: '0.6'
      });
    }
  });

  writeFile('sitemap.xml', buildSitemap(sitemapPages));

  // ---- 报告 ----
  console.log('生成完成 → ' + OUT);
  console.log('  页面数: ' + written.length + ' 个 HTML + sitemap.xml');
  console.log('  lastmod: ' + BUILD_DATE);
  console.log('  语言: ' + LANGS.join(', '));
  console.log('  品类: ' + CATS.map(function (c) { return c + '(' + productsOf(c).length + ')'; }).join(', '));

  if (missingI18n.length) {
    console.log('\n  [i18n 缺失] 共 ' + missingI18n.length + ' 处（已回落英文，需补翻译）：');
    const uniq = {};
    missingI18n.forEach(function (m) {
      const k = m.key + '|' + m.lang;
      if (!uniq[k]) { uniq[k] = m; console.log('    - ' + m.lang + ' : ' + m.key + (m.fellBackToEn ? ' (回落 en)' : ' (没有英文!)')); }
    });
  } else {
    console.log('\n  [i18n] 6 个语种的文案全部齐全');
  }

  const noImg = PRODUCTS.filter(function (p) { return !imgExists(p.img || ''); });
  if (noImg.length) {
    console.log('\n  [缺图] ' + noImg.length + ' 个产品主图在 images/ 里找不到：');
    noImg.forEach(function (p) { console.log('    - ' + p.id + ' (' + (p.img || '无 img 字段') + ')'); });
  }

  // ---- P2 内容报告 ----
  console.log('\n  === P2 内容（指南 / FAQ） ===');
  console.log('  文章总数: ' + ARTICLES.length + ' 篇');
  LANGS.forEach(function (lang) {
    const n = articlesOfLang(lang).length;
    const faqN = ARTICLES.filter(function (a) { return hasBody(a, lang); })
      .reduce(function (s, a) { return s + (Array.isArray(a.faq) ? a.faq.length : 0); }, 0);
    console.log('    - ' + lang + ': ' + n + ' 篇（FAQ ' + faqN + ' 条）');
  });

  if (!ARTICLES.length) {
    console.log('  content/articles.js 还是空的 —— P2 页面本次未生成（正常，文章灌进去后重跑）');
  }

  if (missingArticleLangs.length) {
    console.log('\n  [文章缺翻译] 共 ' + missingArticleLangs.length + ' 处（标题已回落英文，需补）：');
    const uniqA = {};
    missingArticleLangs.forEach(function (m) {
      const k = m.slug + '|' + m.lang + '|' + m.field;
      if (!uniqA[k]) {
        uniqA[k] = m;
        console.log('    - ' + m.slug + ' : ' + m.lang + ' : ' + m.field + (m.fellBackToEn ? ' (回落 en)' : ' (没有英文!)'));
      }
    });
  }

  const specRowIssues = [];
  PRODUCTS.forEach(function (p) {
    const en = (p.specs && p.specs.en) || [];
    LANGS.forEach(function (lang) {
      const rows = (p.specs && p.specs[lang]) || [];
      if (rows.length !== en.length) {
        specRowIssues.push(p.model + ' / ' + lang + ': ' + rows.length + ' 行 != en ' + en.length + ' 行');
      }
    });
  });
  if (specRowIssues.length) {
    console.log('\n  [参数表行数不一致] 共 ' + specRowIssues.length + ' 处 —— 跨语种取参数会串行，必须修：');
    specRowIssues.forEach(function (x) { console.log('    - ' + x); });
  } else {
    console.log('\n  [参数表行数] 6 个语种与 en 完全一致');
  }

  if (specIssues.length) {
    console.log('\n  [参数占位符错误] 共 ' + specIssues.length + ' 处 —— 必须改到 0，否则文章里的参数是错的：');
    const uniqS = {};
    specIssues.forEach(function (s) {
      const k = s.where + '|' + s.model + '|' + s.field;
      if (!uniqS[k]) {
        uniqS[k] = s;
        console.log('    - ' + s.where + ' : {{spec:' + s.model + ':' + s.field + '}} → ' + s.reason);
      }
    });
  } else if (ARTICLES.length) {
    console.log('\n  [参数占位符] 全部引用正确');
  }

  const noCover = ARTICLES.filter(function (a) { return a.img && !imgExists(a.img); });
  if (noCover.length) {
    console.log('\n  [文章缺首图] ' + noCover.length + ' 篇（Article 没 image 会被降权）：');
    noCover.forEach(function (a) { console.log('    - ' + a.slug + ' (' + a.img + ')'); });
  }
  const noCoverAtAll = ARTICLES.filter(function (a) { return !a.img || !imgExists(a.img); });
  if (noCoverAtAll.length) {
    console.log('  [文章首图] 共 ' + noCoverAtAll.length + ' 篇没有可用首图，需补图或删掉 img 字段');
  }

  const urls2 = {};
  let dup = 0;
  sitemapPages.forEach(function (p) {
    if (urls2[p.url]) { dup++; console.log('  [重复 URL] ' + p.url); }
    urls2[p.url] = 1;
  });
  console.log('\n  sitemap URL 数: ' + sitemapPages.length + '（重复 ' + dup + '）');
  console.log('\n下一步：');
  console.log('  预览: 用本地静态服务器打开 ' + OUT + ' 目录');
  console.log('  上线: node scripts/build-static.js .   （把生成物写到站点根目录，再一起提交）');
}

main();
