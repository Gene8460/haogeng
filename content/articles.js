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
    "slug": "how-to-choose-a-micro-tiller",
    "cat": "tiller",
    "date": "2026-11-15",
    "img": "tiller-001.jpg",
    "title": {
      "en": "How to Choose a Micro Tiller for Small Farms"
    },
    "desc": {
      "en": "Working width, engine size and fuel type decide which micro tiller fits your plot. Here is how to match our models to your land, your crop and your working day."
    },
    "body": {
      "en": "## Start with three questions about the land\n\nMost buyers start by comparing horsepower, and end up over- or under-buying. The three questions below narrow the range faster than any specification table.\n\n### How much ground do you need to cover in one pass?\n\nWorking width is the number that decides how long a job takes. On our machines the working width is given as an adjustable range rather than a single fixed figure.\n\n- **600-900 mm** — comfortable between vegetable rows, in a garden plot, or between orchard rows.\n- **800-1050 mm** — the common size for smallholder plots worked from one end to the other.\n- **900-1200 mm** — for open ground where the priority is covering area per hour.\n\nFor comparison, the entry model [[model:1WG-4.0AQ]] tills {{spec:1WG-4.0AQ:Working width}} at a depth of {{spec:1WG-4.0AQ:Working depth}}, while the widest diesel machine in the range, [[model:1WG-6.3A]], works {{spec:1WG-6.3A:Working width}}. Neither is \"better\" — they are sized for different plots.\n\n### What are you actually growing?\n\nThe same machine behaves differently depending on the crop and the soil:\n\n- **Seedbed preparation** for vegetables — a shallow, adjustable depth matters more than power.\n- **Inter-row cultivation** in orchards and vineyards — a narrower frame and a controllable handle matter more than width.\n- **Row crops and heavy soil** — the diesel models are built for this, because compression-ignition engines hold speed under load and the ductile-iron gearbox takes sustained work.\n\n### Where will the fuel come from?\n\nThis is the question that decides petrol versus diesel, and it is not a technical one. Choose the fuel you can actually buy in your market, and then the machine size that follows from your plot.\n\n## Petrol or diesel: the trade-off in plain terms\n\nOur petrol machines are lighter and cheaper to buy. Our diesel machines weigh more, but the engine is compression-ignition, which means lower fuel consumption and steadier output under load. On the 170cc diesel [[model:1WG-4.0A]] the fuel tank holds {{spec:1WG-4.0A:Fuel tank}} and the machine itself weighs {{spec:1WG-4.0A:Net weight}}. On the 170cc petrol [[model:1WG-4.0AQ]] the tank is {{spec:1WG-4.0AQ:Fuel tank}} and the machine weighs only {{spec:1WG-4.0AQ:Net weight}} — a difference you feel every time you load it into a pickup.\n\nBoth are air-cooled, single-cylinder, four-stroke or two-stroke engines. Most models start by manual recoil, so they need no battery and can be started in the field without tools; the 186 Tiger [[model:1WG-6.3B-T]] adds electric starting on top of the recoil starter.\n\n## Engine size: what actually changes between 170 and 186 cc\n\nDisplacement is the honest way to compare these machines, because it tells you how much work the engine can do before it has to labour:\n\n- **170cc** — {{spec:1WG-4.0A:Rated power}} on the diesel version, {{spec:1WG-4.0AQ:Rated power}} on the petrol version. Enough for gardens, vegetable plots and orchard rows.\n- **173cc** — {{spec:1WG-4.05A:Rated power}} on the diesel [[model:1WG-4.05A]], {{spec:1WG-4.05B:Rated power}} on the petrol [[model:1WG-4.05B]]. A common middle size in our range.\n- **178cc** — {{spec:1WG-4.1A:Rated power}} on the diesel [[model:1WG-4.1A]].\n- **186cc** — {{spec:1WG-6.3A:Rated power}} on the diesel [[model:1WG-6.3A]], working {{spec:1WG-6.3A:Working width}}. This is the machine for open fields and daily commercial work.\n\nAll of them share the same heavy-duty construction: a ductile-iron gearbox with two forward gears and one reverse, a friction-plate clutch, and 24 dryland rotary blades in 3+1 groups. The gearbox is the part that decides how long the machine survives daily work, and it is the same design across the range.\n\n## One machine, several jobs\n\nEvery tiller in the range is compatible with a ridger and a ditcher. Depending on the model, the same frame also takes a potato digger, a water pump or a trailer. If your season includes ridging rows or cutting drainage channels, that is usually a cheaper way to cover the work than buying a second machine.\n\nIf your work is mostly canal and drainage maintenance rather than soil preparation, have a look at our [[cat:ditching|ditching machines]] — they are built around that job rather than around the tiller frame.\n\n## What to check before you order\n\n- **Frame width against your rows.** Measure the distance between planted rows and add clearance.\n- **Fuel availability.** Look up what your local market actually stocks before choosing the engine.\n- **Transport.** Check the machine weight against what you can load and unload. Our smallest petrol tiller is {{spec:1WG-4.0AQ:Net weight}}; the heaviest diesel tiller in the range is {{spec:1WG-6.3B-T:Net weight}}.\n- **Working depth.** All models are adjustable, but the useful range differs — check the depth specification against your soil.\n\n## Warranty and parts\n\nEvery machine in the range carries a {{spec:1WG-4.05A:Warranty}} warranty. The range is built to a common design, so consumables and wear parts are shared across models.\n\nIf you tell us the model, the fuel and the crop, we can put together a specific recommendation and a quotation — [[home|send us an inquiry]]."
    },
    "faq": [
      {
        "q": {
          "en": "What is the difference between a micro tiller and a walking tractor?"
        },
        "a": {
          "en": "A micro tiller is a single-operator machine with a compact frame and rotary blades; it is carried or guided by the operator while walking behind it. A walking tractor is a larger, ride-on or walk-behind unit with a full transmission and a working width measured in metres rather than millimetres. For plots up to a couple of hectares a micro tiller is the usual choice."
        }
      },
      {
        "q": {
          "en": "Can one micro tiller both till the soil and cut drainage channels?"
        },
        "a": {
          "en": "Yes. The tiller frame accepts a ridger and a ditcher, and on some models a potato digger, a water pump or a trailer as well, so one machine can cover seedbed preparation, row ridging and channel cutting."
        }
      },
      {
        "q": {
          "en": "Do I need a battery to start the machine?"
        },
        "a": {
          "en": "Almost never. Most models in our range use manual recoil starting only, so there is no battery or electric starter to maintain in the field. The 186 Tiger model adds electric starting alongside the recoil starter."
        }
      },
      {
        "q": {
          "en": "How deep can these machines dig?"
        },
        "a": {
          "en": "Working depth is adjustable on every model. For example the 173cc diesel 1WG-4.05A works at {{spec:1WG-4.05A:Working depth}}, and the 170cc petrol 1WG-4.0AQ at {{spec:1WG-4.0AQ:Working depth}}."
        }
      },
      {
        "q": {
          "en": "Which model should I choose for a plot of about one hectare?"
        },
        "a": {
          "en": "For roughly one hectare, a 173cc or 178cc machine with an 800-1050 mm working width covers ground quickly while staying easy to handle. The 170cc models are the lighter option for garden-scale work; the 186cc models suit open ground and daily commercial use."
        }
      },
      {
        "q": {
          "en": "What warranty do the machines carry?"
        },
        "a": {
          "en": "Every machine carries a {{spec:1WG-4.05A:Warranty}} warranty, the same across the range."
        }
      }
    ]
  },
  {
    "slug": "gasoline-vs-diesel-micro-tiller",
    "cat": "tiller",
    "date": "2026-11-15",
    "img": "tiller-002.jpg",
    "title": {
      "en": "Gasoline vs Diesel Micro Tiller: Which One to Buy"
    },
    "desc": {
      "en": "Petrol is lighter and easier to start; diesel holds speed under load and burns less fuel per hour of work. How the two fuel types differ in our micro tiller range."
    },
    "body": {
      "en": "## The decision that matters before size\n\nDisplacement gets all the attention, but the fuel type decides more about your day than the horsepower does. It decides what you can buy at the pump, what you carry down to the field, how the engine behaves when the soil is wet, and what the machine costs to keep running for a season. Only after that does engine size matter.\n\nOur range covers both, in the same frame family: the petrol machines are the 170cc and 173cc models, the diesel machines run from 170cc up to 186cc. The [[cat:tiller|micro tiller category page]] lists every model with its full specification.\n\n### What actually changes when you switch from petrol to diesel\n\nA petrol engine in these machines is a small, light four-stroke or two-stroke unit with a simple carburettor and a magneto. A diesel engine is compression-ignition: the fuel is compressed hard enough to ignite on its own, which removes the spark plug and gives the engine a different character under load.\n\nThe practical consequences:\n\n- **Weight.** A diesel engine of the same class is heavier. The 170cc petrol [[model:1WG-4.0AQ]] weighs {{spec:1WG-4.0AQ:Net weight}}, while the 170cc diesel [[model:1WG-4.0A]] weighs {{spec:1WG-4.0A:Net weight}}. The difference matters when one person loads the machine into a pickup or carries it over a bund.\n- **Starting.** Both types are air-cooled single-cylinder engines and both start by hand on most models. Diesel engines are more forgiving of slow cranking in the cold, and the 186cc Tiger [[model:1WG-6.3B-T]] adds electric starting on top of the recoil starter for anyone working at first light.\n- **Behaviour under load.** A compression-ignition engine holds its speed when the blades hit a wet strip or a root, because it does not depend on the spark staying strong as the RPM drops. In a hard, wet field that is the difference between finishing the row and stopping to clear the tines.\n- **Running cost.** A diesel engine generally burns less fuel for the same amount of work, and diesel is often cheaper per litre in agricultural markets. This is the calculation that decides the answer for anyone running a machine every day of the season.\n\n### Where petrol wins\n\nPetrol makes sense when the machine is used intermittently, when the work is light, and when petrol is what is actually available. A market with no diesel supply, or a customer who only wants the machine for a few hours a week, is served better by the petrol range. The 170cc petrol [[model:1WG-4.0AQ]] delivers {{spec:1WG-4.0AQ:Rated power}} and starts by manual recoil, so it needs no battery and no tools in the field. The 173cc petrol [[model:1WG-4.05B]] is the step up, at {{spec:1WG-4.05B:Rated power}} and {{spec:1WG-4.05B:Working width}}.\n\nPetrol is also the easier fuel to store and move. A jerrycan of petrol is something almost every farm already has, and a petrol machine can sit for weeks between uses without the fuel system being a concern.\n\n### Where diesel wins\n\nDiesel is the right answer for daily work, heavy soil, and long seasons. The 178cc diesel [[model:1WG-4.1A]] gives {{spec:1WG-4.1A:Rated power}} at {{spec:1WG-4.1A:Working width}} and {{spec:1WG-4.1A:Working depth}}, on a frame weighing {{spec:1WG-4.1A:Net weight}}. The 186cc diesel [[model:1WG-6.3A]] is the open-field machine: {{spec:1WG-6.3A:Rated power}}, {{spec:1WG-6.3A:Working width}}, and {{spec:1WG-6.3A:Working depth}}.\n\nBoth diesel sizes keep the same construction as the rest of the range: a ductile-iron gearbox with two forward gears and one reverse, a friction-plate clutch, and 24 dryland rotary blades in 3+1 groups. That gearbox is the part that carries the daily work, and it is the reason a heavier machine is not a bad trade in a field that is worked every day.\n\n### A simple way to decide\n\nAsk three questions in order.\n\n1. **Can I buy diesel where I am?** If the answer is no or uncertain, the question is settled — take the petrol machine.\n2. **How many hours a day?** Under a few hours a week, petrol. Every day through the season, diesel.\n3. **What am I carrying?** If the machine has to be loaded into a vehicle by one or two people and carried over uneven ground, the 27 kg difference between the 170cc petrol and diesel models decides it.\n\nIf you are still undecided, tell us your crop, your plot size and what fuel is available in your market, and we will tell you which model we would put on that ground ourselves. Start from the [[home|home page]] or go straight to the [[cat:tiller|full tiller range]].\n\nEvery machine in the range carries a {{spec:1WG-4.0AQ:Warranty}} warranty, and the construction is common across petrol and diesel versions, so wear parts and consumables are shared."
    },
    "faq": [
      {
        "q": {
          "en": "Is a diesel micro tiller always more economical?"
        },
        "a": {
          "en": "A diesel engine generally burns less fuel for the same amount of work and diesel is often cheaper per litre in agricultural markets, so running cost usually favours diesel. The petrol machines still win on purchase price and on weight."
        }
      },
      {
        "q": {
          "en": "Can I convert a petrol micro tiller to diesel?"
        },
        "a": {
          "en": "No. The engine mounting, fuel tank, fuel lines and drive are all dimensioned for one fuel type, and a conversion is not something we support."
        }
      },
      {
        "q": {
          "en": "Which is lighter, the petrol or the diesel tiller?"
        },
        "a": {
          "en": "The petrol models. The 170cc petrol 1WG-4.0AQ weighs {{spec:1WG-4.0AQ:Net weight}}, while the 170cc diesel 1WG-4.0A weighs {{spec:1WG-4.0A:Net weight}}. The gap narrows on the larger frames but never reverses."
        }
      },
      {
        "q": {
          "en": "Does a diesel tiller pull harder in wet soil?"
        },
        "a": {
          "en": "A compression-ignition diesel engine holds its speed when the blades meet resistance, because it does not depend on a spark as the rpm falls. In wet or heavy ground that is the difference between finishing a row and stopping to clear the tines."
        }
      },
      {
        "q": {
          "en": "Do your diesel tillers have electric starting?"
        },
        "a": {
          "en": "Most start by manual recoil. The 186cc Tiger 1WG-6.3B-T adds electric starting on top of the recoil starter."
        }
      },
      {
        "q": {
          "en": "Which fuel should a smallholder choose?"
        },
        "a": {
          "en": "Choose the fuel that is available and affordable, then the size that fits the plot. The 170cc petrol 1WG-4.0AQ at {{spec:1WG-4.0AQ:Net weight}} is the easiest to move by hand; the 178cc diesel 1WG-4.1A is the better daily machine."
        }
      },
      {
        "q": {
          "en": "Do petrol and diesel tillers share the same gearbox?"
        },
        "a": {
          "en": "Yes. Every tiller in the range uses a ductile-iron gearbox with two forward gears and one reverse and a friction-plate clutch, so wear parts are shared across the fuel types."
        }
      },
      {
        "q": {
          "en": "Do you build ditching machines and pumps in both fuel types too?"
        },
        "a": {
          "en": "Yes. Our ditching machines and our water pumps cover petrol and diesel variants, because the fuel available differs from one market to the next."
        }
      }
    ]
  },
  {
    "slug": "170-vs-173-vs-178-vs-186-micro-tiller",
    "cat": "tiller",
    "date": "2026-11-15",
    "img": "tiller-009.jpg",
    "title": {
      "en": "170 vs 173 vs 178 vs 186 cc Micro Tiller: Which Size to Buy"
    },
    "desc": {
      "en": "Engine displacement sizes the machine, but working width, weight and fuel type decide what it is good for. Compare the 170, 173, 178 and 186 cc tillers in our range."
    },
    "body": {
      "en": "## Displacement is the number that actually sizes the machine\n\nBuyers often compare machines by the number printed on the box and stop there. That number — 170, 173, 178, 186 — is engine displacement in cubic centimetres, and it is a good proxy for how much work the engine can do before it has to labour. It is not, however, the whole specification. Working width, machine weight and fuel type change what a given displacement is good for.\n\nThis guide compares the four sizes in our range so that a distributor can put the right machine on the right order, and a farmer can see why the machine next to the one being demonstrated is either worth the extra money or not.\n\n### 170 cc — the entry size\n\nThe 170cc machines are the lightest in the range and the easiest to move by hand. The petrol 170 Gasoline Micro Tiller [[model:1WG-4.0AQ]] delivers {{spec:1WG-4.0AQ:Rated power}}, works {{spec:1WG-4.0AQ:Working width}}, and weighs {{spec:1WG-4.0AQ:Net weight}}. The diesel counterpart [[model:1WG-4.0A]] gives {{spec:1WG-4.0A:Rated power}} over {{spec:1WG-4.0A:Working width}}, on {{spec:1WG-4.0A:Net weight}}.\n\nA 170cc machine is the right answer for vegetable plots, garden work, orchard rows and any land where the machine has to be carried rather than driven. It is also the cheapest machine in the range to move in a pickup and the easiest to service.\n\n### 173 cc — the middle size\n\nThe 173cc diesel [[model:1WG-4.05A]] is rated at {{spec:1WG-4.05A:Rated power}} with a {{spec:1WG-4.05A:Working width}} frame, and the Pro version [[model:1WG-4.05A Pro]] raises that to {{spec:1WG-4.05A Pro:Rated power}} with a slightly heavier frame at {{spec:1WG-4.05A Pro:Net weight}}. The petrol 173 [[model:1WG-4.05B]] sits at {{spec:1WG-4.05B:Rated power}} and weighs {{spec:1WG-4.05B:Net weight}}.\n\nNote that 173cc is a middle specification rather than a headline one. If you are building a range, the sizes that open the most doors in most agricultural markets are the 170, the 178 and the 186 — the 173 fills the gap between them.\n\n### 178 cc — the working size for daily tillage\n\nThe 178cc diesel [[model:1WG-4.1A]] gives {{spec:1WG-4.1A:Rated power}} across {{spec:1WG-4.1A:Working width}} and down to {{spec:1WG-4.1A:Working depth}}. It weighs {{spec:1WG-4.1A:Net weight}}, with a {{spec:1WG-4.1A:Fuel tank}} tank.\n\nThis is the size that most of the daily tillage work in our markets is done on. The frame is wide enough to make good progress across a plot, and the machine is still light enough for two people to load it. For a distributor building a range around one or two models, the 178 diesel is the safest middle anchor.\n\n### 186 cc — the open-field machine\n\nAt the top of the range, the 186cc diesel [[model:1WG-6.3A]] is rated at {{spec:1WG-6.3A:Rated power}}, works {{spec:1WG-6.3A:Working width}}, and reaches {{spec:1WG-6.3A:Working depth}}. The 186cc Tiger [[model:1WG-6.3B-T]] adds electric starting to the recoil starter and weighs {{spec:1WG-6.3B-T:Net weight}}.\n\nThe 186 is for open ground, long rows and daily commercial use. It is the heaviest machine here, and it needs a vehicle that can take that weight — but it covers the most ground per pass of any machine in the range.\n\n### A quick comparison table\n\n| Size | Typical duty | Machine to look at |\n|---|---|---|\n| 170 cc | Plots, gardens, orchard rows | [[model:1WG-4.0AQ]] (petrol) · [[model:1WG-4.0A]] (diesel) |\n| 173 cc | Mid-size plots, mixed work | [[model:1WG-4.05A]] · [[model:1WG-4.05B]] |\n| 178 cc | Daily tillage on a smallholding | [[model:1WG-4.1A]] |\n| 186 cc | Open fields, commercial daily use | [[model:1WG-6.3A]] · [[model:1WG-6.3B-T]] |\n\n### What stays the same across all four sizes\n\nEvery tiller in the range shares the same core construction, and this is the part a buyer should look at before looking at displacement. A ductile-iron gearbox with two forward gears and one reverse, a friction-plate clutch, and 24 dryland rotary blades in 3+1 groups. The gearbox is what decides how long the machine survives daily work, and it is the same design on the smallest and the largest machine we build.\n\nDepth is adjustable on all of them, and every machine in the range carries a {{spec:1WG-4.0AQ:Warranty}} warranty. If you want the full specification for any model, the [[cat:tiller|micro tiller pages]] list every one, and the [[home|home page]] is the fastest way to reach our enquiry form."
    },
    "faq": [
      {
        "q": {
          "en": "Which engine size should a distributor put at the front of the range?"
        },
        "a": {
          "en": "The 178cc diesel 1WG-4.1A. It is the size that carries the most daily tillage work, and it is still light enough for two people to load. The 170cc petrol 1WG-4.0AQ covers the small end of the market, and the 186cc diesel 1WG-6.3A covers open-field work."
        }
      },
      {
        "q": {
          "en": "Is a 173cc tiller better than a 170cc?"
        },
        "a": {
          "en": "Not in a way that matters to most buyers. The 173cc is a middle specification that fills the gap between the 170 and the 178, and it is a machine to consider when you know the market wants that size. It is not the size we would put at the front of a new range."
        }
      },
      {
        "q": {
          "en": "Does a bigger engine mean a wider blade?"
        },
        "a": {
          "en": "No. Working width is a frame decision, not an engine decision. The 170cc petrol 1WG-4.0AQ works {{spec:1WG-4.0AQ:Working width}} on a smaller frame than the 178cc diesel 1WG-4.1A at {{spec:1WG-4.1A:Working width}}, and that difference comes from the machine, not the displacement alone."
        }
      },
      {
        "q": {
          "en": "Do all four sizes use the same gearbox?"
        },
        "a": {
          "en": "Yes. Every tiller in the range uses a ductile-iron gearbox with two forward gears and one reverse, a friction-plate clutch, and 24 dryland rotary blades in 3+1 groups. The gearbox is the part that decides how long the machine lasts."
        }
      },
      {
        "q": {
          "en": "What is the difference between the 186cc 1WG-6.3A and the 186cc Tiger 1WG-6.3B-T?"
        },
        "a": {
          "en": "The Tiger adds electric starting on top of the recoil starter and weighs {{spec:1WG-6.3B-T:Net weight}}. It is the same 186cc class of engine, chosen where operators start and stop the machine many times a day."
        }
      },
      {
        "q": {
          "en": "What is the maximum digging depth across the range?"
        },
        "a": {
          "en": "Depth is adjustable on every model. It runs from {{spec:1WG-4.0AQ:Working depth}} on the 170cc petrol up to {{spec:1WG-6.3A:Working depth}} on the 186cc diesel 1WG-6.3A."
        }
      },
      {
        "q": {
          "en": "Can I order petrol and diesel models in the same shipment?"
        },
        "a": {
          "en": "Yes. The petrol machines are led by the 170cc 1WG-4.0AQ and the 173cc 1WG-4.05B, and the diesel machines run from the 170cc 1WG-4.0A to the 186cc 1WG-6.3B-T. They share wear parts and the same gearbox design, so a mixed container is straightforward to service."
        }
      },
      {
        "q": {
          "en": "How much more work does the 186cc do than the 178cc?"
        },
        "a": {
          "en": "The 186cc diesel 1WG-6.3A is rated at {{spec:1WG-6.3A:Rated power}} against {{spec:1WG-4.1A:Rated power}} for the 178cc diesel 1WG-4.1A, and it covers more ground per pass at {{spec:1WG-6.3A:Working width}} against {{spec:1WG-4.1A:Working width}}. It is also the heavier machine, which decides who can load it."
        }
      }
    ]
  },
  {
    "slug": "micro-tiller-vs-ditching-machine",
    "cat": "tiller",
    "date": "2026-11-15",
    "img": "ditch-002.jpg",
    "title": {
      "en": "Micro Tiller vs Ditching Machine: Which One Does the Job?"
    },
    "desc": {
      "en": "Both machines share an engine, a gearbox and a frame, but their working tools are different. When to stock a tiller, when to stock a ditching machine, and when one does both."
    },
    "body": {
      "en": "## Two machines that look alike and do different jobs\n\nWalk behind any of these machines and you see the same thing: an engine, a gearbox, two wheels and a set of steel blades or discs. What changes between a micro tiller and a ditching machine is what that frame is built to do, and the answer is not \"the one with the bigger engine\".\n\nA micro tiller is built to break and prepare soil. A ditching machine is built to move a lot of soil sideways, in one pass, at depth. For an importer or distributor, that difference is the whole decision.\n\n### What the tiller is optimised for\n\nThe tiller's working tool is a set of rotary blades — 24 dryland blades in 3+1 groups on every machine in the range — that spin against the ground and churn the topsoil. The width it covers is the width of the frame, adjustable: the 170cc petrol [[model:1WG-4.0AQ]] works {{spec:1WG-4.0AQ:Working width}}, the 178cc diesel [[model:1WG-4.1A]] works {{spec:1WG-4.1A:Working width}}, and the 186cc diesel [[model:1WG-6.3A]] reaches {{spec:1WG-6.3A:Working width}}. Depth is adjustable too, up to {{spec:1WG-6.3A:Working depth}} on the largest machine.\n\nThat combination — a wide, adjustable, relatively shallow cut — is exactly what seedbed preparation, weed control between rows and general cultivation need. The tiller is the machine for the field itself.\n\n### What the ditching machine is optimised for\n\nA ditching machine is built around a different geometry. Instead of blades that churn in place, it carries a ditching wheel or disc assembly that cuts into the ground and throws the soil out to the side, forming a channel as it moves forward. The specification is expressed differently:\n\n- The 170cc Dragon [[model:1WG-4.0ZL]] cuts {{spec:1WG-4.0ZL:Ditching depth}} deep and {{spec:1WG-4.0ZL:Ditching width}} wide.\n- The 178cc Bull [[model:1WG-4.1ZN]] reaches {{spec:1WG-4.1ZN:Ditching depth}} and {{spec:1WG-4.1ZN:Ditching width}}.\n- The 186cc Bull Pro [[model:1WG-6.3ZN]] goes to {{spec:1WG-6.3ZN:Ditching depth}} with {{spec:1WG-6.3ZN:Ditching width}}.\n\nThese are canal and drainage figures, not seedbed figures. It is the difference between preparing a bed and cutting a trench.\n\n### The one thing that surprises people\n\nThe ditching machines are not simply a bigger version of a tiller, and they are not slower or weaker versions either. They run on the same air-cooled single-cylinder engine family, the same ductile-iron gearbox with two forward gears and one reverse, and the same friction-plate clutch. The 178cc Bull [[model:1WG-4.1ZN]] is rated at {{spec:1WG-4.1ZN:Power}} and weighs {{spec:1WG-4.1ZN:Net weight}}.\n\nWhat is different is the frame, the depth setting and the ground-engaging tool. And the machines convert: the ditching frames are built on the same engine class as the tillers, and the specification lists attachment swap times of {{spec:1WG-4.0ZL:Attachment swap time}}. If a customer needs both jobs in a season, one machine with two attachments is often the more sensible order than two machines.\n\n### Which one should a distributor stock?\n\nLook at the job, not the market.\n\n- **Soil preparation dominates** — vegetable growing, cereals, cotton, maize, seedbed work. Stock the [[cat:tiller|micro tiller range]]. The 178cc diesel [[model:1WG-4.1A]] is the natural anchor model for daily tillage.\n- **Drainage and irrigation channels dominate** — rice, sugarcane, plantation crops, and any land where standing water is the limiting factor. Stock the [[cat:ditching|ditching machine range]]. The 178cc Bull [[model:1WG-4.1ZN]] covers most of that demand.\n- **Both, seasonally** — stock the tiller as the primary machine and offer the ditching frame as an attachment. That keeps the container count down and gives the customer one machine to service.\n\n### If the work is canal maintenance only\n\nThere is a third option worth knowing: our pumps. A drainage scheme usually needs moving water as well as cutting channels, and the [[cat:pump|water pump range]] includes petrol and diesel units for irrigation and dewatering. Many of our customers running ditching machines are running them alongside a pump for exactly this reason.\n\nEvery machine described here carries a {{spec:1WG-4.0ZL:Warranty}} warranty. Tell us the crop, the soil and the drainage pattern, and we will tell you which machine we would put on that ground. Start from the [[home|home page]] or the [[cat:tiller|tiller range]]."
    },
    "faq": [
      {
        "q": {
          "en": "Is a ditching machine just a bigger version of a tiller?"
        },
        "a": {
          "en": "No. A tiller works the soil with rotary blades, 24 dryland blades in 3+1 groups on every machine in our range. A ditching machine cuts a channel with a ditching wheel or disc that throws the soil to one side as it moves forward. One prepares a seedbed, the other cuts a trench."
        }
      },
      {
        "q": {
          "en": "Can one machine do both tilling and ditching?"
        },
        "a": {
          "en": "Yes. The tiller frames are built to take a ridger and a ditcher, and on the 170cc Dragon base the frame changes between the two in {{spec:1WG-4.0ZL:Attachment swap time}}. For a customer who needs both jobs in one season, one machine with two attachments is usually the more sensible order than two machines."
        }
      },
      {
        "q": {
          "en": "Which machine is right for rice paddies and sugarcane?"
        },
        "a": {
          "en": "Drainage and irrigation channels dominate that work, so the ditching machine range. The 178cc Bull 1WG-4.1ZN cuts {{spec:1WG-4.1ZN:Ditching depth}} deep and {{spec:1WG-4.1ZN:Ditching width}} wide, and the 186cc Bull Pro 1WG-6.3ZN goes deeper still at {{spec:1WG-6.3ZN:Ditching depth}}."
        }
      },
      {
        "q": {
          "en": "Do the ditching machines use the same gearbox as the tillers?"
        },
        "a": {
          "en": "Yes. They run on the same air-cooled single-cylinder engine family, the same ductile-iron gearbox with two forward gears and one reverse, and the same friction-plate clutch. The 178cc Bull 1WG-4.1ZN is rated at {{spec:1WG-4.1ZN:Power}} and weighs {{spec:1WG-4.1ZN:Net weight}}."
        }
      },
      {
        "q": {
          "en": "Which model should a distributor stock first?"
        },
        "a": {
          "en": "Look at the crop rather than the market. Soil preparation dominates for vegetable growing, cereals, cotton and maize, so the tiller range, anchored on the 178cc diesel 1WG-4.1A. For rice, sugarcane and plantation crops, stock the ditching range, anchored on the 178cc Bull 1WG-4.1ZN."
        }
      },
      {
        "q": {
          "en": "Do I need a pump as well as a ditching machine?"
        },
        "a": {
          "en": "Often, yes. A drainage scheme usually needs moving water as well as cut channels, and our water pump range includes petrol and diesel units for irrigation and dewatering. Many customers running ditching machines run them alongside a pump for exactly that reason."
        }
      },
      {
        "q": {
          "en": "How deep can the ditching machine cut?"
        },
        "a": {
          "en": "The 170cc Dragon 1WG-4.0ZL cuts {{spec:1WG-4.0ZL:Ditching depth}} deep and {{spec:1WG-4.0ZL:Ditching width}} wide, the 178cc Bull 1WG-4.1ZN reaches {{spec:1WG-4.1ZN:Ditching depth}} and {{spec:1WG-4.1ZN:Ditching width}}, and the 186cc Bull Pro 1WG-6.3ZN reaches {{spec:1WG-6.3ZN:Ditching depth}}."
        }
      },
      {
        "q": {
          "en": "What warranty do these machines carry?"
        },
        "a": {
          "en": "Every machine carries a {{spec:1WG-4.0ZL:Warranty}} warranty."
        }
      }
    ]
  },
  {
    "slug": "micro-tiller-for-smallholder-farms",
    "cat": "tiller",
    "date": "2026-11-15",
    "img": "tiller-005.jpg",
    "title": {
      "en": "Micro Tiller for Smallholder Farms: Sizing for Land Worked by Hand"
    },
    "desc": {
      "en": "Smallholdings are worked in beds, not fields. Here is how to size a micro tiller by working width, weight, fuel and attachments when one or two people do the work."
    },
    "body": {
      "en": "## A smallholding is not a small version of a farm\n\nMost buying advice for farm machinery assumes scale: hectares per day, tractor widths, tonnes per hour. A smallholding works on a different logic. The plot is measured in beds rather than fields, the crop is mixed rather than monoculture, the machine has to be moved by hand when the truck is busy, and the season is a series of small jobs rather than one long run.\n\nThat changes what \"the right machine\" means. Here is how to size a micro tiller for land that is worked by one or two people.\n\n### Match the machine to the job, not the plot\n\nOn a smallholding the work falls into a small number of recurring categories: preparing a seedbed, cultivating between rows, breaking new ground, and cutting a drain at the field edge. A machine that handles the first three well will carry the season.\n\nThe measure that matters is working width, because it decides how many passes a bed needs. The 170cc petrol [[model:1WG-4.0AQ]] covers {{spec:1WG-4.0AQ:Working width}} — narrow enough to work between vegetable rows. The 178cc diesel [[model:1WG-4.1A]] covers {{spec:1WG-4.1A:Working width}}, which suits a plot worked from one end to the other. The 186cc diesel [[model:1WG-6.3A]] reaches {{spec:1WG-6.3A:Working width}} and is the right choice when the ground is open and the priority is covering area.\n\n### Weight matters more than people expect\n\nOn a smallholding the machine is carried across the plot, lifted over bunds, and loaded into a pickup by hand. Weight is not a specification detail here; it is a daily cost in effort and in the number of hands it takes.\n\nThe lightest machine in the range is the 170cc petrol [[model:1WG-4.0AQ]] at {{spec:1WG-4.0AQ:Net weight}}, with a {{spec:1WG-4.0AQ:Fuel tank}} tank. The 170cc diesel [[model:1WG-4.0A]] is {{spec:1WG-4.0A:Net weight}} — noticeably heavier, and correspondingly more capable in wet ground. The 178cc diesel [[model:1WG-4.1A]] is {{spec:1WG-4.1A:Net weight}}, which is still a two-person lift into a vehicle for most operators.\n\nIf you are buying for a single operator, start with the 170 petrol or the 170 diesel and stop there. If a second person is always available and the work is daily, the 178 diesel is the better long-term choice.\n\n### Fuel availability is the one thing to check first\n\nBefore anything else, find out what you can actually buy. A machine is only useful if the fuel is available within reach when the field is ready to be worked. Our petrol range is led by the 170cc [[model:1WG-4.0AQ]] and the 173cc [[model:1WG-4.05B]], and our diesel range runs from the 170cc [[model:1WG-4.0A]] up to the 186cc [[model:1WG-6.3B-T]], which also adds electric starting if you prefer not to pull the starter.\n\nThe diesel machines are the better answer for continuous daily work, because a compression-ignition engine holds its speed under load. The petrol machines win on weight and on availability of fuel.\n\n### Attachments turn one machine into a season\n\nEvery tiller in the range is built to take a ridger and a ditcher, and depending on the model a potato digger, a water pump or a trailer. On a smallholding this is the cheapest way to cover the whole season: one engine, one gearbox to service, several jobs done.\n\nThe frames share the same ductile-iron gearbox with two forward gears and one reverse, the same friction-plate clutch, and the same 24 dryland rotary blades in 3+1 groups. If your season includes ridging rows or cutting a drain, look at the attachments before you look at a second machine.\n\n### A sensible specification for a one-hectare holding\n\nFor roughly one hectare worked by hand, the choice is between the 178cc diesel [[model:1WG-4.1A]] — {{spec:1WG-4.1A:Rated power}}, {{spec:1WG-4.1A:Working width}} — and the 170cc petrol [[model:1WG-4.0AQ]] if the work is lighter and the fuel is easier to get. Add the ditcher attachment, and most of the year is covered.\n\nEvery machine carries a {{spec:1WG-4.0AQ:Warranty}} warranty, and the range shares its wear parts, so a mixed fleet is simple to maintain. If you tell us your crop, your plot size and who will be operating the machine, we can point you at the right one — the [[cat:tiller|micro tiller range]] lists every model, and the [[home|home page]] has the enquiry form."
    },
    "faq": [
      {
        "q": {
          "en": "Which tiller suits a one-hectare holding?"
        },
        "a": {
          "en": "Two models cover most of it: the 178cc diesel 1WG-4.1A at {{spec:1WG-4.1A:Rated power}} and {{spec:1WG-4.1A:Working width}}, or the 170cc petrol 1WG-4.0AQ if the soil is light and the work is less continuous."
        }
      },
      {
        "q": {
          "en": "Can one person carry a micro tiller?"
        },
        "a": {
          "en": "The lighter machines, yes. The 170cc petrol 1WG-4.0AQ weighs {{spec:1WG-4.0AQ:Net weight}}, which is the difference between a machine one person can lift into a pickup and one that needs two. The 178cc diesel 1WG-4.1A at {{spec:1WG-4.1A:Net weight}} is a two-person lift for most operators."
        }
      },
      {
        "q": {
          "en": "Should a smallholder buy a second machine or attachments?"
        },
        "a": {
          "en": "Attachments, usually. Every tiller frame is built to take a ridger and a ditcher, and depending on the model a potato digger, a water pump or a trailer. One engine and one gearbox to service covers more of the season than two machines."
        }
      },
      {
        "q": {
          "en": "How do I choose between petrol and diesel on a smallholding?"
        },
        "a": {
          "en": "Start with what fuel you can actually buy near you, because a machine is only useful if the fuel is available when the ground is ready. Then choose diesel for continuous daily work and petrol for lighter work where weight and fuel availability matter more."
        }
      },
      {
        "q": {
          "en": "Is a 170cc tiller enough for hard soil?"
        },
        "a": {
          "en": "In wet or heavy ground the answer is usually a diesel machine, because a compression-ignition engine holds its speed when the blades meet resistance. The 170cc petrol 1WG-4.0AQ is a good machine for light soil and for ground that is worked at the right moisture."
        }
      },
      {
        "q": {
          "en": "How deep can these machines dig?"
        },
        "a": {
          "en": "Working depth is adjustable on every model. The 170cc petrol 1WG-4.0AQ digs to {{spec:1WG-4.0AQ:Working depth}}, and the 186cc diesel 1WG-6.3A to {{spec:1WG-6.3A:Working depth}}."
        }
      },
      {
        "q": {
          "en": "Do all the small tillers share the same wear parts?"
        },
        "a": {
          "en": "Yes. The range shares a ductile-iron gearbox with two forward gears and one reverse, a friction-plate clutch, and 24 dryland rotary blades in 3+1 groups, so a mixed fleet is simple to maintain."
        }
      },
      {
        "q": {
          "en": "What warranty do the machines carry?"
        },
        "a": {
          "en": "Every machine in the range carries a {{spec:1WG-4.0AQ:Warranty}} warranty."
        }
      }
    ]
  },
  {
    "slug": "micro-tiller-for-orchards-and-vineyards",
    "cat": "tiller",
    "date": "2026-11-15",
    "img": "tiller-007.jpg",
    "title": {
      "en": "Micro Tiller for Orchards and Vineyards: Working Between the Rows"
    },
    "desc": {
      "en": "In a permanent crop the machine has to fit between the rows and adjust to the ground. How to choose a micro tiller for orchard and vineyard work."
    },
    "body": {
      "en": "## Between the rows, the rules are different\n\nTilling a field is about width and depth. Tilling an orchard or a vineyard is about not damaging the thing you are growing. The machine is the same family of machines, but the working method changes completely, and choosing the wrong machine for the job costs you either the crop or a lot of time.\n\nThese are the practices our customers use in orchard and vineyard work.\n\n### The frame must fit between the rows\n\nThe first constraint is geometric. Measure the distance between the planted rows and allow clearance on both sides; the blades need room to pass without touching the trunks or the trellis posts.\n\nFor a narrow row system, the 170cc petrol [[model:1WG-4.0AQ]] is the natural machine: {{spec:1WG-4.0AQ:Working width}}, {{spec:1WG-4.0AQ:Working depth}}, and {{spec:1WG-4.0AQ:Net weight}} to lift over a low trellis without helpers. The 170cc petrol Lady [[model:1WG-4.0BQ]] is the same class with a slightly different frame — {{spec:1WG-4.0BQ:Working width}} — and works well where rows are a little wider.\n\nFor wider inter-row spacing, the 178cc diesel [[model:1WG-4.1A]] covers {{spec:1WG-4.1A:Working width}} and digs to {{spec:1WG-4.1A:Working depth}}, which suits established orchards with more space between the rows.\n\n### The working depth has to be adjustable, not fixed\n\nOrchard soil is not uniform. Under the trees the roots are shallow and the soil is compacted by traffic; between the trees there may be grass cover that needs taking out. A machine with an adjustable depth lets one operator change the setting as they move down the row instead of stopping to reconfigure.\n\nAll of our tillers have an adjustable depth setting, from {{spec:1WG-4.0AQ:Working depth}} on the 170cc petrol up to {{spec:1WG-6.3A:Working depth}} on the 186cc diesel [[model:1WG-6.3A]].\n\n### Handle control matters more than horsepower\n\nIn a vineyard the operator is walking at the speed of a person, not a tractor. What limits the work is how precisely the machine can be steered and how easily it can be lifted and turned at the end of a row.\n\nThis is where the lighter machines earn their place. The 170cc petrol [[model:1WG-4.0AQ]] weighs {{spec:1WG-4.0AQ:Net weight}}, which is the difference between a machine one person can lift into a trailer and one that needs two. The 173cc petrol [[model:1WG-4.05B]] at {{spec:1WG-4.05B:Net weight}} is still light but has more capacity for hard, dry soil under the vines.\n\nThe higher-powered machines earn their place in a different orchard job: the heavy work between the blocks — cover cropping, turning a strip of ground, cutting a drainage line along the headland. For that, the 178cc diesel [[model:1WG-4.1A]] or the 186cc diesel [[model:1WG-6.3A]] is the right tool.\n\n### Never work wet ground, whatever the machine\n\nThis advice is the same for every crop, and it is worth repeating for orchards in particular: a tiller working soil that is too wet destroys the structure, and in a permanent crop you cannot easily put that structure back. The blades will smear the ground instead of cutting it, and the compaction you cause stays for years.\n\nWait for the soil to break cleanly in your hand before starting. The same rule applies to our [[cat:ditching|ditching machines]] when they cut a drain along an orchard edge.\n\n### Attachments for orchard work\n\nTwo attachments earn their keep in permanent crops. The ridger is used to build up a bank against the row, and the ditcher cuts the drainage line at the headland or between blocks. Both fit the standard tiller frame, and on the 170cc Dragon base the frame changes between the two in {{spec:1WG-4.0ZL:Attachment swap time}}.\n\nWhere water has to be moved as well as soil, our [[cat:pump|water pumps]] cover irrigation and dewatering duties in the same season.\n\nEvery machine in the range carries a {{spec:1WG-4.0AQ:Warranty}} warranty, and because the range shares a common design, the wear parts are shared across models. Tell us your row spacing, your crop and the type of soil, and we will tell you which machine fits the rows — the [[cat:tiller|micro tiller range]] lists every model and the [[home|home page]] has the enquiry form."
    },
    "faq": [
      {
        "q": {
          "en": "What width of tiller do I need between orchard rows?"
        },
        "a": {
          "en": "Measure your actual row spacing and allow clearance on both sides for the blades to pass. The narrowest machine in the range is the 170cc petrol 1WG-4.0AQ at {{spec:1WG-4.0AQ:Working width}}; the 178cc diesel 1WG-4.1A covers {{spec:1WG-4.1A:Working width}} for wider spacing."
        }
      },
      {
        "q": {
          "en": "Can the working depth be adjusted on these machines?"
        },
        "a": {
          "en": "Yes, on every model in the range. It runs from {{spec:1WG-4.0AQ:Working depth}} on the 170cc petrol up to {{spec:1WG-6.3A:Working depth}} on the 186cc diesel 1WG-6.3A, so one operator can change the setting as they move down the row instead of stopping to reconfigure."
        }
      },
      {
        "q": {
          "en": "Is it safe to till under fruit trees?"
        },
        "a": {
          "en": "Only shallow, and only where you know where the roots are. Roots near the surface are damaged by a deep cut, and a permanent crop cannot easily be replanted. Set the depth low in the tree row and work the ground between the trees at a deeper setting."
        }
      },
      {
        "q": {
          "en": "Which machine handles the heavier work between the blocks?"
        },
        "a": {
          "en": "The 178cc diesel 1WG-4.1A or the 186cc diesel 1WG-6.3A. Cover cropping, turning a strip of ground and cutting a drainage line along the headland are open-ground jobs that the lighter machines are not built for."
        }
      },
      {
        "q": {
          "en": "Can I use a tiller in a vineyard where the rows are narrow?"
        },
        "a": {
          "en": "Yes, provided the frame fits. The 170cc petrol 1WG-4.0AQ at {{spec:1WG-4.0AQ:Working width}} and {{spec:1WG-4.0AQ:Net weight}} is the machine that can be lifted over a low trellis without helpers, which is what repeated work down a row actually needs."
        }
      },
      {
        "q": {
          "en": "Do orchards need drainage?"
        },
        "a": {
          "en": "Often yes, and it is the job that decides the machine. The 170cc Dragon ditching machine 1WG-4.0ZL cuts {{spec:1WG-4.0ZL:Ditching depth}} deep and {{spec:1WG-4.0ZL:Ditching width}} wide, and the ridger and ditcher attachments both fit the standard tiller frame."
        }
      },
      {
        "q": {
          "en": "Should I ever till wet soil in an orchard?"
        },
        "a": {
          "en": "No, and this matters more in a permanent crop than in an annual one. A tiller working soil that is too wet smears the ground instead of cutting it, and the compaction you cause stays for years. Wait for the soil to break cleanly in your hand before starting."
        }
      },
      {
        "q": {
          "en": "Which attachments earn their keep in orchard work?"
        },
        "a": {
          "en": "The ridger, to build up a bank against the row, and the ditcher, to cut the drainage line at the headland or between blocks. On the 170cc Dragon base the frame changes between the two in {{spec:1WG-4.0ZL:Attachment swap time}}."
        }
      }
    ]
  },
  {
    "slug": "how-to-choose-a-water-pump",
    "cat": "pump",
    "date": "2026-11-15",
    "img": "pump-001.jpg",
    "title": {
      "en": "How to Choose a Water Pump: Flow, Head and Source"
    },
    "desc": {
      "en": "Four numbers decide which pump you need: flow, head, distance and the water source. How to size a petrol or diesel pump for irrigation, drainage and boreholes."
    },
    "body": {
      "en": "## Four numbers decide which pump you need\n\nA pump is a simple machine, and choosing one comes down to four numbers: how much water you need per hour, how high you need to lift it, how far the water has to travel, and what the source is. Get those four right and the rest is a matter of matching the engine to the job.\n\nOur range covers petrol and diesel engines, one and two inch ports, centrifugal and self-priming bodies, and a diesel well pump for deep boreholes. This guide works through the choices in the order that actually decides them.\n\n### Start with the lift, not the flow\n\nThe single most common mistake is choosing a pump for its flow rate and discovering it cannot lift water to the destination. Head is the hard limit: a pump that delivers a large volume but cannot push water over the height of your tank or up to your second-storey irrigation line is the wrong pump.\n\nOur pumps are specified at a maximum total head of {{spec:2\" Centrifugal:Max total head}} on the [[model:2\" Centrifugal|2-inch Centrifugal Pump]], {{spec:3\" Centrifugal:Max total head}} on the [[model:3\" Centrifugal|3-inch Centrifugal Pump]], {{spec:Fire 2\":Max total head}} on the [[model:Fire 2\"|Fire Pump]], and {{spec:Double-Impeller:Max total head}} on the double-impeller diesel [[model:Double-Impeller]]. The diesel well pump [[model:195 Diesel|Diesel Well Pump]] is rated at {{spec:195 Diesel:Max total head}}.\n\nPractical rule of thumb: add the vertical height of the lift, the height of every bend and elbow, and roughly a little extra for friction in the pipe, then compare that figure with the maximum total head of the pump.\n\n### Then size the delivery for the crop\n\nFlow rate decides how long it takes to move a given volume of water, which on a farm is usually a question of irrigation area.\n\n- The [[model:2\" Centrifugal|2-inch Centrifugal Pump]] delivers {{spec:2\" Centrifugal:Max flow rate}} on a {{spec:2\" Centrifugal:Inlet/outlet diameter}} port.\n- The [[model:3\" Centrifugal|3-inch Centrifugal Pump]] moves {{spec:3\" Centrifugal:Max flow rate}} through a {{spec:3\" Centrifugal:Inlet/outlet diameter}} port — the right step up when you are irrigating a larger area or running several lines at once.\n- The [[model:Self-Priming 2~3\"|Self-Priming Pump]] handles {{spec:Self-Priming 2~3\":Max flow rate}} and accepts a {{spec:Self-Priming 2~3\":Inlet/outlet diameter}} hose, which makes it the flexible choice when the pipe size has to change from job to job.\n- The double-impeller diesel [[model:Double-Impeller]] delivers {{spec:Double-Impeller:Max flow rate}} — the largest volume in the range, on diesel for continuous duty.\n\n### Match the pump to the water source\n\nThis is where the two body types separate. A centrifugal pump is designed to sit in a source that is already full of water — a shallow well, a sump, a canal, a tank — and it is the simpler, lighter machine. The [[model:Self-Priming 2~3\"|Self-Priming Pump]] is the one that can pull water from a source that is not already flooded: it primes itself in {{spec:Self-Priming 2~3\":Self-priming time}} at {{spec:Self-Priming 2~3\":Max suction lift}}.\n\nIf you do not know whether your source will stay flooded — a seasonal pond, a river level that drops, a well with a fluctuating water table — the self-priming unit removes the question entirely.\n\nFor a deep borehole, the [[model:195 Diesel|Diesel Well Pump]] is the machine: {{spec:195 Diesel:Power}}, a {{spec:195 Diesel:Max suction lift}} suction lift, and {{spec:195 Diesel:Fuel tank}} of tank, at {{spec:195 Diesel:Net weight}}.\n\n### Then choose the engine by hours, not by habit\n\nAll the small pumps run on a petrol four-stroke engine; the heavy-duty units run on diesel. The petrol [[model:2\" Centrifugal|2-inch Centrifugal Pump]] weighs {{spec:2\" Centrifugal:Net weight}} and carries {{spec:2\" Centrifugal:Fuel tank}}, while the diesel double-impeller [[model:Double-Impeller]] weighs {{spec:Double-Impeller:Net weight}} and adds electric starting for operators who run it through a long day.\n\nPetrol is the answer for intermittent use and light duty. Diesel is the answer for a pump that runs all day, every day, and where petrol storage is a problem.\n\n### What is common to every pump we build\n\nThe wet end is the same across the range: a cast-iron impeller, an aluminium-alloy pump body, and a mechanical seal made of ceramic and graphite. That is the part that has to survive grit and running dry, and it is why every pump in the range carries a {{spec:2\" Centrifugal:Warranty}} warranty.\n\nThe full list with all specifications is on the [[cat:pump|water pump pages]]. Tell us the lift height, the volume you need per hour, the source and the fuel available in your market, and we will tell you which pump fits — the [[home|home page]] has the enquiry form."
    },
    "faq": [
      {
        "q": {
          "en": "What information do I need to choose a water pump?"
        },
        "a": {
          "en": "Four numbers: how much water you need per hour, how high it has to be lifted, how far it has to travel, and what the source is. Add the vertical lift, the height of every bend and elbow, and a little extra for pipe friction, then compare that figure with the maximum total head of the pump."
        }
      },
      {
        "q": {
          "en": "How much water does the 2-inch pump deliver?"
        },
        "a": {
          "en": "The 2-inch Centrifugal Pump delivers {{spec:2\" Centrifugal:Max flow rate}} on a {{spec:2\" Centrifugal:Inlet/outlet diameter}} port, up to {{spec:2\" Centrifugal:Max total head}} total head."
        }
      },
      {
        "q": {
          "en": "Which pump is right for a deep borehole?"
        },
        "a": {
          "en": "The Diesel Well Pump is rated at {{spec:195 Diesel:Power}} with a {{spec:195 Diesel:Max suction lift}} suction lift and a {{spec:195 Diesel:Fuel tank}} tank, at {{spec:195 Diesel:Net weight}}."
        }
      },
      {
        "q": {
          "en": "Which pump delivers the most water?"
        },
        "a": {
          "en": "The double-impeller diesel pump, at {{spec:Double-Impeller:Max flow rate}} and up to {{spec:Double-Impeller:Max total head}}, on diesel for continuous duty."
        }
      },
      {
        "q": {
          "en": "Should I buy a petrol or a diesel pump?"
        },
        "a": {
          "en": "Petrol is the answer for intermittent use and light duty. Diesel is the answer for a pump that runs all day, every day, and where petrol storage is a problem. The petrol 2-inch Centrifugal Pump weighs {{spec:2\" Centrifugal:Net weight}}, while the diesel double-impeller pump weighs {{spec:Double-Impeller:Net weight}}."
        }
      },
      {
        "q": {
          "en": "Does the diesel pump have electric starting?"
        },
        "a": {
          "en": "The double-impeller diesel pump starts with {{spec:Double-Impeller:Starting}}, which suits an operator running it through a long day."
        }
      },
      {
        "q": {
          "en": "Which pump works when the source is not always flooded?"
        },
        "a": {
          "en": "The Self-Priming Pump primes itself in {{spec:Self-Priming 2~3\":Self-priming time}} at {{spec:Self-Priming 2~3\":Max suction lift}}, so the inlet does not have to stay submerged."
        }
      },
      {
        "q": {
          "en": "Do all your pumps share the same wet end?"
        },
        "a": {
          "en": "Yes. A cast-iron impeller, an aluminium-alloy pump body and a ceramic-and-graphite mechanical seal across the range. That is the part that has to survive grit and running dry, and every pump carries a {{spec:2\" Centrifugal:Warranty}} warranty."
        }
      }
    ]
  },
  {
    "slug": "self-priming-vs-centrifugal-pump",
    "cat": "pump",
    "date": "2026-11-15",
    "img": "pump-003.jpg",
    "title": {
      "en": "Self-Priming vs Centrifugal Pump: Which Body Type Do You Need?"
    },
    "desc": {
      "en": "The two small pump body types differ in one respect: a centrifugal pump needs water at the inlet, a self-priming pump does not. Here is how that changes the choice."
    },
    "body": {
      "en": "## The difference is one question: is there water at the inlet?\n\nEvery small engine pump in our range shares the same basic layout — an air-cooled four-stroke engine on a frame, a pump body with an inlet and an outlet, a fuel tank and a handle. The two body types we build differ in exactly one respect, and it is the one that decides whether a pump works at all in your situation.\n\nA centrifugal pump needs water at the inlet. A self-priming pump does not.\n\n### How a centrifugal pump behaves\n\nThe centrifugal pump is the simpler machine and the smaller one. The impeller spins, and the water already sitting in the casing is thrown outward, creating the pressure that pushes water up and out of the outlet. Everything about that depends on the casing being full.\n\nThe [[model:2\" Centrifugal|2-inch Centrifugal Pump]] delivers {{spec:2\" Centrifugal:Max flow rate}} at up to {{spec:2\" Centrifugal:Max total head}}, draws {{spec:2\" Centrifugal:Max suction lift}}, and weighs {{spec:2\" Centrifugal:Net weight}}. The [[model:3\" Centrifugal|3-inch Centrifugal Pump]] moves {{spec:3\" Centrifugal:Max flow rate}} on a {{spec:3\" Centrifugal:Inlet/outlet diameter}} port.\n\nThis is the right pump when the water source is already full: a canal, a farm dam, a concrete sump with the inlet submerged, a tank, or a shallow well that never drops below the pump. Prime it, close the valve, and it runs. The 3-inch unit is also the better choice when you need volume — irrigation across a larger area, or filling a tank in a reasonable time.\n\n### How a self-priming pump behaves\n\nA self-priming pump adds a chamber and a valve arrangement that lets it draw air out of the casing and pull water up into it on its own. That is why it can sit above the water line and still deliver.\n\nThe self-priming unit in our range, [[model:Self-Priming 2~3\"|Self-Priming Pump]], primes in {{spec:Self-Priming 2~3\":Self-priming time}} at {{spec:Self-Priming 2~3\":Max suction lift}}, delivers {{spec:Self-Priming 2~3\":Max flow rate}}, and takes a {{spec:Self-Priming 2~3\":Inlet/outlet diameter}} hose on both inlet and outlet — so it can be adapted to the pipe size available on site. It weighs {{spec:Self-Priming 2~3\":Net weight}}.\n\nThis is the pump for an uncertain or seasonal source: a shallow well that drops in the dry season, a pond, a stream, a pit that is not always flooded. It removes the need to keep the inlet submerged.\n\n### Other differences worth knowing\n\n- **Port size and flexibility.** The centrifugal pumps in our range come with a fixed 50 mm or 80 mm port. The self-priming unit takes a range of hose sizes, which matters when the buyer does not know what pipe will be on site.\n- **Engine.** The self-priming unit uses the same petrol four-stroke engine family as the 2-inch centrifugal — {{spec:Self-Priming 2~3\":Power}} and {{spec:Self-Priming 2~3\":Displacement}} — so servicing knowledge transfers between them.\n- **Diesel versions exist for both.** For continuous duty, the [[model:195 Diesel|Diesel Well Pump]] gives {{spec:195 Diesel:Max flow rate}} with a {{spec:195 Diesel:Max suction lift}} suction lift, and the double-impeller diesel [[model:Double-Impeller]] handles {{spec:Double-Impeller:Max flow rate}} at up to {{spec:Double-Impeller:Max total head}} with electric starting.\n- **Shared wet end.** Both types use a cast-iron impeller, an aluminium-alloy pump body and a ceramic-and-graphite mechanical seal. The parts that wear are the same, which matters to anyone maintaining several machines.\n\n### Which one to specify\n\nAsk: does the water arrive at the pump without being pumped?\n\n- **Yes — the source is always full.** Specify a centrifugal pump. It is lighter, simpler and usually the better value. Choose the [[model:3\" Centrifugal|3-inch Centrifugal Pump]] if you need volume, the 2-inch centrifugal for general work, and the [[model:Fire 2\"|Fire Pump]] when the priority is head rather than flow — it reaches {{spec:Fire 2\":Max total head}}.\n- **No — or you are not sure.** Specify the [[model:Self-Priming 2~3\"|Self-Priming Pump]]. The extra capability costs little and removes a common reason a pump arrives and will not work.\n- **Deep borehole.** The [[model:195 Diesel|Diesel Well Pump]] is built for that duty.\n\nEvery pump in the range carries a {{spec:2\" Centrifugal:Warranty}} warranty. Full specifications are on the [[cat:pump|water pump pages]], and the [[home|home page]] has the enquiry form — send us the lift height, the volume and the source, and we will confirm which body type will do the job."
    },
    "faq": [
      {
        "q": {
          "en": "What is the difference between a self-priming and a centrifugal pump?"
        },
        "a": {
          "en": "One question decides it: is there water at the inlet? A centrifugal pump needs the casing to be already full, and its impeller throws that water outward to create pressure. A self-priming pump draws the air out of the casing and pulls water up into it on its own, so it can sit above the water line."
        }
      },
      {
        "q": {
          "en": "How long does the self-priming pump take to prime?"
        },
        "a": {
          "en": "The Self-Priming Pump primes in {{spec:Self-Priming 2~3\":Self-priming time}} at {{spec:Self-Priming 2~3\":Max suction lift}}, which removes the need to keep the inlet submerged."
        }
      },
      {
        "q": {
          "en": "Which pump suits a shallow well that drops in the dry season?"
        },
        "a": {
          "en": "The Self-Priming Pump. If you do not know whether the source will stay flooded — a seasonal pond, a river level that drops, a well with a fluctuating water table — self-priming removes the question entirely."
        }
      },
      {
        "q": {
          "en": "Can I fit whatever hose is available on site?"
        },
        "a": {
          "en": "The self-priming unit takes a {{spec:Self-Priming 2~3\":Inlet/outlet diameter}} hose on both inlet and outlet, so it can be adapted to the pipe size available. The centrifugal pumps in the range come with a fixed 50 mm or 80 mm port."
        }
      },
      {
        "q": {
          "en": "Which pump is simpler and lighter?"
        },
        "a": {
          "en": "The centrifugal. The 2-inch Centrifugal Pump weighs {{spec:2\" Centrifugal:Net weight}} and delivers {{spec:2\" Centrifugal:Max flow rate}}, and the 3-inch Centrifugal Pump moves {{spec:3\" Centrifugal:Max flow rate}} for jobs where volume matters more than anything else."
        }
      },
      {
        "q": {
          "en": "Which pump should I choose when the source is always full?"
        },
        "a": {
          "en": "A centrifugal pump — a canal, a farm dam, a concrete sump with the inlet submerged, a tank, or a shallow well that never drops below the pump. Prime it, close the valve, and it runs."
        }
      },
      {
        "q": {
          "en": "Are there diesel versions of both body types?"
        },
        "a": {
          "en": "Yes. For continuous duty, the Diesel Well Pump gives {{spec:195 Diesel:Max flow rate}} with a {{spec:195 Diesel:Max suction lift}} suction lift, and the double-impeller diesel Double-Impeller handles {{spec:Double-Impeller:Max flow rate}} with electric starting."
        }
      },
      {
        "q": {
          "en": "Do the two pump types share wear parts?"
        },
        "a": {
          "en": "Yes. Both use a cast-iron impeller, an aluminium-alloy pump body and a ceramic-and-graphite mechanical seal. The parts that wear are the same, which matters to anyone maintaining several machines."
        }
      }
    ]
  },
  {
    "slug": "micro-tiller-maintenance-schedule",
    "cat": "tiller",
    "date": "2026-11-15",
    "img": "news-assembly.jpg",
    "title": {
      "en": "Micro Tiller Maintenance Schedule: Daily, Weekly and Seasonal"
    },
    "desc": {
      "en": "Most field failures on a micro tiller come from four things: a dirty air filter, loose hardware, worn drive parts, or a bent blade. Here is the schedule that prevents them."
    },
    "body": {
      "en": "## Maintenance is the cheapest way to keep a machine working\n\nA micro tiller is a simple machine: engine, gearbox, blades, handle. Almost every failure that stops one in the field comes from one of four things — dirty air filter, loose hardware, worn drive parts, or a blade that has bent into the soil. None of those need a workshop, and all of them can be prevented by an hour of attention spread through the season.\n\nBelow is the schedule we work to, and it applies to every machine in our range: the 170cc petrol [[model:1WG-4.0AQ]], the 178cc diesel [[model:1WG-4.1A]] and the 186cc diesel [[model:1WG-6.3A]] all share the same construction, so the routine is identical.\n\n### Before every working day: five minutes\n\n- **Fuel and oil.** Check that there is enough fuel in the {{spec:1WG-4.1A:Fuel tank}} tank and that the engine oil is at the correct level. A machine that starts and runs for ten minutes with an empty tank wastes more time than the check costs.\n- **Air filter.** Check that the intake cover is clean. A blocked filter is the most common reason an engine runs rough and burns fuel badly, and it is also the cheapest thing to fix.\n- **Fuel tap and lines.** Make sure the tap is open and that no water or dirt has collected in the filter bowl. Water in the fuel is what turns a machine that started yesterday into a machine that will not start today.\n- **Blades and tines.** Look along the blade set for bent or missing tines, and remove any stones or wire wrapped around the rotor. This is the check that prevents the expensive damage.\n- **Guards and fasteners.** Check that the chain or belt cover is in place and that the handle bolts and depth-adjustment pins are tight. A loose fastener on a vibrating handle never gets tighter.\n\n### Weekly: an hour with a spanner\n\n- **Check the drive.** The friction-plate clutch, the belt or chain, and the gearbox input. Look for glazing, cracking or a loose adjustment. Replace a belt while it still drives properly, rather than when it snaps in the middle of a row.\n- **Grease the moving joints.** The depth-adjustment linkage, the handle pivot and the wheel shaft. This is what stops the handle from seizing in a wet season and what keeps the depth setting repeatable from one pass to the next.\n- **Inspect the blades.** Replace tines that have worn below the point of usefulness, and balance the set if a group is noticeably worn on one side. Unbalanced blades cause vibration that loosens everything else on the machine.\n- **Check the gearbox oil level** and the condition of the oil. The gearbox is the part that carries the daily work, and it is a sealed unit on every machine in the range — it is worth looking at before it becomes a replacement.\n- **Check the fuel filter** and clean it if the fuel system has been running on dirty fuel.\n\n### Monthly and at the end of the season\n\n- **Air cleaner.** Remove and clean the filter element rather than just blowing on it. A working filter is the difference between an engine that starts on the first pull and one that needs three.\n- **Spark plug.** Remove, check and clean the plug, and check the gap against the manual supplied with the machine. A fouled plug is the classic cause of hard starting and poor throttle response.\n- **Carburettor and fuel lines.** If the engine has been running poorly, clean the air filter first and the carburettor second. On a diesel, check that the pre-cleaner on the fuel supply is clear.\n- **Check the gearbox oil** again and look for any metal in it. Fresh oil with metal in it means something inside has been wearing, and it is worth finding out before it becomes a failure.\n- **Confirm the clutch and the reverse gear.** Both should engage cleanly. A gear that hesitates is usually a linkage adjustment rather than a worn part.\n- **Off-season storage.** Drain the fuel if the machine will stand for weeks, clean the machine, oil the exposed metal, cover the intake, and store it dry and off the ground. A machine stored damp will show rust from the first month.\n\n### The spare parts to keep on the shelf\n\nFor any operator running a machine daily, the list is short and it never changes: spare blades and tines, a drive belt or chain set, a set of standard bolts and nuts, a spark plug, an air filter element, a fuel filter, and a good quality fuel line. Keep these in the toolbox, not in a warehouse, because a machine that stops in a field is only fixed by what is in the vehicle with it.\n\n### A note on warranty and service\n\nEvery machine in the range carries a {{spec:1WG-4.1A:Warranty}} warranty. Because the tiller, the [[cat:ditching|ditching machines]] and the [[cat:pump|water pumps]] share a common design, wear parts and consumables are consistent across models, which makes stocking spares simpler for a dealer and simpler for the operator.\n\nThe practical rule that matters most: grease it, check the air filter, and keep the blades sharp. Machines that are looked after start when the operator expects them to start, and they are still working years later."
    },
    "faq": [
      {
        "q": {
          "en": "How often should a micro tiller be serviced?"
        },
        "a": {
          "en": "Three intervals. Five minutes before every working day to check fuel, oil, the air filter, the fuel tap and lines, the blades and the guards. About an hour weekly on the drive, the greased joints, the blades, the gearbox oil and the fuel filter. Monthly and at the end of the season for the air cleaner, the spark plug, the carburettor, the gearbox oil and off-season storage."
        }
      },
      {
        "q": {
          "en": "What is the most common cause of a tiller that will not start?"
        },
        "a": {
          "en": "The fuel system. Check the tank, that the tap is open, that no water or dirt has collected in the filter bowl, then the air filter, the choke and the spark plug. Water in the fuel is what turns a machine that started yesterday into one that will not start today."
        }
      },
      {
        "q": {
          "en": "Why does the engine run rough and burn fuel badly?"
        },
        "a": {
          "en": "A blocked air filter. It is the most common reason for it and also the cheapest thing to fix. Remove and clean the filter element rather than just blowing on it."
        }
      },
      {
        "q": {
          "en": "How often should I check the gearbox oil?"
        },
        "a": {
          "en": "Weekly and again monthly. Look for metal in it as well as the level. Fresh oil with metal in it means something inside has been wearing, and it is worth finding out before it becomes a failure."
        }
      },
      {
        "q": {
          "en": "Which spare parts should I keep in the toolbox?"
        },
        "a": {
          "en": "Spare blades and tines, a drive belt or chain set, a set of standard bolts and nuts, a spark plug, an air filter element, a fuel filter, and a good quality fuel line. Keep them in the vehicle, not in a warehouse, because a machine that stops in a field is only fixed by what is in the vehicle with it."
        }
      },
      {
        "q": {
          "en": "How do I store the machine over the dry season?"
        },
        "a": {
          "en": "Drain the fuel if the machine will stand for weeks, clean the machine, oil the exposed metal, cover the intake, and store it dry and off the ground. A machine stored damp will show rust from the first month."
        }
      },
      {
        "q": {
          "en": "What causes vibration in a micro tiller?"
        },
        "a": {
          "en": "Almost always a bent tine or a worn blade group. Check the blades before you look anywhere else, and balance the set if a group is noticeably worn on one side."
        }
      },
      {
        "q": {
          "en": "Do all your machines share the same maintenance routine?"
        },
        "a": {
          "en": "Yes. The 170cc petrol 1WG-4.0AQ, the 178cc diesel 1WG-4.1A and the 186cc diesel 1WG-6.3A all share the same construction, and because the tillers, the ditching machines and the water pumps share a common design, wear parts and consumables are consistent across models. Every machine carries a {{spec:1WG-4.1A:Warranty}} warranty."
        }
      }
    ]
  },
  {
    "slug": "how-to-start-and-operate-a-micro-tiller",
    "cat": "tiller",
    "date": "2026-11-15",
    "img": "tiller-011.jpg",
    "title": {
      "en": "How to Start and Operate a Micro Tiller: A First-Timer's Guide"
    },
    "desc": {
      "en": "Starting order, depth and gear setting, working technique and the faults that look serious but are not. A practical guide to running a micro tiller from our range."
    },
    "body": {
      "en": "## The first ten minutes decide how the day goes\n\nMost people who struggle with a new micro tiller struggle with the same things: they start it in the wrong order, they set the depth wrong, and they work the soil too fast. None of that is difficult to fix, and most of it can be learned in one afternoon. This guide walks through starting, setting up and operating a machine from our range.\n\nEverything here applies to the whole range. The 186cc Tiger [[model:1WG-6.3B-T]] adds electric starting to the manual recoil starter; everything else in the range starts by hand.\n\n### Starting the engine, in the right order\n\n1. **Put the machine on level ground, in gear, and clear of people.** The tines are rotating tools and they do not stop when the engine stops.\n2. **Check the fuel level and the oil level.** Open the tap and check that the fuel filter bowl is clean.\n3. **Set the controls to neutral**, throttle closed, and the depth lever to its shallowest position.\n4. **Engage the clutch lever** — on these machines the clutch is normally open, so it is engaged when the lever is pushed away from the handle.\n5. **Open the fuel tap, and if the engine is cold, close the choke.** Cold start needs a richer mixture; that is what the choke is for.\n6. **Pull the recoil starter.** Pull firmly and smoothly rather than yanking it — a hard yank is what breaks starter cords. The 186cc Tiger [[model:1WG-6.3B-T]] can be started electrically instead.\n7. **Open the choke as soon as the engine catches**, then let it run for a minute before working the throttle.\n\nIf the engine will not start, work through it in this order: is there fuel in the tank, is the fuel tap open, is the air filter clean, is the choke being used correctly, is the spark plug clean. Those five cover nearly every case, and they are in the order that is quickest to check.\n\n### Setting the depth and the gear\n\nWorking depth is set by the depth lever on the handle, and it should be adjusted with the engine stopped. Start shallow on the first pass and deepen it as the soil proves easy to work — a machine that is set too deep on the first pass will fight the operator and can bury itself.\n\nThe gearbox on every machine in the range has two forward gears and one reverse, with a friction-plate clutch that is normally open. The low gear is for breaking new ground and for heavy soil; the high gear is for the finish pass and for transport across the plot. The reverse is for getting out of a corner or a rutted patch without turning the machine around.\n\nThe 170cc petrol [[model:1WG-4.0AQ]] works to {{spec:1WG-4.0AQ:Working depth}}, the 178cc diesel [[model:1WG-4.1A]] to {{spec:1WG-4.1A:Working depth}}, and the 186cc diesel [[model:1WG-6.3A]] to {{spec:1WG-6.3A:Working depth}}.\n\n### Working technique that gets more done per hour\n\n- **Walk at the speed of the machine, not your own.** The tines are designed to be driven by the engine; if you pull the handle back, the blades leave the ground and the work gets worse.\n- **Overlap each pass slightly.** A narrow overlap is what produces a flat, even bed instead of a series of ridges.\n- **Work in the order the ground needs it, not the order that is convenient.** Break the rough ground first with the low gear and a shallow setting, then finish it on the high gear at the depth the crop needs.\n- **Do not work soil that is too wet.** It smears instead of cutting, and it packs down again as it dries. This is the single most common cause of a disappointing first season.\n- **Keep the machine off the headland** if the headland is where you turn. Turning on the headland with the tines in the ground is how a blade gets bent.\n\n### Working around obstacles and in the field\n\nIf the machine hits a stone or a root, the correct response is to release the clutch and lift the handle slightly rather than to force it. Forcing the machine digs in and stalls the engine; lifting the tines and easing forward is faster.\n\nFor narrow work between rows or in an orchard, the narrow-frame 170cc petrol [[model:1WG-4.0AQ]] at {{spec:1WG-4.0AQ:Working width}} and {{spec:1WG-4.0AQ:Net weight}} is much easier to control than the larger machines, and it can be lifted and repositioned by one person.\n\n### Stopping safely\n\nTo stop, take the throttle down, disengage the clutch, and let the engine idle for a moment before switching it off. Never stop the engine with the tines buried in the soil — the rebound can damage the drive. On the 186cc Tiger [[model:1WG-6.3B-T]], use the electric starter to shut down rather than pulling the cord.\n\n### Common problems and what they actually mean\n\n**Engine will not start.** Fuel in the tank, tap open, air filter clean, correct choke, clean spark plug — check those five in that order.\n\n**Engine runs but stalls under load.** Usually a dirty air filter or a loose fuel connection. On a diesel, also check the fuel filter for water.\n\n**Engine smokes.** Blue smoke points to oil in the fuel — check the oil level and the oil cap seal. White smoke on a cold start is condensation and clears once the engine is warm.\n\n**Machine runs but the blades do not turn.** Disengage the clutch lever and check that the drive belt or chain has not come off.\n\n**Vibration.** Almost always a bent tine or a worn blade group. Check the blades before you look anywhere else.\n\n**Tines will not go deep enough.** The soil may be too wet, the depth lever may not be fully released, or the depth stop may have been set for a different position when the machine was last used.\n\n### One last safety note\n\nNever reach into a running machine. Stop the engine before clearing a blade, adjusting the depth, or checking for a wrapped wire, and never lift or carry the machine while the engine is running.\n\nEvery machine in our range carries a {{spec:1WG-4.1A:Warranty}} warranty, and every machine shares the same operating principle, so an operator who has run one model in our range already knows how to run the others. The full range is on the [[cat:tiller|micro tiller pages]], and the [[home|home page]] has the enquiry form if you want a recommendation for a particular crop and plot."
    },
    "faq": [
      {
        "q": {
          "en": "What order do I start a micro tiller in?"
        },
        "a": {
          "en": "Level ground, in gear and clear of people; fuel and oil checked and the fuel tap open; controls in neutral with the throttle closed and the depth lever at its shallowest; clutch engaged; choke closed if the engine is cold; then pull the recoil starter firmly and smoothly. Open the choke as soon as the engine catches and let it run for a minute."
        }
      },
      {
        "q": {
          "en": "Should the choke be closed when starting a cold engine?"
        },
        "a": {
          "en": "Yes. A cold start needs a richer mixture, and that is what the choke is for. Open it as soon as the engine catches."
        }
      },
      {
        "q": {
          "en": "Why does the engine stall when the blades meet resistance?"
        },
        "a": {
          "en": "Check the fuel and air side first, in this order: fuel in the tank, fuel tap open, air filter clean, choke used correctly, spark plug clean. On a diesel, also check the fuel filter for water."
        }
      },
      {
        "q": {
          "en": "How do I set the working depth?"
        },
        "a": {
          "en": "With the depth lever on the handle, and only with the engine stopped. Start shallow on the first pass and deepen it as the soil proves easy to work. A machine set too deep on the first pass fights the operator and can bury itself."
        }
      },
      {
        "q": {
          "en": "Which gear should I use for new ground?"
        },
        "a": {
          "en": "The low gear for breaking new ground and heavy soil, the high gear for the finish pass and for moving across the plot. The reverse gets you out of a corner or a rutted patch without turning the machine around."
        }
      },
      {
        "q": {
          "en": "What should I do if the machine hits a stone or a root?"
        },
        "a": {
          "en": "Release the clutch and lift the handle slightly rather than forcing it. Forcing the machine digs in and stalls the engine; lifting the tines and easing forward is faster."
        }
      },
      {
        "q": {
          "en": "Can I work the soil when it is wet?"
        },
        "a": {
          "en": "No. Working soil that is too wet smears it instead of cutting it, and it packs down again as it dries. Wait for the soil to break cleanly in your hand before starting."
        }
      },
      {
        "q": {
          "en": "Is it safe to stop the engine with the tines in the soil?"
        },
        "a": {
          "en": "No. Take the throttle down, disengage the clutch and let the engine idle before switching it off. The rebound from stopping with the tines buried can damage the drive."
        }
      }
    ]
  }
];
