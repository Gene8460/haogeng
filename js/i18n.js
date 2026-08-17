/* =========================================================
   i18n.js — 多语言内容
   ★ 维护指南：改文字就改下面的字典，不用碰 HTML
   键名对应 HTML 里的 data-i18n="..."
   ========================================================= */

const I18N = {
  en: {
    brand: { name: "HAOGENG", full: "Liuzhou Haogeng International Trade Co., Ltd." },
    topbar: { hint: "Factory-Direct · OEM/ODM Welcome" },
    nav: { home: "Home", about: "About", products: "Products", why: "Why Us", contact: "Contact", inquiry: "Get a Quote" },
    hero: {
      title: "Factory-Direct Agricultural Machinery",
      sub: "Micro tillers · Ditching machines · Water pumps. Backed by our own manufacturing plant — better price, guaranteed delivery.",
      cta1: "View Products", cta2: "Send Inquiry",
      stat1: { num: "15+", label: "Years Experience" },
      stat2: { num: "30+", label: "Product Models" },
      stat3: { num: "50+", label: "Export Countries" }
    },
    about: {
      title: "About Us",
      lead: "Liuzhou Haogeng International Trade Co., Ltd. is the export arm of Guigeng Agricultural Machinery factory — a true factory-direct, integrated trade & manufacturing company.",
      c1: { title: "Our Own Factory", text: "We are backed by Guangxi Lichuang Machinery Manufacturing Co., Ltd. (brand: Guigeng), a modern agricultural machinery manufacturer with full in-house design and production capability." },
      c2: { title: "Patented Technology", text: "Our R&D team holds national utility-model patents and agricultural machinery certification, ensuring every design is tested and field-proven." },
      c3: { title: "Advanced Equipment", text: "CNC laser cutting, CNC bending, laser pipe cutting and laser welding lines guarantee precision, durability and a consistent finish." }
    },
    products: {
      title: "Our Products",
      lead: "Three main product lines. Custom OEM/ODM available — tell us your market and requirements.",
      filter: { all: "All", tiller: "Micro Tillers", ditching: "Ditching Machines", pump: "Water Pumps" },
      inquire: "Send Inquiry"
    },
    why: {
      title: "Why Choose Us",
      w1: { title: "Factory-Direct Price", text: "No middlemen — you buy straight from the manufacturer." },
      w2: { title: "OEM / ODM", text: "Custom brand, color and specifications for your market." },
      w3: { title: "Quality Control", text: "Strict QC on every unit before shipment, durable in the field." },
      w4: { title: "Reliable Delivery", text: "Steady production capacity ensures on-time delivery." },
      w5: { title: "Export Experience", text: "Exporting to 50+ countries with full documentation support." },
      w6: { title: "After-Sales", text: "Spare parts and technical support available for all models." }
    },
    contact: {
      title: "Get in Touch",
      lead: "Send us your inquiry — we reply within 24 hours.",
      label: { phone: "Phone / WhatsApp", email: "Email", addr: "Address" },
      addr: "No. 86, Liugong Avenue, Liunan District, Liuzhou City, Guangxi, China",
      form: {
        name: "Your Name", email: "Your Email", country: "Your Country",
        message: "Message (product, quantity, destination port...)",
        submit: "Send Inquiry",
        note: "This form opens your email client. For fastest reply, email us directly."
      }
    },
    footer: { rights: "All rights reserved." }
  },

  zh: {
    brand: { name: "浩耕", full: "柳州浩耕国际贸易有限公司" },
    topbar: { hint: "工厂直供 · 支持OEM/ODM定制" },
    nav: { home: "首页", about: "关于我们", products: "产品中心", why: "我们的优势", contact: "联系我们", inquiry: "获取报价" },
    hero: {
      title: "工厂直供农业机械",
      sub: "微耕机 · 开沟培土机 · 抽水机。自有工厂生产，价格更优、交货有保障。",
      cta1: "查看产品", cta2: "发送询盘",
      stat1: { num: "15+", label: "年行业经验" },
      stat2: { num: "30+", label: "产品型号" },
      stat3: { num: "50+", label: "出口国家" }
    },
    about: {
      title: "关于我们",
      lead: "柳州浩耕国际贸易有限公司是桂耕农机工厂的出口对接公司，真正的工贸一体企业。",
      c1: { title: "自有工厂", text: "依托广西立创机械制造有限公司（桂耕品牌），拥有自主研发和生产能力的现代化农机企业。" },
      c2: { title: "专利技术", text: "研发团队拥有国家实用新型专利和农机鉴定证书，每项设计均经过反复验证。" },
      c3: { title: "先进设备", text: "数控激光切割、数控折弯、激光切管、激光焊接生产线，保证精度与耐用性。" }
    },
    products: {
      title: "产品中心",
      lead: "三大产品线，支持OEM/ODM定制，告诉我们您的市场和需求。",
      filter: { all: "全部", tiller: "微耕机", ditching: "开沟培土机", pump: "抽水机" },
      inquire: "发送询盘"
    },
    why: {
      title: "为什么选择我们",
      w1: { title: "工厂直供价格", text: "没有中间商，直接从厂家采购。" },
      w2: { title: "OEM / ODM 定制", text: "按您的市场定制品牌、颜色和规格。" },
      w3: { title: "质量控制", text: "每台设备出厂前严格质检，田间耐用。" },
      w4: { title: "交货可靠", text: "稳定的产能确保准时交货。" },
      w5: { title: "出口经验", text: "出口50多个国家，提供全套单据支持。" },
      w6: { title: "售后服务", text: "所有型号均有配件和技术支持。" }
    },
    contact: {
      title: "联系我们",
      lead: "发送您的询盘，我们24小时内回复。",
      label: { phone: "电话 / WhatsApp", email: "邮箱", addr: "地址" },
      addr: "广西壮族自治区柳州市柳南区柳工大道86号",
      form: {
        name: "您的姓名", email: "您的邮箱", country: "您的国家",
        message: "留言（产品、数量、目的港等）",
        submit: "发送询盘",
        note: "此表单会打开您的邮件客户端，最快回复请直接发邮件。"
      }
    },
    footer: { rights: "版权所有。" }
  },

  es: {
    brand: { name: "HAOGENG", full: "Liuzhou Haogeng International Trade Co., Ltd." },
    topbar: { hint: "Directo de fábrica · OEM/ODM bienvenido" },
    nav: { home: "Inicio", about: "Nosotros", products: "Productos", why: "Ventajas", contact: "Contacto", inquiry: "Solicitar cotización" },
    hero: {
      title: "Maquinaria agrícola directa de fábrica",
      sub: "Motocultores · Máquinas de zanjeo · Bombas de agua. Respaldados por nuestra propia planta — mejor precio, entrega garantizada.",
      cta1: "Ver productos", cta2: "Enviar consulta",
      stat1: { num: "15+", label: "Años de experiencia" },
      stat2: { num: "30+", label: "Modelos" },
      stat3: { num: "50+", label: "Países exportados" }
    },
    about: {
      title: "Sobre nosotros",
      lead: "Liuzhou Haogeng es el brazo exportador de la fábrica Guigeng — una verdadera empresa integrada de comercio y fabricación.",
      c1: { title: "Nuestra propia fábrica", text: "Respaldados por Guangxi Lichuang Machinery (marca Guigeng), fabricante moderno con diseño y producción propios." },
      c2: { title: "Tecnología patentada", text: "Nuestro equipo de I+D posee patentes nacionales y certificación de maquinaria agrícola." },
      c3: { title: "Equipo avanzado", text: "Líneas de corte láser CNC, plegado, corte de tubos y soldadura láser que garantizan precisión y durabilidad." }
    },
    products: {
      title: "Nuestros productos",
      lead: "Tres líneas principales. OEM/ODM disponible — cuéntenos su mercado y requisitos.",
      filter: { all: "Todos", tiller: "Motocultores", ditching: "Máquinas de zanjeo", pump: "Bombas de agua" },
      inquire: "Enviar consulta"
    },
    why: {
      title: "Por qué elegirnos",
      w1: { title: "Precio de fábrica", text: "Sin intermediarios — compre directo del fabricante." },
      w2: { title: "OEM / ODM", text: "Marca, color y especificaciones personalizadas para su mercado." },
      w3: { title: "Control de calidad", text: "Control estricto en cada unidad antes del envío." },
      w4: { title: "Entrega confiable", text: "Capacidad de producción estable para entrega puntual." },
      w5: { title: "Experiencia exportadora", text: "Exportamos a más de 50 países con documentación completa." },
      w6: { title: "Posventa", text: "Repuestos y soporte técnico para todos los modelos." }
    },
    contact: {
      title: "Contáctenos",
      lead: "Envíe su consulta — respondemos en 24 horas.",
      label: { phone: "Teléfono / WhatsApp", email: "Correo", addr: "Dirección" },
      addr: "Liuzhou, Guangxi, China",
      form: {
        name: "Su nombre", email: "Su correo", country: "Su país",
        message: "Mensaje (producto, cantidad, puerto de destino...)",
        submit: "Enviar consulta",
        note: "Este formulario abre su cliente de correo. Para respuesta rápida, escríbanos directamente."
      }
    },
    footer: { rights: "Todos los derechos reservados." }
  },

  ru: {
    brand: { name: "HAOGENG", full: "Liuzhou Haogeng International Trade Co., Ltd." },
    topbar: { hint: "Напрямую с завода · OEM/ODM приветствуется" },
    nav: { home: "Главная", about: "О нас", products: "Продукция", why: "Преимущества", contact: "Контакты", inquiry: "Запросить цену" },
    hero: {
      title: "Сельхозтехника напрямую с завода",
      sub: "Мотокультиваторы · Машины для нарезки канав · Водяные насосы. Собственное производство — лучшая цена, гарантированная поставка.",
      cta1: "Смотреть продукцию", cta2: "Отправить запрос",
      stat1: { num: "15+", label: "Лет опыта" },
      stat2: { num: "30+", label: "Моделей" },
      stat3: { num: "50+", label: "Стран экспорта" }
    },
    about: {
      title: "О нас",
      lead: "Liuzhou Haogeng — экспортное подразделение завода Guigeng, полностью интегрированная торгово-производственная компания.",
      c1: { title: "Собственный завод", text: "За нами стоит Guangxi Lichuang Machinery (бренд Guigeng) — современный производитель с полным циклом разработки и производства." },
      c2: { title: "Запатентованные технологии", text: "Наша команда R&D имеет национальные патенты и сертификацию сельхозтехники." },
      c3: { title: "Современное оборудование", text: "Линии лазерной резки ЧПУ, гибки, резки труб и лазерной сварки обеспечивают точность и долговечность." }
    },
    products: {
      title: "Наша продукция",
      lead: "Три основные линейки. OEM/ODM доступно — расскажите о вашем рынке.",
      filter: { all: "Все", tiller: "Мотокультиваторы", ditching: "Машины для канав", pump: "Водяные насосы" },
      inquire: "Отправить запрос"
    },
    why: {
      title: "Почему мы",
      w1: { title: "Заводская цена", text: "Без посредников — покупка напрямую у производителя." },
      w2: { title: "OEM / ODM", text: "Индивидуальные бренд, цвет и характеристики под ваш рынок." },
      w3: { title: "Контроль качества", text: "Строгий контроль каждой единицы перед отгрузкой." },
      w4: { title: "Надёжная поставка", text: "Стабильные мощности обеспечивают своевременную доставку." },
      w5: { title: "Опыт экспорта", text: "Экспорт в 50+ стран с полным документальным сопровождением." },
      w6: { title: "Послепродажное обслуживание", text: "Запчасти и техподдержка для всех моделей." }
    },
    contact: {
      title: "Свяжитесь с нами",
      lead: "Отправьте запрос — ответим в течение 24 часов.",
      label: { phone: "Телефон / WhatsApp", email: "Email", addr: "Адрес" },
      addr: "Лючжоу, Гуанси, Китай",
      form: {
        name: "Ваше имя", email: "Ваш email", country: "Ваша страна",
        message: "Сообщение (продукт, количество, порт назначения...)",
        submit: "Отправить запрос",
        note: "Форма открывает ваш почтовый клиент. Для быстрого ответа напишите нам напрямую."
      }
    },
    footer: { rights: "Все права защищены." }
  },

  fr: {
    brand: { name: "HAOGENG", full: "Liuzhou Haogeng International Trade Co., Ltd." },
    topbar: { hint: "Direct usine · OEM/ODM bienvenu" },
    nav: { home: "Accueil", about: "À propos", products: "Produits", why: "Nos atouts", contact: "Contact", inquiry: "Demander un devis" },
    hero: {
      title: "Machines agricoles directes d'usine",
      sub: "Motoculteurs · Machines à fossés · Pompes à eau. Adossés à notre propre usine — meilleur prix, livraison garantie.",
      cta1: "Voir les produits", cta2: "Envoyer une demande",
      stat1: { num: "15+", label: "Ans d'expérience" },
      stat2: { num: "30+", label: "Modèles" },
      stat3: { num: "50+", label: "Pays d'export" }
    },
    about: {
      title: "À propos",
      lead: "Liuzhou Haogeng est le bras export de l'usine Guigeng — une véritable entreprise intégrée commerce + fabrication.",
      c1: { title: "Notre propre usine", text: "Adossés à Guangxi Lichuang Machinery (marque Guigeng), fabricant moderne avec conception et production internes." },
      c2: { title: "Technologie brevetée", text: "Notre équipe R&D détient des brevets nationaux et la certification de machines agricoles." },
      c3: { title: "Équipement avancé", text: "Lignes de découpe laser CNC, pliage, découpe de tubes et soudage laser garantissant précision et durabilité." }
    },
    products: {
      title: "Nos produits",
      lead: "Trois gammes principales. OEM/ODM disponible — parlez-nous de votre marché.",
      filter: { all: "Tous", tiller: "Motoculteurs", ditching: "Machines à fossés", pump: "Pompes à eau" },
      inquire: "Envoyer une demande"
    },
    why: {
      title: "Pourquoi nous choisir",
      w1: { title: "Prix direct usine", text: "Sans intermédiaires — vous achetez directement au fabricant." },
      w2: { title: "OEM / ODM", text: "Marque, couleur et spécifications personnalisées pour votre marché." },
      w3: { title: "Contrôle qualité", text: "Contrôle strict de chaque unité avant expédition." },
      w4: { title: "Livraison fiable", text: "Capacité de production stable pour une livraison ponctuelle." },
      w5: { title: "Expérience export", text: "Export vers plus de 50 pays avec documentation complète." },
      w6: { title: "Service après-vente", text: "Pièces détachées et support technique pour tous les modèles." }
    },
    contact: {
      title: "Contactez-nous",
      lead: "Envoyez votre demande — réponse sous 24 heures.",
      label: { phone: "Téléphone / WhatsApp", email: "Email", addr: "Adresse" },
      addr: "Liuzhou, Guangxi, Chine",
      form: {
        name: "Votre nom", email: "Votre email", country: "Votre pays",
        message: "Message (produit, quantité, port de destination...)",
        submit: "Envoyer la demande",
        note: "Ce formulaire ouvre votre client mail. Pour une réponse rapide, écrivez-nous directement."
      }
    },
    footer: { rights: "Tous droits réservés." }
  }
};

// 当前语言（默认英文）
let currentLang = 'en';

function setLang(lang) {
  if (!I18N[lang]) lang = 'en';
  currentLang = lang;
  localStorage.setItem('haogeng_lang', lang);

  // 更新所有带 data-i18n 的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getByPath(I18N[lang], key);
    if (val !== undefined) el.textContent = val;
  });

  // 更新所有带 data-i18n-placeholder 的元素
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = getByPath(I18N[lang], key);
    if (val !== undefined) el.placeholder = val;
  });

  // 更新语言按钮高亮
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // 更新 html lang 属性
  document.documentElement.lang = lang;

  // 重新渲染产品（产品名可能有翻译）
  if (typeof renderProducts === 'function') renderProducts(currentCategory);
}

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

// 供产品模块使用
function t(key) {
  return getByPath(I18N[currentLang], key);
}
