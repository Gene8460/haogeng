/* =========================================================
   product.js — 产品详情页渲染与询盘交互
   依赖: products.js (PRODUCTS), i18n.js (I18N, t, setLang, currentLang)
   ========================================================= */

(function() {
  'use strict';

  // ===== 全局常量（SEO） =====
  const SITE = 'https://haogeng.net';
  /* 图片版本号：与 js/seo-urls.js 的 IMG_V 一致（换图两边一起 +1） */
  const IMG_V = (window.HaogengUrls && window.HaogengUrls.IMG_V) || 2;
  const imgSrc = (f) => f ? 'images/' + f + '?v=' + IMG_V : '';
  const imgAbs = (f) => f ? SITE + '/images/' + f + '?v=' + IMG_V : '';
  const OG_LOCALE = { en: 'en_US', zh: 'zh_CN', sw: 'sw_KE', es: 'es_ES', ru: 'ru_RU', fr: 'fr_FR' };
  const DESC_SUFFIX = {
    en: ' Factory-direct from Liuzhou Haogeng, China. Request a quote.',
    zh: ' 工厂直供，柳州浩耕出品，欢迎询价。',
    sw: ' Moja kwa moja kutoka kiwanda cha Liuzhou Haogeng, China. Tuma uchunguzi wako.',
    es: ' Directo de fábrica de Liuzhou Haogeng, China. Solicite cotización.',
    ru: ' Напрямую с завода Liuzhou Haogeng, Китай. Запросите цену.',
    fr: ' Direct usine de Liuzhou Haogeng, Chine. Demandez un devis.'
  };
  const CAT_LABEL_MAP = {
    tiller: { en: 'Micro Tiller', zh: '微耕机', es: 'Motocultor', ru: 'Мотокультиватор', fr: 'Motoculteur', sw: 'Matrekta' },
    ditching: { en: 'Ditching Machine', zh: '开沟培土机', es: 'Máquina Zanjas', ru: 'Машина для канав', fr: 'Machine à Fossés', sw: 'Mashine ya Makorongo' },
    pump: { en: 'Water Pump', zh: '抽水机', es: 'Bomba de Agua', ru: 'Водяной насос', fr: 'Pompe à Eau', sw: 'Pampu ya Maji' }
  };

  function catLabelFor(cat, lang) {
    const m = CAT_LABEL_MAP[cat];
    if (!m) return cat || '';
    return m[lang] || m.en || cat;
  }

  // 按词截断，避免把单词/词组切一半（比 substring(0,160) 干净）
  function truncateWords(str, max) {
    const s = String(str == null ? '' : str).replace(/\s+/g, ' ').trim();
    if (!s) return '';
    if (s.length <= max) return s;
    const cut = s.slice(0, max);
    const sp = cut.lastIndexOf(' ');
    const body = (sp > max * 0.6) ? cut.slice(0, sp) : cut;
    return body.replace(/[\s,;:.·、，。；：-]+$/, '') + '…';
  }

  function setAttr(selector, attr, value) {
    let el = document.querySelector(selector);
    if (!el) {
      // meta[property="og:xxx"] / meta[name="twitter:xxx"] 不存在时自动补一个
      const m = selector.match(/^meta\[(?:property|name)="([^"]+)"\]$/);
      if (!m) return;
      el = document.createElement('meta');
      el.setAttribute(m[1].indexOf('og:') === 0 ? 'property' : 'name', m[1]);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  }

  function ensureLink(rel, href) {
    let el = document.querySelector('link[rel="' + rel + '"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  // hreflang 互指（静态多语言 URL 上线后，6 个语种各指向自己的真实页面）
  function ensureAlternates(list) {
    list.forEach(function (a) {
      let el = document.querySelector('link[rel="alternate"][hreflang="' + a.lang + '"]');
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', a.lang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', a.href);
    });
  }

  // 产品页的规范 URL：优先用静态多语言地址（/{lang}/product/...），
  // 没有 seo-urls.js 时回落到旧的 product.html?id=xx
  function canonicalUrlFor(product) {
    if (window.HaogengUrls && window.HaogengUrls.productPath) {
      return SITE + window.HaogengUrls.productPath(product, 'en');
    }
    return SITE + '/product.html?id=' + encodeURIComponent(product.id || '');
  }

  // ===== 标题 / 描述 / canonical / OG / Twitter =====
  function applySeoMeta(product, lang) {
    const name = pickI18n(product.name, lang) || product.model || '';
    const desc = pickI18n(product.desc, lang) || '';
    const model = product.model || '';
    const title = name + (model ? ' (' + model + ')' : '') + ' | Liuzhou Haogeng';
    const pageUrl = canonicalUrlFor(product);

    document.title = title;
    document.documentElement.lang = lang;

    // description：产品简介 + 工厂直供补充句，整体控制在 ~160 字符以内
    const suffix = DESC_SUFFIX[lang] || DESC_SUFFIX.en;
    let metaDesc;
    if (!desc) {
      metaDesc = suffix.trim();
    } else if (desc.length + suffix.length <= 160) {
      metaDesc = desc + suffix;
    } else {
      metaDesc = truncateWords(desc, 160 - suffix.length) + suffix;
    }
    setAttr('meta[name="description"]', 'content', metaDesc);

    // canonical：指向静态多语言产品页，避免新旧两套 URL 抢同一页权重
    ensureLink('canonical', pageUrl);

    // hreflang：6 个语种互指
    if (window.HaogengUrls && window.HaogengUrls.LANGS) {
      const alts = window.HaogengUrls.LANGS.map(function (l) {
        return { lang: l, href: SITE + window.HaogengUrls.productPath(product, l) };
      });
      alts.push({ lang: 'x-default', href: SITE + window.HaogengUrls.productPath(product, 'en') });
      ensureAlternates(alts);
    }

    // Open Graph
    const img = imgAbs(product.img || 'og-image.jpg');
    setAttr('meta[property="og:title"]', 'content', title);
    setAttr('meta[property="og:description"]', 'content', metaDesc);
    setAttr('meta[property="og:url"]', 'content', pageUrl);
    setAttr('meta[property="og:type"]', 'content', 'product');
    setAttr('meta[property="og:image"]', 'content', img);
    setAttr('meta[property="og:image:alt"]', 'content', name);
    setAttr('meta[property="og:locale"]', 'content', OG_LOCALE[lang] || 'en_US');

    // Twitter Card
    setAttr('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setAttr('meta[name="twitter:title"]', 'content', title);
    setAttr('meta[name="twitter:description"]', 'content', metaDesc);
    setAttr('meta[name="twitter:image"]', 'content', img);
  }

  function getQueryParam(name) {
    const m = location.search.match(new RegExp('[?&]' + name + '=([^&#]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function pickI18n(obj, lang) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.en || Object.values(obj)[0] || '';
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderDetail(product, lang) {
    const name = pickI18n(product.name, lang);
    const desc = pickI18n(product.desc, lang);
    const bestFor = pickI18n(product.bestFor, lang);
    const features = pickI18n(product.features, lang);
    const specs = pickI18n(product.specs, lang);
    const cat = product.cat || '';
    const catLabel = catLabelFor(cat, lang);

    const t = (key) => getByPath((window.I18N && window.I18N[lang]) || {}, key);

    const imgFile = product.img || '';
    const imgWebp = imgFile.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const imgHtml = imgFile
      ? `<picture>
           <source srcset="${imgSrc(imgWebp)}" type="image/webp">
           <img src="${imgSrc(imgFile)}" alt="${name}" loading="lazy">
         </picture>`
      : `<div style="color:#adb5bd;">📷 No image available</div>`;

    const galleryImgs = Array.isArray(product.gallery) ? product.gallery : [];
    const galleryHtml = galleryImgs.length
      ? `<div class="pd-gallery" id="pdGallery">
           <button type="button" class="pd-gallery-prev" id="pdGalleryPrev" aria-label="Previous">‹</button>
           <div class="pd-gallery-track" id="pdGalleryTrack">
             ${galleryImgs.map((g, i) => {
               const gWebp = g.replace(/\.(jpg|jpeg|png)$/i, '.webp');
               return `<div class="pd-gallery-slide${i === 0 ? ' active' : ''}" data-idx="${i}">
                 <picture>
                   <source srcset="${imgSrc(gWebp)}" type="image/webp">
                   <img src="${imgSrc(g)}" alt="${escapeHtml(name)} — view ${i + 1}" loading="lazy">
                 </picture>
               </div>`;
             }).join('')}
           </div>
           <button type="button" class="pd-gallery-next" id="pdGalleryNext" aria-label="Next">›</button>
           <div class="pd-gallery-dots">
             ${galleryImgs.map((_, i) => `<span class="pd-gallery-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></span>`).join('')}
           </div>
         </div>`
      : '';

    const specsRows = (specs || []).map(line => {
      const idx = line.indexOf(':');
      if (idx === -1) return `<tr><td colspan="2">${escapeHtml(line)}</td></tr>`;
      const label = line.substring(0, idx).trim();
      const value = line.substring(idx + 1).trim();
      return `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`;
    }).join('');

    const bestForItems = (bestFor || []).map(item => `<li>${escapeHtml(item)}</li>`).join('');
    const featuresItems = (features || []).map(item => `<li>${escapeHtml(item)}</li>`).join('');

    // ── 配件清单区块（按需渲染） ──
    let accessoriesBlock = '';
    if (product.accessoriesImg) {
      const accImg = product.accessoriesImg;
      const accWebp = accImg.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const accItems = [1, 2, 3, 4].map(i => {
        const item = t('products.detail.accessories.item' + i);
        if (!item || !item.name) return '';
        return `<li class="pd-acc-item">
            <div class="pd-acc-bullet">${i}</div>
            <div class="pd-acc-body">
              <div class="pd-acc-head">
                <span class="pd-acc-name">${escapeHtml(item.name)}</span>
                <span class="pd-acc-qty">×${escapeHtml(item.qty)}</span>
              </div>
              <div class="pd-acc-desc">${escapeHtml(item.desc)}</div>
            </div>
          </li>`;
      }).filter(Boolean).join('');

      accessoriesBlock = `
        <section class="pd-section pd-accessories" id="pd-accessories">
          <h2 class="pd-section-title">${escapeHtml(t('products.detail.accessories.title'))}</h2>
          <p class="pd-acc-subtitle">${escapeHtml(t('products.detail.accessories.subtitle'))}</p>
          <div class="pd-acc-image">
            <picture>
              <source srcset="${imgSrc(accWebp)}" type="image/webp">
              <img src="${imgSrc(accImg)}" alt="${escapeHtml(name)} accessories" loading="lazy">
            </picture>
          </div>
          <ol class="pd-acc-list">${accItems}</ol>
        </section>
      `;
    }

    const backText = t('products.detail.back');
    const descLabel = t('products.detail.description');
    const bestForLabel = t('products.detail.bestFor');
    const featuresLabel = t('products.detail.features');
    const specsLabel = t('products.detail.specs');
    const getQuoteText = t('products.detail.getQuote');
    const contactText = t('products.detail.contactSection');

    return `
      <div class="pd-breadcrumb">
        <div class="container">
          <a href="index.html#products">${backText}</a>
          <span class="pd-sep">/</span>
          <span class="pd-current">${escapeHtml(name)}</span>
        </div>
      </div>

      <div class="container">
        <section class="pd-hero">
          <div class="pd-hero-info">
            <span class="pd-cat-tag">${escapeHtml(catLabel)}</span>
            <h1 class="pd-title">${escapeHtml(name)}</h1>
            <div class="pd-model">Model: ${escapeHtml(product.model || '')}</div>
            <div class="pd-cta-row">
              <button class="pd-cta-primary" id="pdGetQuoteBtn" data-product-id="${escapeHtml(product.id || '')}">
                📩 ${getQuoteText}
              </button>
              <a href="#pd-specs" class="pd-cta-secondary">📋 ${specsLabel}</a>
            </div>
          </div>
          <div class="pd-hero-image">${imgHtml}</div>
        </section>

        ${galleryHtml}

        <section class="pd-section" id="pd-overview">
          <h2 class="pd-section-title">${descLabel}</h2>
          <p style="font-size:15px; line-height:1.8; color:#495057;">${escapeHtml(desc)}</p>
        </section>

        <section class="pd-section">
          <h2 class="pd-section-title">${bestForLabel}</h2>
          <ul class="pd-bestfor-grid">${bestForItems}</ul>
        </section>

        <section class="pd-section">
          <h2 class="pd-section-title">${featuresLabel}</h2>
          <ul class="pd-features">${featuresItems}</ul>
        </section>

        ${accessoriesBlock}

        <section class="pd-section" id="pd-specs">
          <h2 class="pd-section-title">${specsLabel}</h2>
          <table class="pd-specs-table"><tbody>${specsRows}</tbody></table>
        </section>

        <section class="pd-bottom-cta">
          <h2>${getQuoteText}</h2>
          <p>${escapeHtml(contactText)}</p>
          <div class="pd-cta-row">
            <button class="pd-cta-primary" id="pdGetQuoteBtn2" data-product-id="${escapeHtml(product.id || '')}">
              📩 ${getQuoteText}
            </button>
            <a href="index.html#contact" class="pd-cta-secondary">${t('nav.inquiry')}</a>
          </div>
        </section>
      </div>
    `;
  }

  function renderError(message) {
    const backText = (typeof window.t === 'function' ? window.t('products.detail.back') : 'Back to Products');
    return `
      <div class="container">
        <div class="pd-error">
          <h2>😕 Product Not Found</h2>
          <p>${message || 'The product you are looking for does not exist.'}</p>
          <a href="index.html#products" class="pd-cta-secondary">${backText}</a>
        </div>
      </div>
    `;
  }

  function openProductInquiry(product, lang) {
    const overlay = document.getElementById('inquiryOverlay');
    if (!overlay) return;
    const name = pickI18n(product.name, lang);
    const WA_NUMBER = '8613877228460';
    const MAIL_TO = 'sales@haogeng.net';

    const subject = `Inquiry: ${name} (Model ${product.model || ''})`;
    const body = `Hello Haogeng,\n\nI am interested in the following product:\n\nProduct: ${name}\nModel: ${product.model || 'N/A'}\nCategory: ${product.cat || 'N/A'}\n\nPlease send me a quotation with:\n- FOB price\n- MOQ\n- Lead time\n- Payment terms\n\nThank you.`;
    const text = body + '\n\n--\nSent from https://haogeng.net/product.html?id=' + (product.id || '');

    const preview = document.getElementById('inquiryPreview');
    const waLink = document.getElementById('inquiryWA');
    const mailLink = document.getElementById('inquiryMail');
    const copyBtn = document.getElementById('inquiryCopy');
    const gmailLink = document.getElementById('inquiryGmail');
    const outlookLink = document.getElementById('inquiryOutlook');
    const webmailRow = document.getElementById('inquiryWebmail');
    const autoCopyHint = document.getElementById('inquiryAutoCopy');

    if (preview) preview.textContent = `Subject: ${subject}\n\n${body}`;
    if (waLink) waLink.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    if (mailLink) mailLink.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (gmailLink) gmailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MAIL_TO)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (outlookLink) outlookLink.href = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(MAIL_TO)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (copyBtn) copyBtn.dataset.text = text;
    if (webmailRow) webmailRow.style.display = 'flex';
    if (autoCopyHint) autoCopyHint.style.display = 'none';

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    try {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { method: 'product_detail', product_id: product.id });
      }
    } catch (e) {}
  }

  function bindQuoteButtons(product, lang) {
    document.querySelectorAll('#pdGetQuoteBtn, #pdGetQuoteBtn2').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const curLang = (typeof window.currentLang === 'string' ? window.currentLang : lang);
        openProductInquiry(product, curLang);
      });
    });
  }

  function bindGallery() {
    const prev = document.getElementById('pdGalleryPrev');
    const next = document.getElementById('pdGalleryNext');
    const track = document.getElementById('pdGalleryTrack');
    const dots = document.querySelectorAll('.pd-gallery-dot');
    if (!track) return;
    const slides = track.querySelectorAll('.pd-gallery-slide');
    const total = slides.length;
    if (total <= 1) return;
    let idx = 0;
    function show(i) {
      idx = (i + total) % total;
      slides.forEach((s, j) => s.classList.toggle('active', j === idx));
      dots.forEach((d, j) => d.classList.toggle('active', j === idx));
    }
    if (prev) prev.addEventListener('click', () => show(idx - 1));
    if (next) next.addEventListener('click', () => show(idx + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
  }

  function init() {
    const id = getQueryParam('id');
    const main = document.getElementById('productDetail');
    if (!main) return;

    const lang = localStorage.getItem('haogeng_lang')
      || (typeof window.currentLang === 'string' ? window.currentLang : null)
      || 'en';

    if (!id) {
      main.innerHTML = renderError('Missing product ID. Please return to the product list.');
      return;
    }

    const product = (window.PRODUCTS || []).find(p => p.id === id);
    if (!product) {
      main.innerHTML = renderError(`No product found with ID: "${id}"`);
      return;
    }

    main.innerHTML = renderDetail(product, lang);

    applySeoMeta(product, lang);
    injectProductJsonLd(product, lang);

    bindQuoteButtons(product, lang);
    bindGallery();

    document.addEventListener('langChanged', (e) => {
      const newLang = e.detail && e.detail.lang;
      if (!newLang) return;
      main.innerHTML = renderDetail(product, newLang);
      bindQuoteButtons(product, newLang);
      bindGallery();
      applySeoMeta(product, newLang);
      injectProductJsonLd(product, newLang);
    });
  }

  // ===== JSON-LD：Product + BreadcrumbList + WebPage (SEO) =====
  // ⚠️ 关于 offers：原版写了 price:"0"，Google 富媒体结果会直接判 "Missing field price"
  //    并忽略整段结构化数据。这里按"不编造价格"的原则先整块移除 Offer，
  //    等拿到真实 FOB 价后，把下面注释里的 offers 段加回来即可解锁价格富摘要。
  function injectProductJsonLd(product, lang) {
    let script = document.getElementById('product-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'product-jsonld';
      document.head.appendChild(script);
    }
    const t = (key) => getByPath((window.I18N && window.I18N[lang]) || {}, key);
    const name = pickI18n(product.name, lang);
    const desc = pickI18n(product.desc, lang);
    const imgFile = product.img || '';
    const gallery = Array.isArray(product.gallery) ? product.gallery : [];
    const images = [imgFile, ...gallery].filter(Boolean).map(f => imgAbs(f));
    const pageUrl = canonicalUrlFor(product);
    const catLabel = catLabelFor(product.cat || '', lang);
    const homeUrl = (window.HaogengUrls && window.HaogengUrls.homePath)
      ? SITE + window.HaogengUrls.homePath(lang)
      : SITE + '/';

    // 参数表 → additionalProperty（Google 商品规格富摘要）
    const specs = pickI18n(product.specs, lang) || [];
    const additionalProperty = specs.map(function (line) {
      const m = String(line).match(/^(.+?)\s*[:：]\s*(.+)$/);
      if (!m) return null;
      return { '@type': 'PropertyValue', name: m[1].trim(), value: m[2].trim() };
    }).filter(Boolean);

    const productNode = {
      '@type': 'Product',
      '@id': pageUrl + '#product',
      name: name,
      url: pageUrl,
      sku: product.id || '',
      mpn: product.model || '',
      model: product.model || '',
      description: desc,
      image: images,
      category: catLabel,
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
      // ── 有真实 FOB 价后，把 Offer 加回来（price 必须 > 0，否则 Google 报错）──
      // offers: {
      //   '@type': 'Offer',
      //   url: pageUrl,
      //   priceCurrency: 'USD',
      //   price: 'xxx.xx',
      //   priceValidUntil: '2027-12-31',
      //   availability: 'https://schema.org/InStock',
      //   itemCondition: 'https://schema.org/NewCondition',
      //   seller: { '@id': SITE + '/#organization' }
      // }
    };

    const breadcrumbNode = {
      '@type': 'BreadcrumbList',
      '@id': pageUrl + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('nav.home') || 'Home', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.products') || 'Products', item: homeUrl + '#products' },
        { '@type': 'ListItem', position: 3, name: name }
      ]
    };

    const webPageNode = {
      '@type': 'WebPage',
      '@id': pageUrl + '#webpage',
      url: pageUrl,
      name: document.title,
      isPartOf: { '@id': SITE + '/#website' },
      about: { '@id': SITE + '/#organization' },
      breadcrumb: { '@id': pageUrl + '#breadcrumb' },
      inLanguage: lang
    };

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org/',
      '@graph': [webPageNode, breadcrumbNode, productNode]
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
