/* =========================================================
   i18n.js — 多语言内容
   ★ 维护指南：改文字就改下面的字典，不用碰 HTML
   键名对应 HTML 里的 data-i18n="..."
   ========================================================= */

const I18N = {
  en: {
    brand: { name: "HAOGENG", full: "Liuzhou Haogeng International Trade Co., Ltd.", guigeng: "Guigeng Agricultural Machinery", lichuang: "Guangxi Lichuang Machinery" },
    topbar: { hint: "Factory-Direct · OEM/ODM Welcome" },
    nav: { home: "Home", about: "About", products: "Products", why: "Why Us", contact: "Contact", inquiry: "Get a Quote", news: "News" },
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
      lead: "Liuzhou Haogeng International Trade Co., Ltd. (Haogeng) is the export and trading arm of Guigeng Agricultural Machinery. As the brand's international sales company, we work directly with our own manufacturing plant — giving overseas buyers true factory-direct pricing and reliable supply.",
      c1: { title: "One Company, Factory-Backed", text: "Guigeng Agricultural Machinery is manufactured by Guangxi Lichuang Machinery Manufacturing Co., Ltd. — our own factory. Haogeng handles all international trade: export, documentation and after-sales. When you buy from Haogeng, you buy straight from the Guigeng factory, with no middlemen." },
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
        inquiry: {
      modal: {
        title: "Choose how to send your inquiry",
        wa: "Fastest · Recommended",
        mail: "Email",
        mailSub: "Opens your email client",
        copy: "Copy Inquiry",
        copySub: "Paste anywhere"
      }
    },
    footer: { rights: "All rights reserved." },
    news: {
      title: "In the News",
      source: "Guangxi Dept. of Agriculture and Rural Affairs · Liuzhou Daily · 2025-02-24",
      headline: "\u201cSpeeding Up Production to Support Spring Plowing\u201d",
      intro: "After the Rain Water solar term, while fields are busy with spring plowing, agricultural machinery production is also in full swing. On February 19, reporters visited a farm machinery manufacturer on Liugong Avenue and saw production lines running at full capacity to accelerate micro tillers for spring plowing.",
      quote: "\u201cGeneral Manager Wu, when can our shipment be sent?\u201d That morning, Mr. Zeng, a farm machinery dealer from Hunan, came to Guangxi Lichuang Machinery Manufacturing Co., Ltd. to collect goods. \u201cSpring plowing season is peak sales time, so we rushed to Liuzhou to pick up the goods.\u201d Company head Wu Siyu replied: \u201cWe are speeding up production \u2014 whatever we have ready, we'll send first.\u201d He immediately arranged truck delivery.",
      factory: "Lichuang Machinery specializes in producing and developing new 4WD micro tillers, field management machines, and ditching machines. Wu Siyu introduced that the Guigeng 4WD front-rotary micro tiller is designed for hilly and mountainous areas with small plots and large elevation differences. It is lightweight, compact, powerful, and easy to operate \u2014 ideal for southern regions and the best-selling farm machinery product during spring plowing season. Besides supplying the local market, products are also sold to Hunan, Jiangxi, Hainan, and Hubei.",
      capacity: "In the production workshop, workers were busy assembling parts on the production line. As soon as a machine came off the line, it underwent quality inspection, packaging, and waited for shipment. \u201cWe started work on the fourth day of the Lunar New Year. Now two production lines are running at full capacity, producing about 130 micro tillers per day,\u201d Wu said. However, this still cannot meet current order demand. Next month, the company will open a new production line for four-wheel large agricultural machinery to increase capacity.",
      export: "In recent years, Lichuang Machinery has seized opportunities from the Belt and Road Initiative, exporting products to Southeast Asian markets. Wu said micro tillers are also very popular in India, Vietnam, and other markets. Last year, the company exported 300 micro tillers to Sri Lanka. This year they will further explore Southeast Asian market potential and develop machinery for harvesting areca nuts based on local agricultural needs, enhancing competitiveness in Southeast Asian markets.",
      h1: { num: "300", label: "Units Exported to Sri Lanka" },
      h2: { num: "130", label: "Units Per Day Capacity" },
      h3: { num: "2", label: "Production Lines at Full Capacity" }
    }
  },

  zh: {
    brand: { name: "浩耕", full: "柳州浩耕国际贸易有限责任公司", guigeng: "桂耕农机", lichuang: "立创机械" },
    topbar: { hint: "工厂直供 · 支持OEM/ODM定制" },
    nav: { home: "首页", about: "关于我们", products: "产品中心", why: "我们的优势", contact: "联系我们", inquiry: "获取报价", news: "媒体报道" },
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
      lead: "柳州浩耕国际贸易有限责任公司（浩耕）是桂耕农机品牌的对外贸易公司，直接对接背后的自有工厂。工贸一体，让海外买家享受真正的工厂直供价格与稳定货源。",
      c1: { title: "工贸一体 · 自有工厂", text: "桂耕农机由广西立创机械制造有限公司生产制造，浩耕国际负责全部国际贸易业务——出口、单证、售后。从浩耕采购，就是从桂耕工厂直接采购，没有中间商。" },
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
        inquiry: {
      modal: {
        title: "选择询盘发送方式",
        wa: "最快 · 推荐",
        mail: "邮件",
        mailSub: "打开您的邮箱客户端",
        copy: "复制询盘",
        copySub: "可粘贴到任何地方"
      }
    },
    footer: { rights: "版权所有。" },
    news: {
      title: "媒体报道",
      source: "广西壮族自治区农业农村厅 · 柳州日报 · 2025-02-24",
      headline: "加速生产 助力春耕",
      intro: "雨水节气过后，田间地头春耕忙，农机生产也热火朝天。2月19日，记者在位于柳工大道的一家农机生产企业看到，生产线开足马力，加速生产微型农机，助力春耕生产。",
      quote: "\u201c伍总，我们的货什么时候能发？\u201d当天上午，来自湖南的农机经销商曾先生来到广西立创机械制造有限公司收货。他说，春耕时期是农机销售旺季，他们特地赶来柳州提货。公司负责人伍思裕回答：\u201c我们在加速生产了，有多少先发多少给你们。\u201d他立即安排货车送货。",
      factory: "据了解，立创机械是一家专门从事生产、研发新型四驱微耕机、田园管理机、开沟培土机等微型农机的企业。伍思裕介绍，该公司生产的桂耕四驱前旋微耕机根据丘陵、山区地块小、高差大而设计生产，重量轻、体积小、马力大、操作简单，非常适合南方地区使用，是春耕时期最热销的农机产品。除了供应本地市场，还销往湖南、江西、海南、湖北等地。",
      capacity: "记者在生产车间看到，工人们在生产线上忙碌地将零配件组装，刚下线一台农机，就马上进行质检、打包，等待发货。\u201c我们大年初四就上班了，现在两条生产线满负荷开工，每天能生产微型农机约130台。\u201d伍思裕说，但仍不能满足当下订单需求，下个月公司将新开一条生产四轮大型农机的生产线以提升产能。",
      export: "近年来，立创机械还抓住\u201c一带一路\u201d发展机遇，产品出口东南亚市场。伍思裕说，微型农机在印度、越南等市场也很受欢迎，去年该公司向斯里兰卡出口了300台微型农机。今年他们将进一步深挖东南亚市场潜力，并根据当地农产品生产需求，研发可采摘槟榔的农机，提升农机在东南亚市场的竞争力。",
      h1: { num: "300", label: "向斯里兰卡出口（台）" },
      h2: { num: "130", label: "日产能（台）" },
      h3: { num: "2", label: "满负荷生产线" }
    }
  },

  es: {
    brand: { name: "HAOGENG", full: "Liuzhou Haogeng International Trade Co., Ltd.", guigeng: "Guigeng Maquinaria Agrícola", lichuang: "Lichuang Maquinaria Guangxi" },
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
        inquiry: {
      modal: {
        title: "Elija cómo enviar su consulta",
        wa: "Más rápido · Recomendado",
        mail: "Correo",
        mailSub: "Abre su cliente de correo",
        copy: "Copiar consulta",
        copySub: "Pegar en cualquier lugar"
      }
    },
    footer: { rights: "Todos los derechos reservados." }
  },

  ru: {
    brand: { name: "HAOGENG", full: "Liuzhou Haogeng International Trade Co., Ltd.", guigeng: "Гуйгэн Сельхозтехника", lichuang: "Гуанси Личуан Машиностроение" },
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
        inquiry: {
      modal: {
        title: "Выберите способ отправки запроса",
        wa: "Быстрее всего · Рекомендуем",
        mail: "Email",
        mailSub: "Откроет почтовый клиент",
        copy: "Скопировать запрос",
        copySub: "Вставьте куда угодно"
      }
    },
    footer: { rights: "Все права защищены." }
  },

  fr: {
    brand: { name: "HAOGENG", full: "Liuzhou Haogeng International Trade Co., Ltd.", guigeng: "Guigeng Machinisme Agricole", lichuang: "Lichuang Guangxi Machines" },
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
        inquiry: {
      modal: {
        title: "Choisissez comment envoyer votre demande",
        wa: "Le plus rapide · Recommandé",
        mail: "Email",
        mailSub: "Ouvre votre client email",
        copy: "Copier la demande",
        copySub: "Coller n'importe où"
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
