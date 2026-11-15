/* =========================================================
   articles.js — P2 内容（选型指南 / 对比页 / 使用维护 / FAQ）
   ---------------------------------------------------------
   生成器 scripts/build-static.js 会读这个文件，生成：
     /{lang}/guides.html              指南索引页
     /{lang}/guide/{slug}.html        单篇文章
     /{lang}/faq.html                 汇总 FAQ 页

   ★ 结构约定（跟 js/products.js 保持一致的写法）：

   var ARTICLES = [
     {
       slug: 'how-to-choose-a-micro-tiller',   // 全语种共用（英文小写连字符），URL 一旦上线不能改
       cat: 'tiller',                          // 关联品类 tiller / ditching / pump（用于自动内链）
       date: '2026-11-20',                     // 发布日期（Article schema 用）
       img: 'guide-choose-tiller.jpg',         // 首图（放 images/，Article 缺图会被降权）
       title: { en: '...', sw: '...', fr: '...' },
       desc:  { en: '...' },                   // meta description（英文约 150 字符）
       body:  { en: '## 标题\n\n段落...' },
       faq:   [ { q: { en: '...' }, a: { en: '...' } } ]   // 可选，会渲染成 FAQPage
     }
   ];

   ★ body 支持的写法（极简 Markdown）：
     ## 二级标题      ### 三级标题      - 列表项      空行分段
     **加粗**          [文字](链接)
     [[model:1WG-4.05A]]            → 自动链到该型号的产品页（当前语种）
     [[cat:ditching|文字]]           → 链到品类页（跨语种自动改路径）
     [[home|文字]]                   → 链到首页联系区（跨语种自动改路径）

   ⚠️ 站内链接一律用上面三种占位符写，不要硬写 /en/... 路径 ——
      翻译成别的语种时硬编码路径会指到错的页面。

   ★★ 参数占位符（重点）：不要手写机型参数！
     {{spec:1WG-4.05A:Rated power}}   → 生成器从 js/products.js 取真实值
     生成器会在报告里列出「引用了不存在的型号 / 参数项」，写错立刻暴露。
     可用的字段名 = 参数表每一行的冒号前部分，例如：
       Engine / Transmission / Displacement / Rated power / Working width /
       Working depth / Gearbox / Clutch / Blades / Net weight / Fuel tank /
       Starting / Dimensions / Warranty
     （中文参数表的字段名是中文，{{spec:型号:额定功率}} 也能取到）

   ⚠️ 不要在这里写：价格、交货期、付款方式、客户证言、出口数据、认证状态。
      这些只有老板有真话才写，或者干脆不写。
   ========================================================= */

var ARTICLES = [
  {
    slug: 'how-to-choose-a-micro-tiller',
    cat: 'tiller',
    date: '2026-11-14',
    img: 'news-showroom.jpg',
    title: {
      en: 'How to Choose a Micro Tiller for Small Farms'
    },
    desc: {
      en: 'Working width, engine size and fuel type decide which micro tiller fits your plot. Here is how to match our models to your land, your crop and your working day.'
    },
    body: {
      en: [
        '## Start with three questions about the land',
        '',
        'Most buyers start by comparing horsepower, and end up over- or under-buying. The three questions below narrow the range faster than any specification table.',
        '',
        '### How much ground do you need to cover in one pass?',
        '',
        'Working width is the number that decides how long a job takes. On our machines the working width is given as an adjustable range rather than a single fixed figure.',
        '',
        '- **600-900 mm** — comfortable between vegetable rows, in a garden plot, or between orchard rows.',
        '- **800-1050 mm** — the common size for smallholder plots worked from one end to the other.',
        '- **900-1200 mm** — for open ground where the priority is covering area per hour.',
        '',
        'For comparison, the entry model [[model:1WG-4.0AQ]] tills {{spec:1WG-4.0AQ:Working width}} at a depth of {{spec:1WG-4.0AQ:Working depth}}, while the widest diesel machine in the range, [[model:1WG-6.3A]], works {{spec:1WG-6.3A:Working width}}. Neither is "better" — they are sized for different plots.',
        '',
        '### What are you actually growing?',
        '',
        'The same machine behaves differently depending on the crop and the soil:',
        '',
        '- **Seedbed preparation** for vegetables — a shallow, adjustable depth matters more than power.',
        '- **Inter-row cultivation** in orchards and vineyards — a narrower frame and a controllable handle matter more than width.',
        '- **Row crops and heavy soil** — the diesel models are built for this, because compression-ignition engines hold speed under load and the ductile-iron gearbox takes sustained work.',
        '',
        '### Where will the fuel come from?',
        '',
        'This is the question that decides petrol versus diesel, and it is not a technical one. Choose the fuel you can actually buy in your market, and then the machine size that follows from your plot.',
        '',
        '## Petrol or diesel: the trade-off in plain terms',
        '',
        'Our petrol machines are lighter and cheaper to buy. Our diesel machines weigh more, but the engine is compression-ignition, which means lower fuel consumption and steadier output under load. On the 170cc diesel [[model:1WG-4.0A]] the fuel tank holds {{spec:1WG-4.0A:Fuel tank}} and the machine itself weighs {{spec:1WG-4.0A:Net weight}}. On the 170cc petrol [[model:1WG-4.0AQ]] the tank is {{spec:1WG-4.0AQ:Fuel tank}} and the machine weighs only {{spec:1WG-4.0AQ:Net weight}} — a difference you feel every time you load it into a pickup.',
        '',
        'Both are air-cooled, single-cylinder, four-stroke or two-stroke engines. Most models start by manual recoil, so they need no battery and can be started in the field without tools; the 186 Tiger [[model:1WG-6.3B-T]] adds electric starting on top of the recoil starter.',
        '',
        '## Engine size: what actually changes between 170 and 186 cc',
        '',
        'Displacement is the honest way to compare these machines, because it tells you how much work the engine can do before it has to labour:',
        '',
        '- **170cc** — {{spec:1WG-4.0A:Rated power}} on the diesel version, {{spec:1WG-4.0AQ:Rated power}} on the petrol version. Enough for gardens, vegetable plots and orchard rows.',
        '- **173cc** — {{spec:1WG-4.05A:Rated power}} on the diesel [[model:1WG-4.05A]], {{spec:1WG-4.05B:Rated power}} on the petrol [[model:1WG-4.05B]]. A common middle size in our range.',
        '- **178cc** — {{spec:1WG-4.1A:Rated power}} on the diesel [[model:1WG-4.1A]].',
        '- **186cc** — {{spec:1WG-6.3A:Rated power}} on the diesel [[model:1WG-6.3A]], working {{spec:1WG-6.3A:Working width}}. This is the machine for open fields and daily commercial work.',
        '',
        'All of them share the same heavy-duty construction: a ductile-iron gearbox with two forward gears and one reverse, a friction-plate clutch, and 24 dryland rotary blades in 3+1 groups. The gearbox is the part that decides how long the machine survives daily work, and it is the same design across the range.',
        '',
        '## One machine, several jobs',
        '',
        'Every tiller in the range is compatible with a ridger and a ditcher. Depending on the model, the same frame also takes a potato digger, a water pump or a trailer. If your season includes ridging rows or cutting drainage channels, that is usually a cheaper way to cover the work than buying a second machine.',
        '',
        'If your work is mostly canal and drainage maintenance rather than soil preparation, have a look at our [[cat:ditching|ditching machines]] — they are built around that job rather than around the tiller frame.',
        '',
        '## What to check before you order',
        '',
        '- **Frame width against your rows.** Measure the distance between planted rows and add clearance.',
        '- **Fuel availability.** Look up what your local market actually stocks before choosing the engine.',
        '- **Transport.** Check the machine weight against what you can load and unload. Our smallest petrol tiller is {{spec:1WG-4.0AQ:Net weight}}; the heaviest diesel tiller in the range is {{spec:1WG-6.3B-T:Net weight}}.',
        '- **Working depth.** All models are adjustable, but the useful range differs — check the depth specification against your soil.',
        '',
        '## Warranty and parts',
        '',
        'Every machine in the range carries a {{spec:1WG-4.05A:Warranty}} warranty. The range is built to a common design, so consumables and wear parts are shared across models.',
        '',
        'If you tell us the model, the fuel and the crop, we can put together a specific recommendation and a quotation — [[home|send us an inquiry]].'
      ].join('\n')
    },
    faq: [
      {
        q: { en: 'What is the difference between a micro tiller and a walking tractor?' },
        a: { en: 'A micro tiller is a single-operator machine with a compact frame and rotary blades; it is carried or guided by the operator while walking behind it. A walking tractor is a larger, ride-on or walk-behind unit with a full transmission and a working width measured in metres rather than millimetres. For plots up to a couple of hectares a micro tiller is the usual choice.' }
      },
      {
        q: { en: 'Can one micro tiller both till the soil and cut drainage channels?' },
        a: { en: 'Yes. The tiller frame accepts a ridger and a ditcher, and on some models a potato digger, a water pump or a trailer as well, so one machine can cover seedbed preparation, row ridging and channel cutting.' }
      },
      {
        q: { en: 'Do I need a battery to start the machine?' },
        a: { en: 'Almost never. Most models in our range use manual recoil starting only, so there is no battery or electric starter to maintain in the field. The 186 Tiger model adds electric starting alongside the recoil starter.' }
      },
      {
        q: { en: 'How deep can these machines dig?' },
        a: { en: 'Working depth is adjustable on every model. For example the 173cc diesel 1WG-4.05A works at {{spec:1WG-4.05A:Working depth}}, and the 170cc petrol 1WG-4.0AQ at {{spec:1WG-4.0AQ:Working depth}}.' }
      },
      {
        q: { en: 'Which model should I choose for a plot of about one hectare?' },
        a: { en: 'For roughly one hectare, a 173cc or 178cc machine with an 800-1050 mm working width covers ground quickly while staying easy to handle. The 170cc models are the lighter option for garden-scale work; the 186cc models suit open ground and daily commercial use.' }
      },
      {
        q: { en: 'What warranty do the machines carry?' },
        a: { en: 'Every machine carries a {{spec:1WG-4.05A:Warranty}} warranty, the same across the range.' }
      }
    ]
  }
  /* 内容稿待续 —— 结构见上面的说明 */
];
