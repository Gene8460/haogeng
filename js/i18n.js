/* =========================================================
   i18n.js — 多语言内容
   ★ 维护指南：改文字就改下面的字典，不用碰 HTML
   键名对应 HTML 里的 data-i18n="..."
   ========================================================= */

var I18N = {
  en: {
    brand: { name: "HAOGENG", tagline: "Agricultural Machinery", full: "Liuzhou Haogeng International Trade Co., Ltd.", guigeng: "Guigeng Agricultural Machinery", lichuang: "Guangxi Lichuang Machinery" },
    topbar: { hint: "Factory-Direct · OEM/ODM Welcome" },
    nav: { home: "Home", about: "About", products: "Products", why: "Why Us", contact: "Contact", inquiry: "Get a Quote", news: "News", guides: "Guides", factory: "Factory", faq: "FAQ" },
    articles: {
      indexTitle: "Guides & Selection Help",
      indexLead: "Practical guides to choosing, comparing and using our micro tillers, ditching machines and water pumps.",
      related: "Related guides",
      allGuides: "All guides",
      backToGuides: "← All guides",
      updated: "Updated",
      published: "Published",
      faqTitle: "Frequently asked questions",
      faqLead: "Answers to the questions buyers ask us most.",
      readMore: "Read guide"
    },
    factory: {
      title: "Inside Our Factory",
      lead: "Haogeng is the export arm of Guigeng Agricultural Machinery, and every machine on this site is built in our own plant. Below is what the workshop looks like — the equipment, the assembly work, and the packing we do before a machine leaves.",
      s1Title: "One Company, Factory-Backed",
      s1Text: "We combine manufacturing and international trade in one company. What you receive is shipped straight from our own plant: every model we sell is made by Guangxi Lichuang Machinery. We do not buy machines from other factories and put our label on them.",
      s2Title: "Metal fabrication and welding",
      s2Text: "CNC laser cutting, CNC bending, laser pipe cutting and laser welding produce the frames, handles and gearbox housings. Working the metal inside the plant is what keeps the fit between parts consistent from one batch to the next.",
      s3Title: "Assembly",
      s3Text: "Frame, engine, gearbox and handle are fitted and checked one machine at a time. The gearbox is the part that carries the daily work, so it is the part we look at most closely.",
      s4Title: "Packing and loading",
      s4Text: "Each machine is packed with the attachments it is sold with, and the packed machine is protected for container transport, so it arrives without handling damage.",
      s5Title: "Patents and promoted-product status",
      s5Text: "Our R&D holds national utility-model patents, and our flagship 4WD micro tiller is listed by China's agricultural machinery authority as a National Agricultural Machinery Promoted Product. Certificate details are available on request.",
      capShowroom: "Product showroom",
      capAssembly: "Production assembly",
      capPacking: "Quality inspection and packing",
      cta: "Tell us your field size and we will match you with a model",
      full: "View full size"
    },
    hero: {
      title: "Factory-Direct Agricultural Machinery",
      sub: "Micro tillers · Ditching machines · Water pumps. Backed by our own manufacturing plant — factory-direct pricing and steady production capacity.",
      cta1: "View Products", cta2: "Send Inquiry",
      stat1: { num: "15+", label: "Years Manufacturing" },
      stat2: { num: "30+", label: "Product Models" },
      stat3: { num: "1", label: "Own Factory" }
    },
    about: {
      title: "About Us",
      lead: "Liuzhou Haogeng International Trade Co., Ltd. (Haogeng) is the export and trading arm of Guigeng Agricultural Machinery. As the brand's international sales company, we work directly with our own manufacturing plant — giving overseas buyers true factory-direct pricing and reliable supply.",
      c1: { title: "One Company, Factory-Backed", text: "We combine manufacturing and international trade in one company. What you receive is shipped straight from our own plant: every model we sell is made by Guangxi Lichuang Machinery. We do not buy machines from other factories and put our label on them." },
      c2: { title: "Patented Technology", text: "Our R&D team holds national utility-model patents, and our flagship 4WD micro tiller is listed by China's agricultural machinery authority as a National Agricultural Machinery Promoted Product. Certificate details available on request." },
      c3: { title: "Advanced Equipment", text: "CNC laser cutting, CNC bending, laser pipe cutting and laser welding lines guarantee precision, durability and a consistent finish." }
    },
    products: {
      title: "Our Products",
      lead: "Three main product lines. Custom OEM/ODM available — tell us your market and requirements.",
      filter: { all: "All", tiller: "Micro Tillers", ditching: "Ditching Machines", pump: "Water Pumps" },
      inquire: "Send Inquiry",
      detail: {
        back: "← Back to Products",
        description: "Overview",
        bestFor: "Best For",
        features: "Features",
        specs: "Specifications",
        getQuote: "Get Quote Now",
        copyInquiry: "Copy Inquiry",
        copy: "Copy",
        whatsapp: "WhatsApp",
        email: "Email",
        contactSection: "Send us your requirements and we will reply within 24 hours.",
        accessories: {
          title: "What's in the Box",
          subtitle: "All accessories shown below are included FREE when you purchase this machine — ready to use straight out of the crate.",
          item1: { name: "Paddy Field Wheel Set", qty: "1 set", desc: "Wide paddle wheels designed for soft, waterlogged paddy fields. Slip directly onto the rotor shaft in place of the dry-land blades when working in wet conditions." },
          item2: { name: "Anti-Wrap Blade Set", qty: "1 set", desc: "Curved blades engineered to resist weed and vine wrap. The swept geometry keeps tall grass and crop residue from tangling around the rotor during heavy tillage." },
          item3: { name: "Rubber Tire Set", qty: "1 set", desc: "Treaded rubber transport wheels with metal hubs and a square axle bore. Swap on when you need to roll the machine between plots without scarring the ground." },
          item4: { name: "Dry-Land Blade Set", qty: "1 set", desc: "Hardened H-pattern rotary blades for breaking firm, dry soil. Pre-assembled on the cage frame, ready to mount on the rotor shaft straight out of the crate." }
        }
      }
    },
    why: {
      title: "Why Choose Us",
      w1: { title: "Factory-Direct Price", text: "No middlemen — you buy straight from the manufacturer." },
      w2: { title: "OEM / ODM", text: "Custom brand, color and specifications for your market." },
      w3: { title: "Quality Control", text: "Strict QC on every unit before shipment, durable in the field." },
      w4: { title: "Reliable Delivery", text: "Steady production capacity ensures on-time delivery." },
      w5: { title: "Export Experience", text: "Shipping to Southeast Asia, India and Sri Lanka — 300 micro tillers shipped to Sri Lanka in a single year, with full export documentation." },
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
        copySub: "Paste anywhere",
        webmail: "No mail app? Try the web version:",
        copied: "✓ Inquiry text copied — paste it anywhere to send"
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
    brand: { name: "浩耕", tagline: "农业机械", full: "柳州浩耕国际贸易有限责任公司", guigeng: "桂耕农机", lichuang: "立创机械" },
    topbar: { hint: "工厂直供 · 支持OEM/ODM定制" },
    nav: { home: "首页", about: "关于我们", products: "产品中心", why: "我们的优势", contact: "联系我们", inquiry: "获取报价", news: "媒体报道", guides: "选型指南", factory: "工厂实拍", faq: "FAQ" },
    articles: {
      indexTitle: "选型指南",
      indexLead: "微耕机、开沟培土机、抽水机的选型、对比与使用指南。",
      related: "相关指南",
      allGuides: "全部指南",
      backToGuides: "← 返回指南列表",
      updated: "更新于",
      published: "发布于",
      faqTitle: "常见问题",
      faqLead: "买家最常问的问题，这里有答案。",
      readMore: "阅读指南"
    },
    factory: {
      title: "工厂实拍",
      lead: "浩耕是桂耕农机的出口公司，本站上的每一台机器都在自有工厂制造。下面是车间实拍：设备、装配工序，以及机器出厂前的打包。",
      s1Title: "工贸一体 · 自有工厂",
      s1Text: "我们是工贸一体，你拿到的是工厂直出的机器。所有机型都是广西立创工厂生产，不从别的工厂进货贴牌。",
      s2Title: "钣金与焊接",
      s2Text: "数控激光切割、数控折弯、激光切管与激光焊接负责车架、手柄和齿轮箱壳体。金属件在厂内自己做，批次之间的配合尺寸才稳定。",
      s3Title: "装配",
      s3Text: "车架、发动机、变速箱与手柄逐台装配、逐台检查。变速箱是承受日常作业负荷的部位，也是我们检查得最细的地方。",
      s4Title: "打包与装柜",
      s4Text: "机器与所售配件一起打包，按柜运要求做防护，避免装卸和长途运输中的磕碰损伤。",
      s5Title: "专利与推广产品资质",
      s5Text: "研发团队持有国家实用新型专利，主打的 4WD 微耕机被中国农机主管部门列为国家农机推广产品。证书资料可提供。",
      capShowroom: "产品展厅",
      capAssembly: "生产装配",
      capPacking: "质检与打包",
      cta: "告诉我们地块大小和用途，我们帮你配型号",
      full: "查看大图"
    },
    hero: {
      title: "工厂直供农业机械",
      sub: "微耕机 · 开沟培土机 · 抽水机。自有工厂生产，工厂直供价格，产能稳定。",
      cta1: "查看产品", cta2: "发送询盘",
      stat1: { num: "15+", label: "年制造经验" },
      stat2: { num: "30+", label: "产品型号" },
      stat3: { num: "1", label: "自有工厂" }
    },
    about: {
      title: "关于我们",
      lead: "柳州浩耕国际贸易有限责任公司（浩耕）是桂耕农机品牌的对外贸易公司，直接对接背后的自有工厂。工贸一体，让海外买家享受真正的工厂直供价格与稳定货源。",
      c1: { title: "工贸一体 · 自有工厂", text: "我们是工贸一体，你拿到的是工厂直出的机器。所有机型都是广西立创工厂生产，不从别的工厂进货贴牌。" },
      c2: { title: "专利技术", text: "研发团队拥有国家实用新型专利，主打4WD微耕机为“国家农机推广产品”，证书资料可提供。" },
      c3: { title: "先进设备", text: "数控激光切割、数控折弯、激光切管、激光焊接生产线，保证精度与耐用性。" }
    },
    products: {
      title: "产品中心",
      lead: "三大产品线，支持OEM/ODM定制，告诉我们您的市场和需求。",
      filter: { all: "全部", tiller: "微耕机", ditching: "开沟培土机", pump: "抽水机" },
      inquire: "发送询盘",
      detail: {
        back: "← 返回产品中心",
        description: "产品简介",
        bestFor: "适用场景",
        features: "核心特性",
        specs: "详细参数",
        getQuote: "立即询盘",
        copyInquiry: "复制询盘",
        copy: "复制",
        whatsapp: "WhatsApp",
        email: "邮件",
        contactSection: "告诉我们您的需求，24 小时内回复。",
        accessories: {
          title: "随箱配件清单",
          subtitle: "购买本机即免费赠送下图全部配件，开箱即用，无需另购。",
          item1: { name: "水田轮一套", qty: "1套", desc: "加宽桨叶式水田轮，专为松软水田作业设计。换装时直接替换旱地刀，无需改轴，即可在湿田里稳定推进。" },
          item2: { name: "防缠刀一套", qty: "1套", desc: "防缠草专用弯刀，刀身弧度经过优化。高草与作物残茬不易缠绕旋耕轴，重负载翻地也能保持稳定作业。" },
          item3: { name: "橡胶轮胎一套", qty: "1套", desc: "带胎纹橡胶行走轮，金属轮毂配方形轴孔。换上后机器可在田块之间推行转移，不伤地面、不陷车。" },
          item4: { name: "旱地刀一套", qty: "1套", desc: "加硬 H 型旋耕弯刀，专攻板结旱地。出厂预装于刀笼架上，拆箱后直接换装到旋耕轴即可下地作业。" }
        }
      }
    },
    why: {
      title: "为什么选择我们",
      w1: { title: "工厂直供价格", text: "没有中间商，直接从厂家采购。" },
      w2: { title: "OEM / ODM 定制", text: "按您的市场定制品牌、颜色和规格。" },
      w3: { title: "质量控制", text: "每台设备出厂前严格质检，田间耐用。" },
      w4: { title: "交货可靠", text: "稳定的产能确保准时交货。" },
      w5: { title: "出口经验", text: "产品出口东南亚、印度和斯里兰卡 —— 单年出口斯里兰卡微耕机300台，提供全套出口单据支持。" },
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
        copySub: "可粘贴到任何地方",
        webmail: "未打开邮箱？试试网页版：",
        copied: "✓ 询盘文案已复制，可粘贴到任何地方发送"
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
    brand: { name: "HAOGENG", tagline: "Maquinaria Agrícola", full: "Liuzhou Haogeng International Trade Co., Ltd.", guigeng: "Guigeng Maquinaria Agrícola", lichuang: "Lichuang Maquinaria Guangxi" },
    topbar: { hint: "Directo de fábrica · OEM/ODM bienvenido" },
    nav: { home: "Inicio", about: "Nosotros", products: "Productos", why: "Ventajas", contact: "Contacto", inquiry: "Solicitar cotización", news: "Noticias", guides: "Guías", factory: "Fábrica", faq: "FAQ" },
    articles: {
      indexTitle: "Guías y consejos de selección",
      indexLead: "Guías prácticas para elegir, comparar y usar motocultores, máquinas zanjas y bombas de agua.",
      related: "Guías relacionadas",
      allGuides: "Todas las guías",
      backToGuides: "← Todas las guías",
      updated: "Actualizado",
      published: "Publicado",
      faqTitle: "Preguntas frecuentes",
      faqLead: "Respuestas a las preguntas que más nos hacen los compradores.",
      readMore: "Leer guía"
    },
    factory: {
      title: "Dentro de nuestra fábrica",
      lead: "Haogeng es el brazo exportador de Guigeng Agricultural Machinery, y cada máquina de este sitio se fabrica en nuestra propia planta. Abajo está el taller: el equipo, el montaje y el embalaje antes de que una máquina salga.",
      s1Title: "Industria y Comercio Integrados · Fábrica Propia",
      s1Text: "Somos fábrica y exportador al mismo tiempo. Lo que recibes sale directamente de nuestra planta: todos los modelos que ofrecemos los fabrica Guangxi Lichuang Machinery. No compramos máquinas a otras fábricas para ponerles nuestra marca.",
      s2Title: "Fabricación de metal y soldadura",
      s2Text: "Corte láser CNC, plegado CNC, corte de tubos láser y soldadura láser producen los chasis, manillares y cárteres de la caja. Trabajar el metal dentro de la planta es lo que mantiene el ajuste de las piezas constante de un lote a otro.",
      s3Title: "Montaje",
      s3Text: "Chasis, motor, caja de cambios y manillar se montan y revisan máquina a máquina. La caja de cambios es la pieza que aguanta el trabajo diario, y por eso es la que revisamos con más detalle.",
      s4Title: "Embalaje y carga",
      s4Text: "Cada máquina se embala con los accesorios con los que se vende, y la máquina embalada se protege para el transporte en contenedor, para que llegue sin daños por manipulación.",
      s5Title: "Patentes y condición de producto promovido",
      s5Text: "Nuestro I+D posee patentes de modelo de utilidad nacionales, y nuestro motocultor 4WD insignia está registrado por la autoridad china de maquinaria agrícola como Producto Promovido Nacional de Maquinaria Agrícola. Los detalles del certificado están disponibles bajo petición.",
      capShowroom: "Showroom de productos",
      capAssembly: "Montaje en producción",
      capPacking: "Inspección de calidad y embalaje",
      cta: "Díganos el tamaño de su parcela y le proponemos el modelo",
      full: "Ver imagen completa"
    },
    hero: {
      title: "Maquinaria agrícola directa de fábrica",
      sub: "Motocultores · Máquinas de zanjeo · Bombas de agua. Respaldados por nuestra propia planta — precio directo de fábrica y capacidad de producción estable.",
      cta1: "Ver productos", cta2: "Enviar consulta",
      stat1: { num: "15+", label: "Años de fabricación" },
      stat2: { num: "30+", label: "Modelos" },
      stat3: { num: "1", label: "Fábrica propia" }
    },
    about: {
      title: "Sobre nosotros",
      lead: "Liuzhou Haogeng es el brazo exportador de la fábrica Guigeng — una verdadera empresa integrada de comercio y fabricación.",
      c1: { title: "Industria y Comercio Integrados · Fábrica Propia", text: "Somos fábrica y exportador al mismo tiempo. Lo que recibes sale directamente de nuestra planta: todos los modelos que ofrecemos los fabrica Guangxi Lichuang Machinery. No compramos máquinas a otras fábricas para ponerles nuestra marca." },
      c2: { title: "Tecnología patentada", text: "Nuestro equipo de I+D posee patentes nacionales de modelo de utilidad, y nuestro microtractor 4WD insignia figura en la lista de la autoridad china de maquinaria agrícola como Producto Nacional de Maquinaria Agrícola Promovido. Certificados disponibles bajo solicitud." },
      c3: { title: "Equipo avanzado", text: "Líneas de corte láser CNC, plegado, corte de tubos y soldadura láser que garantizan precisión y durabilidad." }
    },
    products: {
      title: "Nuestros productos",
      lead: "Tres líneas principales. OEM/ODM disponible — cuéntenos su mercado y requisitos.",
      filter: { all: "Todos", tiller: "Motocultores", ditching: "Máquinas de zanjeo", pump: "Bombas de agua" },
      inquire: "Enviar consulta",
      detail: {
        back: "← Volver a Productos",
        description: "Descripción",
        bestFor: "Ideal Para",
        features: "Características",
        specs: "Especificaciones",
        getQuote: "Solicitar Cotización",
        copyInquiry: "Copiar Consulta",
        copy: "Copiar",
        whatsapp: "WhatsApp",
        email: "Correo",
        contactSection: "Envíenos sus requisitos y responderemos en 24 horas.",
        accessories: {
          title: "Qué Incluye la Caja",
          subtitle: "Todos los accesorios mostrados abajo están INCLUIDOS GRATIS al comprar esta máquina — lista para usar al sacarla de la caja.",
          item1: { name: "Juego de Ruedas para Arrozales", qty: "1 juego", desc: "Ruedas de paletas anchas diseñadas para arrozales blandos e inundados. Se montan directo en el eje del rotor reemplazando las cuchillas de tierra seca." },
          item2: { name: "Juego de Cuchillas Anti-Enredo", qty: "1 juego", desc: "Cuchillas curvas diseñadas para resistir el enredo de maleza. La geometría de barrido evita que el pasto alto y los residuos de cultivo se enrollen en el rotor." },
          item3: { name: "Juego de Neumáticos de Caucho", qty: "1 juego", desc: "Ruedas de caucho con tacos para transporte, con cubos metálicos y eje cuadrado. Ideales para trasladar la máquina entre parcelas sin dañar el suelo." },
          item4: { name: "Juego de Cuchillas para Tierra Seca", qty: "1 juego", desc: "Cuchillas rotativas tipo H endurecidas para romper tierra firme y seca. Pre-ensambladas en el bastidor, listas para montar al sacarlas de la caja." }
        }
      }
    },
    why: {
      title: "Por qué elegirnos",
      w1: { title: "Precio de fábrica", text: "Sin intermediarios — compre directo del fabricante." },
      w2: { title: "OEM / ODM", text: "Marca, color y especificaciones personalizadas para su mercado." },
      w3: { title: "Control de calidad", text: "Control estricto en cada unidad antes del envío." },
      w4: { title: "Entrega confiable", text: "Capacidad de producción estable para entrega puntual." },
      w5: { title: "Experiencia exportadora", text: "Enviamos al Sudeste Asiático, la India y Sri Lanka — 300 motocultores exportados a Sri Lanka en un solo año, con documentación completa de exportación." },
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
        copySub: "Pegar en cualquier lugar",
        webmail: "¿No se abrió tu correo? Prueba la versión web:",
        copied: "✓ Texto de la consulta copiado: pégalo donde quieras enviarlo"
      }
    },
    footer: { rights: "Todos los derechos reservados." },
    news: {
      title: "En las noticias",
      source: "Departamento de Agricultura y Asuntos Rurales de Guangxi · Liuzhou Daily · 2025-02-24",
      headline: "“Aumentando la producción para apoyar la arada de primavera”",
      intro: "Tras el término solar de la Lluvia, con los campos ocupados en la arada de primavera, la producción de maquinaria agrícola también está a pleno rendimiento. El 19 de febrero, periodistas visitaron un fabricante de maquinaria agrícola en la Avenida Liugong y vieron sus líneas de producción funcionando a plena capacidad para acelerar la fabricación de motocultores para la arada de primavera.",
      quote: "“Director general Wu, ¿cuándo se nos puede enviar el pedido?” Esa mañana, el Sr. Zeng, un distribuidor de maquinaria agrícola de Hunan, fue a Guangxi Lichuang Machinery Manufacturing Co., Ltd. a recoger su mercancía. “La temporada de arada de primavera es el pico de ventas, por eso nos dimos prisa en venir a Liuzhou a recoger la mercancía”, respondió el responsable de la empresa, Wu Siyu: “Estamos acelerando la producción: lo que esté listo, lo enviamos primero”. Inmediatamente organizó la entrega por camión.",
      factory: "Lichuang Machinery se dedica a producir y desarrollar nuevos motocultores 4WD, máquinas de gestión de parcelas y máquinas de zanjeo. Wu Siyu explicó que el motocultor 4WD de rotación frontal de la marca Guigeng está diseñado para zonas accidentadas y montañosas con parcelas pequeñas y fuertes desniveles: es ligero, compacto, potente y fácil de manejar, ideal para las regiones del sur y el producto de maquinaria agrícola más vendido en temporada de arada de primavera. Además de abastecer el mercado local, sus productos también se venden en Hunan, Jiangxi, Hainan y Hubei.",
      capacity: "En el taller de producción, los trabajadores estaban ocupados montando piezas en la línea de montaje. En cuanto una máquina salía de la línea, se sometía a control de calidad, se embalaba y quedaba a la espera de envío. “Empezamos a trabajar el cuarto día del Año Nuevo Lunar. Ahora tenemos dos líneas de producción funcionando a plena capacidad, con unas 130 unidades de motocultor al día”, dijo Wu. Aun así, esto todavía no cubre la demanda actual de pedidos. El mes que viene, la empresa abrirá una nueva línea de producción de maquinaria agrícola grande de cuatro ruedas para aumentar la capacidad.",
      export: "En los últimos años, Lichuang Machinery ha sabido aprovechar las oportunidades de la Iniciativa de la Franja y la Ruta, exportando productos a los mercados del Sudeste Asiático. Wu dijo que los motocultores también son muy populares en la India, Vietnam y otros mercados. El año pasado, la empresa exportó 300 motocultores a Sri Lanka. Este año la empresa explora más el potencial del mercado del Sudeste Asiático y desarrolla máquinas para la recolección de nuez de areca según las necesidades agrícolas locales, para mejorar su competitividad en los mercados de la región.",
      h1: { num: "300", label: "Unidades exportadas a Sri Lanka" },
      h2: { num: "130", label: "Unidades de capacidad diaria" },
      h3: { num: "2", label: "Líneas de producción a plena capacidad" }
    }
  },

  ru: {
    brand: { name: "HAOGENG", tagline: "Сельхозтехника", full: "Liuzhou Haogeng International Trade Co., Ltd.", guigeng: "Гуйгэн Сельхозтехника", lichuang: "Гуанси Личуан Машиностроение" },
    topbar: { hint: "Напрямую с завода · OEM/ODM приветствуется" },
    nav: { home: "Главная", about: "О нас", products: "Продукция", why: "Плюсы", contact: "Контакты", inquiry: "Запросить цену", news: "Новости", guides: "Руководства", factory: "Завод", faq: "FAQ" },
    articles: {
      indexTitle: "Руководства и советы по выбору",
      indexLead: "Практические руководства по выбору, сравнению и эксплуатации мотокультиваторов, машин для канав и водяных насосов.",
      related: "Похожие руководства",
      allGuides: "Все руководства",
      backToGuides: "← Все руководства",
      updated: "Обновлено",
      published: "Опубликовано",
      faqTitle: "Частые вопросы",
      faqLead: "Ответы на вопросы, которые нам чаще всего задают покупатели.",
      readMore: "Читать руководство"
    },
    factory: {
      title: "Наша фабрика",
      lead: "Haogeng — экспортное подразделение Guigeng Agricultural Machinery, и каждая машина на сайте изготовлена на нашем собственном заводе. Ниже — цех: оборудование, сборка и упаковка перед отгрузкой.",
      s1Title: "Производство и Торговля в одной компании · Собственный Завод",
      s1Text: "Мы одновременно и производитель, и экспортёр. То, что вы получаете, отгружается прямо с нашего завода: все наши модели выпускает Guangxi Lichuang Machinery. Мы не закупаем технику у других заводов и не ставим на неё свою марку.",
      s2Title: "Обработка металла и сварка",
      s2Text: "Раскрой лазером на ЧПУ, гибка на ЧПУ, лазерная резка труб и лазерная сварка дают рамы, рукоятки и корпуса коробок передач. Собственная обработка металла держит постоянный зазор между деталями от партии к партии.",
      s3Title: "Сборка",
      s3Text: "Рама, двигатель, коробка передач и рукоятка собираются и проверяются на каждой машине. Коробка передач — узел, который принимает ежедневную нагрузку, поэтому мы проверяем её внимательнее всего.",
      s4Title: "Упаковка и погрузка",
      s4Text: "Каждая машина упаковывается вместе с продаваемыми навесным оборудованием, а упакованная машина защищается для перевозки в контейнере, чтобы прибыть без повреждений при погрузке.",
      s5Title: "Патенты и статус продвигаемой продукции",
      s5Text: "Наше конструкторское бюро имеет национальные патенты на полезную модель, а флагманский 4WD мотокультиватор включён Управлением сельскохозяйственной техники Китая в перечень продвигаемой национальной продукции. Данные сертификата предоставляются по запросу.",
      capShowroom: "Выставочный зал продукции",
      capAssembly: "Сборка на производстве",
      capPacking: "Контроль качества и упаковка",
      cta: "Напишите нам размер участка и задачи — мы подберём модель",
      full: "Открыть фото"
    },
    hero: {
      title: "Сельхозтехника напрямую с завода",
      sub: "Мотокультиваторы · Машины для нарезки канав · Водяные насосы. Собственное производство — цена напрямую с завода и стабильные производственные мощности.",
      cta1: "Смотреть продукцию", cta2: "Отправить запрос",
      stat1: { num: "15+", label: "Лет производства" },
      stat2: { num: "30+", label: "Моделей" },
      stat3: { num: "1", label: "Собственное производство" }
    },
    about: {
      title: "О нас",
      lead: "Liuzhou Haogeng — экспортное подразделение завода Guigeng, полностью интегрированная торгово-производственная компания.",
      c1: { title: "Производство и Торговля в одной компании · Собственный Завод", text: "Мы одновременно и производитель, и экспортёр. То, что вы получаете, отгружается прямо с нашего завода: все наши модели выпускает Guangxi Lichuang Machinery. Мы не закупаем технику у других заводов и не ставим на неё свою марку." },
      c2: { title: "Запатентованные технологии", text: "Наша команда R&D имеет национальные патенты на полезную модель, а наш флагманский 4WD микрокультиватор включён китайским органом по сельскохозяйственной технике в перечень «Продвигаемая национальная сельскохозяйственная техника». Документы предоставляются по запросу." },
      c3: { title: "Современное оборудование", text: "Линии лазерной резки ЧПУ, гибки, резки труб и лазерной сварки обеспечивают точность и долговечность." }
    },
    products: {
      title: "Наша продукция",
      lead: "Три основные линейки. OEM/ODM доступно — расскажите о вашем рынке.",
      filter: { all: "Все", tiller: "Мотокультиваторы", ditching: "Машины для канав", pump: "Водяные насосы" },
      inquire: "Отправить запрос",
      detail: {
        back: "← Назад к продуктам",
        description: "Описание",
        bestFor: "Подходит Для",
        features: "Особенности",
        specs: "Характеристики",
        getQuote: "Запросить цену",
        copyInquiry: "Копировать запрос",
        copy: "Копировать",
        whatsapp: "WhatsApp",
        email: "Email",
        contactSection: "Отправьте ваши требования, ответим в течение 24 часов.",
        accessories: {
          title: "Что в комплекте",
          subtitle: "Все аксессуары ниже БЕСПЛАТНО входят в комплект при покупке этой машины — готова к работе прямо из коробки.",
          item1: { name: "Комплект колёс для рисовых полей", qty: "1 комплект", desc: "Широкие веслообразные колёса, специально разработанные для мягких и заболоченных рисовых полей. Устанавливаются прямо на вал ротора вместо сухих ножей при работе в мокрых условиях." },
          item2: { name: "Комплект противозаматывающих ножей", qty: "1 комплект", desc: "Усиленные изогнутые ножи против наматывания сорняков. Геометрия лопастей не допускает запутывания высокой травы и растительных остатков на роторе при тяжёлой вспашке." },
          item3: { name: "Комплект резиновых шин", qty: "1 комплект", desc: "Транспортировочные резиновые колёса с грунто-зацепами, металлическими ступицами и квадратным отверстием под вал. Удобно для перемещения машины между участками без вреда почве." },
          item4: { name: "Комплект ножей для сухой земли", qty: "1 комплект", desc: "Закалённые ножи типа H для разрыхления плотной сухой почвы. Предварительно установлены на каркасе клетки, готовы к монтажу на вал ротора сразу после распаковки." }
        }
      }
    },
    why: {
      title: "Почему мы",
      w1: { title: "Заводская цена", text: "Без посредников — покупка напрямую у производителя." },
      w2: { title: "OEM / ODM", text: "Индивидуальные бренд, цвет и характеристики под ваш рынок." },
      w3: { title: "Контроль качества", text: "Строгий контроль каждой единицы перед отгрузкой." },
      w4: { title: "Надёжная поставка", text: "Стабильные мощности обеспечивают своевременную доставку." },
      w5: { title: "Опыт экспорта", text: "Поставки в юго-Восточную Азию, Индию и Шри-Ланку — 300 мотокультиваторов поставлено в Шри-Ланку за один год, с полным пакетом экспортных документов." },
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
        copySub: "Вставьте куда угодно",
        webmail: "Почта не открылась? Попробуйте веб-версию:",
        copied: "✓ Текст запроса скопирован — вставьте его куда угодно"
      }
    },
    footer: { rights: "Все права защищены." },
    news: {
      title: "В новостях",
      source: "Департамент сельского хозяйства и сельских территорий Гуанси · газета «Лючжоу» · 2025-02-24",
      headline: "«Ускоряем производство, помогая весенним полевым работам»",
      intro: "После солнечного термина «Дождь», когда поля заняты весенней пашкой, производство сельхозтехники тоже идёт полным ходом. 19 февраля журналисты побывали на предприятии по производству сельхозтехники на автодороге Люгун и увидели, как производственные линии работают на полную мощность, чтобы успеть с микрокультиваторами к весенней паште.",
      quote: "«Директор Ву, когда отгрузить наш заказ?» Утром того дня господин Цзэн, дилер сельхозтехники из Хунаня, приехал на Guangxi Lichuang Machinery Manufacturing Co., Ltd. за товаром. «Весенняя пашка — пик продаж, поэтому мы поспешили в Лючжоу за товаром», ответил руководитель компании Ву Сыюй: «Мы ускоряем производство — что готово, отправляем первым». Сразу же он организовал доставку грузовиком.",
      factory: "Как сообщается, Lichuang Machinery — предприятие, специализирующееся на производстве и разработке новых четырёхколёсных микрокультиваторов, машин для ухода за посевами и машин для нарезки канав. Ву Сыюй рассказал, что четырёхколёсный микрокультиватор с передним ротором марки Guigeng предназначен для холмистых и горных районов с небольшими участками и большими перепадами высот: он лёгкий, компактный, мощный и простой в управлении — идеален для южных регионов и стал самым продаваемым товаром сельхозтехники в сезон весенней пашки. Кроме местного рынка, продукция также поставляется в Хунань, Цзянси, Хайнань и Хубэй.",
      capacity: "В производственном цехе рабочие были заняты сборкой комплектующих на конвейере. Как только машина сходила с линии, её сразу отправляли на контроль качества, упаковывали и готовили к отгрузке. «Мы приступили к работе на четвёртый день Лунного Нового года. Сейчас две производственные линии работают на полную мощность, выпуская около 130 микрокультиваторов в день», — сказал Ву. И всё же этого пока не хватает, чтобы удовлетворить текущий спрос. В следующем месяце компания откроет новую производственную линию крупной четырёхколёсной сельхозтехники, чтобы увеличить мощности.",
      export: "В последние годы Lichuang Machinery использует возможности инициативы «Один пояс — один путь» и экспортирует продукцию на рынки Юго-Восточной Азии. По словам Ву, микрокультиваторы также очень популярны в Индии, Вьетнаме и на других рынках. В прошлом году компания экспортировала в Шри-Ланку 300 микрокультиваторов. В этом году она будет дальше изучать потенциал рынка Юго-Восточной Азии и разрабатывать технику для сбора орехов ареки под местные сельскохозяйственные нужды, повышая конкурентоспособность на рынках этого региона.",
      h1: { num: "300", label: "Единиц экспортировано в Шри-Ланку" },
      h2: { num: "130", label: "Единиц в сутки (мощность)" },
      h3: { num: "2", label: "Линии на полной мощности" }
    }
  },

  fr: {
    brand: { name: "HAOGENG", tagline: "Machinerie Agricole", full: "Liuzhou Haogeng International Trade Co., Ltd.", guigeng: "Guigeng Machinisme Agricole", lichuang: "Lichuang Guangxi Machines" },
    topbar: { hint: "Direct usine · OEM/ODM bienvenu" },
    nav: { home: "Accueil", about: "À propos", products: "Produits", why: "Nos atouts", contact: "Contact", inquiry: "Devis", news: "Actualités", guides: "Guides", factory: "L'usine", faq: "FAQ" },
    articles: {
      indexTitle: "Guides et conseils de choix",
      indexLead: "Des guides pratiques pour choisir, comparer et utiliser motoculteurs, machines à fossés et pompes à eau.",
      related: "Guides associés",
      allGuides: "Tous les guides",
      backToGuides: "← Tous les guides",
      updated: "Mis à jour",
      published: "Publié",
      faqTitle: "Questions fréquentes",
      faqLead: "Les réponses aux questions que les acheteurs nous posent le plus souvent.",
      readMore: "Lire le guide"
    },
    factory: {
      title: "Dans notre usine",
      lead: "Haogeng est la branche export de Guigeng Agricultural Machinery, et chaque machine de ce site est fabriquée dans notre propre usine. Voici l'atelier : les équipements, l'assemblage et l'emballage avant le départ de la machine.",
      s1Title: "Industrie et Commerce Réunis · Notre Usine",
      s1Text: "Nous réunissons la fabrication et le commerce international. Ce que vous recevez part directement de notre usine : tous nos modèles sont fabriqués par Guangxi Lichuang Machinery. Nous n'achetons pas de machines chez d'autres fabricants pour y apposer notre marque.",
      s2Title: "Usinage des pièces métalliques et soudure",
      s2Text: "Découpe laser CNC, cintrage CNC, découpe de tubes au laser et soudage laser produisent les châssis, guidons et carters de boîte. Travailler le métal sur place est ce qui garde l'ajustement des pièces constant d'un lot à l'autre.",
      s3Title: "Assemblage",
      s3Text: "Châssis, moteur, boîte de vitesses et guidon sont montés et contrôlés machine par machine. La boîte de vitesses est l'organe qui encaisse le travail quotidien ; c'est donc celui que nous vérifions le plus attentivement.",
      s4Title: "Emballage et chargement",
      s4Text: "Chaque machine est emballée avec les accessoires vendus avec elle, et la machine emballée est protégée pour le transport en conteneur, afin d'arriver sans dommage de manutention.",
      s5Title: "Brevets et statut de produit promu",
      s5Text: "Notre bureau d'études détient des brevets de modèle d'utilité nationaux, et notre motoculteur 4WD phare est inscrit par l'autorité chinoise de la machinerie agricole au titre des produits agricoles nationaux promus. Les détails du certificat sont fournis sur demande.",
      capShowroom: "Showroom produits",
      capAssembly: "Assemblage en production",
      capPacking: "Contrôle qualité et emballage",
      cta: "Dites-nous la taille de votre parcelle et nous vous proposerons le modèle",
      full: "Voir en grand"
    },
    hero: {
      title: "Machines agricoles directes d'usine",
      sub: "Motoculteurs · Machines à fossés · Pompes à eau. Adossés à notre propre usine — prix direct usine et capacité de production stable.",
      cta1: "Voir les produits", cta2: "Envoyer une demande",
      stat1: { num: "15+", label: "Ans de fabrication" },
      stat2: { num: "30+", label: "Modèles" },
      stat3: { num: "1", label: "Usine intégrée" }
    },
    about: {
      title: "À propos",
      lead: "Liuzhou Haogeng est le bras export de l'usine Guigeng — une véritable entreprise intégrée commerce + fabrication.",
      c1: { title: "Industrie et Commerce Réunis · Notre Usine", text: "Nous réunissons la fabrication et le commerce international. Ce que vous recevez part directement de notre usine : tous nos modèles sont fabriqués par Guangxi Lichuang Machinery. Nous n'achetons pas de machines chez d'autres fabricants pour y apposer notre marque." },
      c2: { title: "Technologie brevetée", text: "Notre équipe R&D détient des brevets nationaux de modèle d'utilité, et notre micro-culteur 4WD phare est inscrit par l'autorité chinoise de la machinerie agricole parmi les Produits Agricoles Nationaux Promus. Certificats disponibles sur demande." },
      c3: { title: "Équipement avancé", text: "Lignes de découpe laser CNC, pliage, découpe de tubes et soudage laser garantissant précision et durabilité." }
    },
    products: {
      title: "Nos produits",
      lead: "Trois gammes principales. OEM/ODM disponible — parlez-nous de votre marché.",
      filter: { all: "Tous", tiller: "Motoculteurs", ditching: "Machines à fossés", pump: "Pompes à eau" },
      inquire: "Envoyer une demande",
      detail: {
        back: "← Retour aux Produits",
        description: "Description",
        bestFor: "Idéal Pour",
        features: "Caractéristiques",
        specs: "Spécifications",
        getQuote: "Demander un devis",
        copyInquiry: "Copier la demande",
        copy: "Copier",
        whatsapp: "WhatsApp",
        email: "Courriel",
        contactSection: "Envoyez-nous vos besoins, nous répondrons sous 24 heures.",
        accessories: {
          title: "Ce Que Comprend la Boîte",
          subtitle: "Tous les accessoires ci-dessous sont INCLUS GRATUITEMENT à l'achat de cette machine — prête à l'emploi dès la sortie du carton.",
          item1: { name: "Jeu de Roues pour Rizières", qty: "1 jeu", desc: "Roues à palettes larges conçues pour les rizières meubles et inondées. Se montent directement sur l'arbre du rotor en remplacement des lames pour terre sèche." },
          item2: { name: "Jeu de Lames Anti-Enroulement", qty: "1 jeu", desc: "Lames courbes conçues pour résister à l'enroulement des mauvaises herbes. La géométrie balayée empêche l'herbe haute et les résidus de culture de s'enrouler autour du rotor." },
          item3: { name: "Jeu de Pneumatiques en Caoutchouc", qty: "1 jeu", desc: "Roues de transport en caoutchouc cramponnées avec moyeux métalliques et alésage carré. Idéales pour déplacer la machine entre parcelles sans abîmer le sol." },
          item4: { name: "Jeu de Lames pour Terre Sèche", qty: "1 jeu", desc: "Lames rotatives type H trempées pour briser les sols fermes et secs. Pré-assemblées sur le cadre de cage, prêtes à monter dès la sortie du carton." }
        }
      }
    },
    why: {
      title: "Pourquoi nous choisir",
      w1: { title: "Prix direct usine", text: "Sans intermédiaires — vous achetez directement au fabricant." },
      w2: { title: "OEM / ODM", text: "Marque, couleur et spécifications personnalisées pour votre marché." },
      w3: { title: "Contrôle qualité", text: "Contrôle strict de chaque unité avant expédition." },
      w4: { title: "Livraison fiable", text: "Capacité de production stable pour une livraison ponctuelle." },
      w5: { title: "Expérience export", text: "Exports vers l'Asie du Sud-Est, l'Inde et le Sri Lanka — 300 motoculteurs expédiés au Sri Lanka en une seule année, avec documentation complète d'export." },
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
        copySub: "Coller n'importe où",
        webmail: "Votre messagerie ne s'ouvre pas ? Essayez la version web :",
        copied: "✓ Texte de la demande copié — collez-le où vous voulez"
      }
    },
    footer: { rights: "Tous droits réservés." },
    news: {
      title: "Dans l'actualité",
      source: "Département de l'Agriculture et des Affaires Rurales du Guangxi · Liuzhou Daily · 2025-02-24",
      headline: "« Accélérer la production pour soutenir le labour de printemps »",
      intro: "Après le terme solaire de la Pluie, alors que les champs sont occupés par le labour de printemps, la production de machines agricoles est elle aussi en plein élan. Le 19 février, des journalistes ont visité un fabricant de machines agricoles situé avenue Liugong et ont vu les lignes de production fonctionner à pleine capacité pour accélérer les motoculteurs destinés au labour de printemps.",
      quote: "« Directeur Wu, quand notre commande pourra-t-elle être expédiée ? » Ce matin-là, M. Zeng, concessionnaire de machines agricoles originaire du Hunan, s'est rendu chez Guangxi Lichuang Machinery Manufacturing Co., Ltd. pour retirer sa marchandise. « La saison de labour de printemps est le pic des ventes, nous avons donc fait diligence pour venir à Liuzhou », a répondu le responsable de l'entreprise, Wu Siyu : « Nous accélérons la production — tout ce qui est prêt part en premier. » Il a aussitôt organisé l'expédition par camion.",
      factory: "Lichuang Machinery est une entreprise spécialisée dans la production et le développement de nouveaux motoculteurs 4WD, de machines d'entretien des parcelles et de machines à fossés. Wu Siyu explique que le motoculteur 4WD à rotation frontale de la marque Guigeng est conçu pour les zones vallonnées et montagneuses aux petites parcelles et aux forts dénivelés : il est léger, compact, puissant et facile à manier, idéal pour les régions du Sud, et c'est la machine agricole la plus vendue pendant la saison du labour de printemps. Outre le marché local, ses produits sont également vendus au Hunan, au Jiangxi, à Hainan et au Hubei.",
      capacity: "Dans l'atelier de production, les ouvriers assemblaient sans relâche les pièces sur la ligne de montage. Dès qu'une machine sortait de la ligne, elle passait au contrôle qualité, était emballée et attendait l'expédition. « Nous avons repris le travail le quatrième jour du Nouvel An lunaire. Deux lignes de production fonctionnent aujourd'hui à pleine capacité, avec environ 130 motoculteurs par jour », a déclaré Wu. Cela ne suffit pourtant pas encore à couvrir la demande actuelle. Le mois prochain, l'entreprise ouvrira une nouvelle ligne de production de grandes machines agricoles à quatre roues afin d'accroître ses capacités.",
      export: "Ces dernières années, Lichuang Machinery a saisi les opportunités offertes par l'Initiative Belt and Road et exporte ses produits vers les marchés d'Asie du Sud-Est. Wu indique que les motoculteurs sont également très appréciés en Inde, au Vietnam et sur d'autres marchés. L'an dernier, l'entreprise a exporté 300 motoculteurs au Sri Lanka. Cette année, elle approfondit le potentiel du marché d'Asie du Sud-Est et développe du matériel pour la récolte de la noix d'arec selon les besoins agricoles locaux, afin de renforcer sa compétitivité sur ces marchés.",
      h1: { num: "300", label: "Unités exportées au Sri Lanka" },
      h2: { num: "130", label: "Unités de capacité journalière" },
      h3: { num: "2", label: "Lignes de production à pleine capacité" }
    }
  },

  sw: {
    brand: { name: "HAOGENG", tagline: "Mashine za Kilimo", full: "Liuzhou Haogeng International Trade Co., Ltd.", guigeng: "Mashine za Kilimo za Guigeng", lichuang: "Mashine za Lichuang Guangxi" },
    topbar: { hint: "Moja kwa moja kutoka kiwanda · OEM/ODM yanakaribishwa" },
    nav: { home: "Mwanzo", about: "Kuhusu sisi", products: "Bidhaa", why: "Kwa nini sisi", contact: "Wasiliana nasi", inquiry: "Omba bei", news: "Habari", guides: "Miongozo", factory: "Kiji", faq: "FAQ" },
    articles: {
      indexTitle: "Miongozo na Ushauri",
      indexLead: "Miongozo ya kuchagua, kulinganisha na kutumia trekta ndogo, mashine za makorongo na pampu za maji.",
      related: "Miongozo inayohusiana",
      allGuides: "Miongozo zote",
      backToGuides: "← Miongozo zote",
      updated: "Imesasishwa",
      published: "Imechapishwa",
      faqTitle: "Maswali yanayoulizwa mara kwa mara",
      faqLead: "Majibu ya maswali yanayoulizwa na watanunaji wengi.",
      readMore: "Soma miongozo"
    },
    factory: {
      title: "Ndani ya kiji chetu",
      lead: "Haogeng ni tanzu ya kuuza nje ya Guigeng Agricultural Machinery, na kila mashine kwenye tovuti hii hutengenezwa katika kiji chetu mwenyewe. Hapa chini ndani ya kiji: vifaa, kusanya na kupanga kabla ya mashine kuondoka.",
      s1Title: "Kampuni Moja, Inayoungwa mkono na Kiwanda",
      s1Text: "Tunaunganisha utengenezaji na biashara ya kimataifa. Unachopokea hapa ni mashine zinazotoka moja kwa moja kiwandani wetu: modeli zote tunazoziia zinatengenezwa na Guangxi Lichuang Machinery. Hatuizi mashine kutoka kwa viwanda vingine kuzibadilisha jina na kuziuza kama zilivyotengenezwa na sisi.",
      s2Title: "Uchakataji wa vyuma na kuchomea",
      s2Text: "Kukata laseri ya CNC, kugonga CNC, kukata miri ya laseri na kuchomea laseri hutengeneza frame za mashine, mikono na vyumba vya gearbox. Kushughulika na vyuma ndani ya kiji ndiyo kinachowafanya vipimo vya sehemu zake kuwa sawa kati ya batch moja na nyingine.",
      s3Title: "Kusanya",
      s3Text: "Frame, injini, sanduku la gia na mkono husanywa na kukaguliwa moja kwa moja. Sanduku la gia ndio sehemu inayobeba kazi ya kila siku, kwa hivyo ndicho tunachokagua kwa makini zaidi.",
      s4Title: "Kupanga na kupakia",
      s4Text: "Kila mashine hupangwa pamoja na vifaa unavyonunua nazo, na mashine iliyopangwa inalindwa kwa usafirishaji wa kontena, ili ipate bila uharibifu wa kushughulishia.",
      s5Title: "Hakiki za patenti na hadhi ya bidhaa inayopendekezwa",
      s5Text: "Timu yetu ya utafiti ina patenti za manufaa ya taifa, na matrekta yetu makuu ya 4WD yameandikwa na mamlaka ya mashine za kilimo ya China kama Bidhaa ya Kilimo Inayopendekezwa na Taifa. Taaruma za cheti zinapatikana pale mtu atakapoziomba.",
      capShowroom: "Onyesho la bidhaa",
      capAssembly: "Uusambazi wa utengenezaji",
      capPacking: "Ukaguzi wa ubora na upackaji",
      cta: "Tuambie ukubwa wa ploti yako na tutakupendekeza modeli inayofaa",
      full: "Angalia picha kamili"
    },
    hero: {
      title: "Mashine za Kilimo Moja kwa Moja kutoka Kiwanda",
      sub: "Matrekta · Vifaa vya mifuko · Pampu za maji. Zinazozalishwa na kiwanda chetu mwenyewe — bei moja kwa moja na uwezo wa uzalishaji thabiti.",
      cta1: "Tazama Bidhaa",
      cta2: "Tuma Uchunguzi",
      stat1: { num: "15+", label: "Miaka ya Uzalishaji" },
      stat2: { num: "30+", label: "Mifano ya Bidhaa" },
      stat3: { num: "1", label: "Kiwanda chetu" }
    },
    about: {
      title: "Kuhusu Sisi",
      lead: "Liuzhou Haogeng International Trade Co., Ltd. (Haogeng) ndiye mkono wa nje wa mauzo wa Guigeng Agricultural Machinery. Kama kampuni ya mauzo ya kimataifa ya chapa hii, tunafanya kazi moja kwa moja na kiwanda chetu mwenyewe — tukitoa wateja wa nje bei ya kweli ya moja kwa moja kutoka kiwanda na ugavi unaotegemewa.",
      c1: { title: "Kampuni Moja, Inayoungwa mkono na Kiwanda", text: "Tunaunganisha utengenezaji na biashara ya kimataifa. Unachopokea hapa ni mashine zinazotoka moja kwa moja kiwandani wetu: modeli zote tunazoziia zinatengenezwa na Guangxi Lichuang Machinery. Hatuizi mashine kutoka kwa viwanda vingine kuzibadilisha jina na kuziuza kama zilivyotengenezwa na sisi." },
      c2: { title: "Teknolojia Iliyopata Hataza", text: "Timu yetu ya R&D ina hataza za kitaifa za muundo wa vitendo, na trekta yetu ya 4WD inayoongoza imeorodheshwa na mamlaka ya mashine za kilimo ya China kama Bidhaa ya Kilimo ya Taifa Inayopendekezwa. Vyeti vinapatikana kwa ombi." },
      c3: { title: "Vifaa vya Kisasa", text: "Kukata kwa laser ya CNC, kupinda kwa CNC, kukata kwa mabomba kwa laser na mistari ya kulehemu kwa laser vinahakikisha usahihi, uimara na kumaliza thabiti." }
    },
    products: {
      title: "Bidhaa Zetu",
      lead: "Mistari mitatu kuu ya bidhaa. OEM/ODM maalum inapatikana — tuambie soko lako na mahitaji.",
      filter: { all: "Zote", tiller: "Matrekta", ditching: "Vifaa vya Mifuko", pump: "Pampu za Maji" },
      inquire: "Tuma Uchunguzi",
      detail: {
        back: "← Rudi kwa Bidhaa",
        description: "Muhtasari",
        bestFor: "Inafaa Kwa",
        features: "Sifa",
        specs: "Vipimo",
        getQuote: "Omba Bei Sasa",
        copyInquiry: "Nakili Uchunguzi",
        copy: "Nakili",
        whatsapp: "WhatsApp",
        email: "Barua pepe",
        contactSection: "Tuambie mahitaji yako na tutajibu ndani ya masaa 24.",
        accessories: {
          title: "Kile Kilichomo ndani ya Sanduku",
          subtitle: "Vifaa vyote vilivyoonyeshwa hapa chini vinajumuishwa BURE unaponunua mashine hii — tayari kutumika moja kwa moja toka kwenye sanduku.",
          item1: { name: "Seti ya Magurudumu ya Shamba la Mchele", qty: "Seti 1", desc: "Magurudumu mapana ya mapepe yaliyoundwa kwa mashamba laini, yaliyolowana ya mchele. Yanaingia moja kwa moja kwenye mhimili wa rotor mahali pa mato ya nchi kavu wakati wa kufanya kazi katika hali mvua." },
          item2: { name: "Seti ya Mato yasiyozungushwa na Magugu", qty: "Seti 1", desc: "Mato yaliyopinda yaliyoundwa kupinga kuzungushwa kwa magugu na mimea ya kutambaa. Jiometri iliyochongoka inazuia nyasi za juu na mabaki ya mazao kuzunguka rotor wakati wa kulima nzito." },
          item3: { name: "Seti ya Tairi za Mpira", qty: "Seti 1", desc: "Magurudumu ya usafirishaji ya mpira yenye mfumo wa kukanyaga, vichwa vya chuma na tundu la mhimili mraba. Yanaingizwa unapohitaji kuviringisha mashine kati ya mazao bila kuchubua ardhi." },
          item4: { name: "Seti ya Mato ya Nchi Kavu", qty: "Seti 1", desc: "Mato ya rotary ya H yaliyokolezwa kwa kuvunja udongo mgumu, kavu. Yamekusanywa tayari kwenye fremu ya cage, tayari kufungwa kwenye mhimili wa rotor moja kwa moja toka kwenye sanduku." }
        }
      }
    },
    why: {
      title: "Kwa Nini Utuchague",
      w1: { title: "Bei ya Moja kwa Moja kutoka Kiwanda", text: "Hakuna mawakala wa kati — unanunua moja kwa moja kutoka kwa mtengenezaji." },
      w2: { title: "OEM / ODM", text: "Chapa, rangi na vipimo vilivyobinafsishwa kwa soko lako." },
      w3: { title: "Udhibiti wa Ubora", text: "Udhibiti mkali wa ubora kwa kila kitengo kabla ya kusafirishwa, kudumu shambani." },
      w4: { title: "Utoaji Unaotegemewa", text: "Uwezo thabiti wa uzalishaji unahakikisha utoaji kwa wakati." },
      w5: { title: "Uzoefu wa Usafirishaji", text: "Tumia kwa Asia ya Kusini-mashariki, India na Sri Lanka — matrekta madogo 300 yaliyotumwa Sri Lanka katika mwaka mmoja, kwa msaada kamili wa nyaraka za uagizaji." },
      w6: { title: "Huduma Baada ya Kuuza", text: "Vipuri na msaada wa kiufundi unapatikana kwa mifano yote." }
    },
    contact: {
      title: "Wasiliana Nasi",
      lead: "Tuma uchunguzi wako — tunajibu ndani ya masaa 24.",
      label: { phone: "Simu / WhatsApp", email: "Barua pepe", addr: "Anwani" },
      addr: "No. 86, Liugong Avenue, Liunan District, Liuzhou City, Guangxi, China",
      form: { name: "Jina lako", email: "Barua pepe yako", country: "Nchi yako", message: "Ujumbe (bidhaa, kiasi, bandari ya marudio...)", submit: "Tuma Uchunguzi", note: "Fomu hii inafungua mteja wako wa barua pepe. Kwa jibu la haraka zaidi, tutumie barua pepe moja kwa moja." }
    },
    inquiry: {
      modal: { title: "Chagua jinsi ya kutuma uchunguzi wako", wa: "Haraka zaidi · Inapendekezwa", mail: "Barua pepe", mailSub: "Inafungua mteja wako wa barua pepe", copy: "Nakili Uchunguzi", copySub: "Bandika mahali popote", webmail: "Barua pepe hafunguli? Jaribu toleo la Mtandao:", copied: "✓ Maandishi ya ombi umecopiwa — bandika popote kuchapisha" }
    },
    footer: { rights: "Haki zote zimehifadhiwa." },
    news: {
      title: "Katika Habari",
      source: "Idara ya Kilimo na Mambo ya Vijijini Guangxi · Gazeti la Liuzhou · 2025-02-24",
      headline: "\"Kuharakisha Uzalishaji Kusaidia Kulima Kwa Masika\"",
      intro: "Baada ya kipindi cha jua la Rain Water, wakati mashamba yamejaa kazi ya kulima masika, uzalishaji wa mashine za kilimo pia uko katika kasi kamili. Tarehe 19 Februari, waandishi wa habari walitembelea mtengenezaji wa mashine za kilimo katika Liugong Avenue na kuona mistari ya uzalishaji ikifanya kazi kwa uwezo kamili kuharakisha matrekta madogo kwa kulima kwa masika.",
      quote: "\"Meneja Mkuu Wu, ni lini mzigo wetu unaweza kutumwa?\" Asubuhi hiyo, Bw. Zeng, mfanyabiashara wa mashine za kilimo kutoka Hunan, alikuja Guangxi Lichuang Machinery Manufacturing Co., Ltd. kuchukua bidhaa. \"Kipindi cha kulima masika ni msimu wa kilele wa mauzo, kwa hivyo tulitimbuka kuja Liuzhou kuchukua bidhaa.\" Mkuu wa kampuni Wu Siyu alijibu: \"Tunaharakisha uzalishaji — chochote tulichokuwa tukiwa nacho, tutakitumia kwanza.\" Mara moja alipanga utoaji wa lori.",
      factory: "Lichuang Machinery inajishughulisha kwa uzalishaji na maendeleo ya matrekta madogo mapya ya 4WD, mashine za usimamizi wa shamba, na vifaa vya mifuko. Wu Siyu alieleza kwamba trekta ndogo ya 4WD ya mbele ya rotary ya Guigeng imeundwa kwa maeneo ya vilima na milima yenye mazao madogo na tofauti kubwa za mwinuko. Ni nyepesi, ndogo, yenye nguvu, na rahisi kufanya kazi — bora kwa maeneo ya kusini na bidhaa inayouzwa zaidi ya mashine za kilimo wakati wa kipindi cha kulima masika. Mbali na kuhudumia soko la ndani, bidhaa pia zinauzwa kwa Hunan, Jiangxi, Hainan, na Hubei.",
      capacity: "Katika karakana ya uzalishaji, wafanyakazi walikuwa busy wakikusanya vipuri kwenye mstari wa uzalishaji. Mashine iliposhuka kwenye mstari, ilipata ukaguzi wa ubora, kufungashwa, na kusubiri kusafirishwa. \"Tulianza kazi siku ya nne ya Mwaka Mpya wa Lunar. Sasa mistari miwili ya uzalishaji inafanya kazi kwa uwezo kamili, ikizalisha matrekta madogo takriban 130 kwa siku,\" Wu alisema. Hata hivyo, hii haiwezi bado kutimiza mahitaji ya sasa ya oda. Mwezi ujao, kampuni itafungua mstari mpya wa uzalishaji wa mashine kubwa za kilimo za magurudumu manne ili kuongeza uwezo.",
      export: "Miaka ya hivi karibuni, Lichuang Machinery imeshika fursa kutoka kwa Mkakati wa Belt and Road, ikisafirisha bidhaa kwa masoko ya Asia ya Kusini-mashariki. Wu alisema matrekta madogo pia ni maarufu sana katika India, Vietnam, na masoko mengine. Mwaka jana, kampuni ilisafirisha matrekta madogo 300 hadi Sri Lanka. Mwaka huu wataangalia zaidi uwezekano wa soko la Asia ya Kusini-mashariki na kuendeleza mashine za kuvuna areca kulingana na mahitaji ya kilimo ya eneo hilo, kuboresha ushindani katika masoko ya Asia ya Kusini-mashariki.",
      h1: { num: "300", label: "Vifaa vilivyotumwa Sri Lanka" },
      h2: { num: "130", label: "Vifaa kwa Siku Uwezo" },
      h3: { num: "2", label: "Mistari ya Uzalishaji kwa Uwezo Kamili" }
    }
  }
};

// 当前语言（默认英文）
let currentLang = 'en';

function setLang(lang) {
  if (!I18N[lang]) lang = 'en';
  currentLang = lang;
  try { window.currentLang = lang; } catch(e) {}
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
  // 通知详情页等需要重新渲染的组件
  document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: lang } }));
}

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

// 供产品模块使用
function t(key) {
  return getByPath(I18N[currentLang], key);
}

;try { window.I18N = I18N; } catch(e) {}
;try { if (typeof t === "function") window.t = t; } catch(e) {}
;try { if (typeof setLang === "function") window.setLang = setLang; } catch(e) {}
;try { window.currentLang = currentLang; } catch(e) {}
