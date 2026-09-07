/* =========================================================
   product.js — 产品详情页渲染与询盘交互
   依赖: products.js (PRODUCTS), i18n.js (I18N, t, setLang, currentLang)
   ========================================================= */

(function() {
  'use strict';

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
    const catLabelMap = {
      tiller: { en: 'Micro Tiller', zh: '微耕机', es: 'Motocultor', ru: 'Мотокультиватор', fr: 'Motoculteur' },
      ditching: { en: 'Ditching Machine', zh: '开沟培土机', es: 'Máquina Zanjas', ru: 'Машина для канав', fr: 'Machine à Fossés' },
      pump: { en: 'Water Pump', zh: '抽水机', es: 'Bomba de Agua', ru: 'Водяной насос', fr: 'Pompe à Eau' }
    };
    const catLabel = (catLabelMap[cat] && catLabelMap[cat][lang]) || (catLabelMap[cat] && catLabelMap[cat].en) || cat;

    const t = (key) => getByPath((window.I18N && window.I18N[lang]) || {}, key);

    const imgFile = product.img || '';
    const imgWebp = imgFile.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const imgHtml = imgFile
      ? `<picture>
           <source srcset="images/${imgWebp}" type="image/webp">
           <img src="images/${imgFile}" alt="${name}" loading="lazy">
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
                   <source srcset="images/${gWebp}" type="image/webp">
                   <img src="images/${g}" alt="${escapeHtml(name)} — view ${i + 1}" loading="lazy">
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
              <source srcset="images/${accWebp}" type="image/webp">
              <img src="images/${accImg}" alt="${escapeHtml(name)} accessories" loading="lazy">
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
    const MAIL_TO = 'haogengmachinery.tk@outlook.com';

    const subject = `Inquiry: ${name} (Model ${product.model || ''})`;
    const body = `Hello Haogeng,\n\nI am interested in the following product:\n\nProduct: ${name}\nModel: ${product.model || 'N/A'}\nCategory: ${product.cat || 'N/A'}\n\nPlease send me a quotation with:\n- FOB price\n- MOQ\n- Lead time\n- Payment terms\n\nThank you.`;
    const text = body + '\n\n--\nSent from https://haogeng.net/product.html?id=' + (product.id || '');

    const preview = document.getElementById('inquiryPreview');
    const waLink = document.getElementById('inquiryWA');
    const mailLink = document.getElementById('inquiryMail');
    const copyBtn = document.getElementById('inquiryCopy');

    if (preview) preview.textContent = `Subject: ${subject}\n\n${body}`;
    if (waLink) waLink.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    if (mailLink) mailLink.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (copyBtn) copyBtn.dataset.text = text;

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

    const name = pickI18n(product.name, lang);
    const desc = pickI18n(product.desc, lang);
    document.title = `${name} (${product.model}) | Liuzhou Haogeng`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc.substring(0, 160));

    injectProductJsonLd(product, lang);

    bindQuoteButtons(product, lang);
    bindGallery();

    document.addEventListener('langChanged', (e) => {
      const newLang = e.detail && e.detail.lang;
      if (!newLang) return;
      main.innerHTML = renderDetail(product, newLang);
      bindQuoteButtons(product, newLang);
      bindGallery();
      injectProductJsonLd(product, newLang);
    });
  }

  // ===== JSON-LD Product schema (SEO) =====
  function injectProductJsonLd(product, lang) {
    let script = document.getElementById('product-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'product-jsonld';
      document.head.appendChild(script);
    }
    const name = pickI18n(product.name, lang);
    const desc = pickI18n(product.desc, lang);
    const imgFile = product.img || '';
    const gallery = Array.isArray(product.gallery) ? product.gallery : [];
    const images = [imgFile, ...gallery].filter(Boolean).map(f => `https://haogeng.net/images/${f}`);

    const ld = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: name,
      model: product.model || '',
      sku: product.id || '',
      description: desc,
      image: images.length ? images : undefined,
      brand: { '@type': 'Brand', name: 'Guigeng / Haogeng' },
      manufacturer: {
        '@type': 'Organization',
        name: 'Guangxi Lichuang Machinery Manufacturing Co., Ltd.',
        address: 'No. 86, Liugong Avenue, Liunan District, Liuzhou City, Guangxi, China'
      },
      offers: {
        '@type': 'Offer',
        url: `https://haogeng.net/product.html?id=${encodeURIComponent(product.id || '')}`,
        priceCurrency: 'USD',
        price: '0',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Liuzhou Haogeng International Trade Co., Ltd.'
        }
      }
    };
    script.textContent = JSON.stringify(ld);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
