# P2 容规划 —— haogeng.net 长尾流量

> 状态：待老板拍板。拍板后再动手写代码和文案。
> 前置：P1 静态站生成器必须先上线（`node scripts/build-static.js .`），否则新文章页没有 URL 体系依托。

---

## 一、P2 到底解决什么问题

P1 做完，站点有 162 个页面，但**全是产品说明书型页面**。搜这类词能接住：

- `1WG-4.05A`（型号）
- `173cc diesel micro tiller`（参数）
- `Liuzhou Haogeng`（品牌）

搜这类词**一篇都接不住**（这才是有量的词）：

- `how to choose a micro tiller for small farms`
- `diesel vs gasoline tiller kenya`
- `which water pump for irrigation 2 inch or 3 inch`
- `micro tiller for paddy field`
- `tiller maintenance schedule`

买家在搜索"怎么选"，不是在搜"某个型号的参数"。P2 就是补上这层。

---

## 二、页面类型（4 类）

| 类型 | 作用 | 数量建议 | 商业价值 |
|---|---|---|---|
| **选型指南** How to choose | 买家决策前期，流量最大 | 每品类 3 篇 × 6 语种 | 高 |
| **对比页** Compare | 决策中期 | 4-6 篇 | 高（最容易转化） |
| **使用/维护** How to use & maintain | 长尾 + 专业度 + 减少售后扯皮 | 每品类 1-2 篇 | 中（但做信任） |
| **FAQ** | 长尾 + 结构化数据富摘要 | 每语种 1 页 + 品类页内嵌 | 中 |

---

## 三、首批文章清单（EN 母稿 10 篇 + 对比 4 篇 + FAQ 1 页）

### 选型指南
| slug | 内容 | 对应落地页 |
|---|---|---|
| `how-to-choose-a-micro-tiller` | 170/173/178/186 + 汽油/柴油怎么按地块选 | `/en/micro-tiller.html` |
| `gasoline-vs-diesel-micro-tiller` | 油料成本 vs 机价 vs 备件（肯尼亚/东非核心篇） | `/en/micro-tiller.html` |
| `micro-tiller-vs-ditching-machine` | 一机两用怎么算账 | `/en/micro-tiller.html` |
| `micro-tiller-for-smallholder-farms` | 0.5-2 公顷小农场景 | `/en/micro-tiller.html` |
| `micro-tiller-for-orchards-and-vineyards` | 果园/葡萄园行间 | `/en/micro-tiller.html` |
| `how-to-choose-a-water-pump` | 口径/扬程/流量/自吸/柴油井泵 | `/en/water-pump.html` |
| `self-priming-vs-centrifugal-pump` | 自吸泵 vs 离心泵 | `/en/water-pump.html` |

### 使用/维护
| slug | 内容 |
|---|---|
| `micro-tiller-maintenance-schedule` | 换刀/换油/离合/皮带/存放 |
| `how-to-start-and-operate-a-micro-tiller` | 起步、换挡、挂犁、常见故障 |

### 对比页
| slug | 内容 |
|---|---|
| `170-vs-173-vs-178-vs-186-micro-tiller` | 四个排量横向对比（参数自动填） |
| `2-inch-vs-3-inch-water-pump` | 2 寸 / 3 寸泵 |
| `belt-drive-vs-direct-drive-pump` | 皮带款 vs 直连款 |

### FAQ
| slug | 内容 |
|---|---|
| `micro-tiller-faq` | 25-30 条：能买多少台/多久交货/怎么付款/配件怎么订/操作培训/语言说明书 等 |

> ⚠️ FAQ 里**不写价格、不写交货天数、不写付款方式**——这些只有老板知道真实政策。留成「询盘里告诉我们」句式，或老板给真实政策后再补。

---

## 四、URL 规则（跟 P1 一样，一上线就不能改）

```
/{en,zh,sw,es,ru,fr}/guides.html                    指南索引页（6）
/{en,zh,sw,es,ru,fr}/guide/{slug}.html              文章页（10-14 × 6）
/{en,zh,sw,es,ru,fr}/faq.html                       FAQ 页（6）
```

实现：在 `js/seo-urls.js` 加三个函数（浏览器端 + 生成器共用）：

```js
function guidePath(slug, lang){ return '/'+lang+'/guide/'+slug+'.html'; }
function guidesIndexPath(lang){ return '/'+lang+'/guides.html'; }
function faqPath(lang){ return '/'+lang+'/faq.html'; }
```

slug 用英文全局统一（各语种共用同一个 slug，只换路径前缀），这样 hreflang 互指最省事。

---

## 五、关键设计：参数用占位符自动填，杜绝"文章和产品表打架"

**问题**：文章里写"3.5 kW / 5-15 HP"，产品表以后改成别的，就会变成内容不一致 —— 对 SEO 和客户信任都是负分。

**做法**：文章正文里写占位符，生成器从 `js/products.js` 现取现填：

{% raw %}
{% raw %}额定功率 {{spec:1WG-4.05A:Rated power}}，耕幅 {{spec:1WG-4.05A:Working width}}，{% endraw %}
{% raw %}重 {{spec:1WG-4.05A:Net weight}}。{% endraw %}
{% raw %}
{% endraw %}

生成器渲染时 → "额定功率 3.5 kW / 5-15 HP @ 3600 rpm，耕幅 800-1050 mm（可调），重 105 kg。"

好处：
1. 参数永远和产品表一致，**不需要老板反复校对数字**
2. 产品更新 → 文章自动更新
3. 生成器报告能列出"文章引用了不存在的型号/字段"，写错立刻暴露
4. 改一个字段，10 篇文章一起改

**这条是这个方案里最重要的东西。** 有了它，AI 起草文章就不会出现"编参数"的风险 —— 参数根本不是 AI 写的，是从你的产品表读出来的。

### AI 可以写什么 / 不能写什么

| AI 可以写 | AI 不能写（要老板给或删掉） |
|---|---|
| 选型逻辑、对比思路、场景描述 | 价格、单价、折扣 |
| 从 products.js 取的全部技术参数 | 交货周期、库存量、产能数字 |
| 结构化小标题、FAQ 问题措辞 | 客户证言、订单案例、出口数据 |
| 维护步骤、操作说明 | 认证状态（KEBS 等）、售后承诺条款 |
| 翻译 | 保修条款（除非产品表里有 `Warranty: 1 year` 这类真实字段） |

---

## 六、内容文件与生成器改造

### 新增 `content/articles.js`
结构跟 `js/products.js` 一致，方便同一套工具处理：

{% raw %}
var ARTICLES = [
  {
    slug: "how-to-choose-a-micro-tiller",
    cat: "tiller",                 // 关联品类（用于自动内链）
    title: { en: "...", sw: "...", es: "...", ru: "...", fr: "...", zh: "..." },
    desc:  { en: "..." },          // meta description
    date:  "2026-11-20",
    img:   "guide-choose-tiller.jpg",
    body:  { en: "## ...\n\n段落...{{spec:1WG-4.05A:Rated power}}..." },
    faq:   [ { q: {en:"..."}, a: {en:"..."} }, ... ]   // 可选，渲染成 FAQPage
  }
];
```
{% endraw %}
{% endraw %}

**母稿策略**：EN 先写全 → 老板校术语 → 批量翻 5 语。缺语种时回落 EN，并在生成器报告里列出（跟 i18n 缺 key 一个机制）。**zh 不值得重投入**（出口站，中文只服务华人经销商），可以最后做或不做。

### `scripts/build-static.js` 新增
- `buildArticle(article, lang)` → `/{lang}/guide/{slug}.html`
- `buildFaq()` → `/{lang}/faq.html`
- `buildGuidesIndex()` → `/{lang}/guides.html`
- 首页加「选型指南」区块（每语种 6 篇精选 + 入口）
- 品类页加「相关指南」+ 内嵌 FAQ 区块（FAQPage 结构化数据挂在这里）
- 产品页底部加「相关指南」（消孤岛页）
- 导航栏加「Guides」项，页脚加指南索引链接
- sitemap 加全部新 URL + `xhtml:link` 互指 + lastmod
- 报告：缺翻译的文章、引用了不存在型号的文章、图片缺失的文章

---

## 七、结构化数据

- **Article**：`headline`、`datePublished`、`dateModified`(BUILD_DATE)、`author`=Organization、`publisher`、`image`、`mainEntityOfPage`、`inLanguage`
- **FAQPage**：只在页面**可见**的 FAQ 区块上标（Google 要求可见，否则可能被罚）
- **BreadcrumbList**：已有，每篇文章加"首页 › 指南 › 本文"
- ⚠️ 不给文章加 `offers`（同上，价格为 0 会被整块忽略）

---

## 八、内部链接（决定收录速度，比文章数量更重要）

每篇文章必须带 3-5 条内链，闭环：

```
文章 ──→ 品类落地页 ──→ 产品页 ──→ 相关指南 ──→ 文章
```

- 文章正文提到具体型号时，**自动链到该产品页**（占位符机制顺带做掉）
- 每个产品页底部挂 2-3 篇相关指南
- 品类页挂 3-5 篇指南 + FAQ
- 首页挂指南入口

孤岛页（谁都不链它）Google 基本不收录。

---

## 九、语言与市场优先顺序（建议）

| 批次 | 语种 | 对应市场 | 理由 |
|---|---|---|---|
| **第一批** | EN + SW + FR | 全球 / 肯尼亚·坦桑·埃塞 / 西非 | 主战场 |
| 第二批 | ES | 拉美 | 有量但不是当前重点 |
| 第三批 | RU | 独联体 | 有量但不是当前重点 |
| 可选 | ZH | 华人经销商 | 优先级最低 |

第一批工作量：10 选型 + 4 对比 + 1 FAQ = 15 篇 × 3 语种 + 3 索引 = **48 个新页面**。

⚠️ **市场提醒**：173 型号在肯尼亚撞二手 Honda 红海（既有业务结论），面向肯尼亚/东非的文章里**不要把 173 当主推**，主推 170 / 178 / 186；对比页可以做，但要写成"按排量选"而不是"173 最好"。

---

## 十、工作流（老板拍板才动手）

1. **我起草 EN 母稿**（10 选型 + 4 对比 + 1 FAQ），参数全部用占位符，不编任何数字
2. **老板只校两件事**：① 想主打哪个型号 ② 术语/口吻（有没有写错市场情况，比如把肯尼亚写成坦桑尼亚）
3. 老板回稿 → **我做 SW / FR / ES / RU 翻译**（同一套占位符，翻译只动文字不动数字）
4. 生成器跑 → 报告 → 老板看页面
5. 上线 → GSC 提交 sitemap → 2 个月看曝光

---

## 十一、验收标准

- 每篇 ≥600 词，1 个 H2 + 3-4 个 H3，3 条以上内链，1 张首图
- 首图必须是工厂/产品实拍（Article 缺 image 会被降权）
- 生成器报告里「缺翻译」「引用不存在型号」两项必须清零
- GSC 提交后 7 天内开始有索引，60 天看 "how to" / "vs" 类词曝光
- 全站零假价格、假交货期、假证言

---

## 十二、不用等拍板就能做的部分（低风险技术底座）

1. `js/seo-urls.js` 加 `guidePath` / `guidesIndexPath` / `faqPath`
2. `content/articles.js` 骨架 + 空数组
{% raw %}{% raw %}3. `scripts/build-static.js` 加 spec 占位符解析器 `{{spec:型号:字段}}`（先只做解析和报告，不写文章）{% endraw %}{% endraw %}
4. 报告里加「占位符引用检查」

这四样做完，文章随时可以灌进去，不用再改生成器。

---

## 十三、执行记录（2026-11-14）

### 已完成

1. `js/seo-urls.js`：加 `guidesIndexPath` / `guidePath` / `faqPath`（浏览器 + 生成器共用一份）
2. `js/i18n.js`：6 个语种各加 `nav.guides` + `articles` 字典块（indexTitle / indexLead / related / allGuides / backToGuides / updated / published / faqTitle / faqLead / readMore）
3. `content/articles.js`：骨架 + 结构说明 + 第一篇 EN 母稿
4. `scripts/build-static.js`：
{% raw %}{% raw %}   - `{{spec:型号:字段}}` 占位符解析（写错进报告，必须清零）{% endraw %}{% endraw %}
   - `[[model:型号]]` / `[[cat:品类|文字]]` / `[[home|文字]]` 三种站内链接占位符（跨语种自动改路径）
   - `buildGuidesIndex` / `buildArticle` / `buildFaq` 三个页面生成器
   - 首页挂指南区块、品类页与产品页挂相关指南、导航加 Guides 入口（该语种无文章时不加，避免死链）
   - sitemap 加新 URL；报告加「文章缺翻译 / 参数占位符错误 / 文章缺首图」
5. `css/style.css`：`.guide-grid` `.guide-card` `.article-body` `.article-faq` `.article-related` `.article-cover` 等样式（v14 → v15）
6. 首篇 EN 母稿：`how-to-choose-a-micro-tiller`

### 待办

- 老板校 EN 母稿：术语、口吻、**主推哪个排量**（173 在肯尼亚撞二手红海，面向东非建议主推 170 / 178 / 186）
- EN 定稿后做 SW / FR 翻译（占位符不动，只动文字）
- 剩余 14 篇 EN 母稿
- 数据待澄清（**未擅自改动**）：`1WG-4.1B` 名称写 "Diesel" 但参数是汽油；`1WG-4.05ZM` 的 `features.zh` 写 "173cc gasoline" 但发动机是柴油 → 生成出的 URL 会与页面标题对不上
- 首图：当前用 `news-showroom.jpg`（真实展厅照）顶着，正式图待补

---

## 2026-11-15 执行记录 · 阶段 A（基建）

| 项 | 结果 |
|---|---|
| 页面数 | 165 → **171**（新增 `/{lang}/factory.html` × 6 语种） |
| T1 参数跨语种 | `specValue()` 改为「先在 `specs.en` 定位行号 → 取目标语种同一行」，并新增「各语种参数行数与 en 一致」报告（当前 0 问题） |
| 工厂页 | 新 URL `/{lang}/factory.html`；`js/seo-urls.js` 加 `factoryPath()`；`js/i18n.js` 加 `factory` 字典（6 语种）+ `nav.factory`；生成器加 `buildFactory()`，JSON-LD 为 WebPage + BreadcrumbList，**不含 offers** |
| 图集 | `news-showroom.jpg` / `news-assembly.jpg` / `news-packing.jpg` + `tiller-001.jpg` / `ditch-001.jpg` / `pump-001.jpg`（全部现有实拍，无新造图） |
| 首页入口 | about 区第 4 张卡片「工厂实拍」，按语种指向 `/{lang}/factory.html` |
| CSS | 新增 `.factory-gallery` / `.factory-photo` / `.factory-block`，`style.css?v=15` → `v=16`（index.html + product.html 同步） |
| 自检 | `node scripts/build-static.js .` → i18n 齐全、参数占位符全解析、sitemap 171 条无重复；`python scripts/seo_check.py` → **全部通过** |

**文案红线**：工厂页只复用站内既有事实（CNC 激光切割/折弯/切管/焊接、国家实用新型专利、4WD 微耕机为国家农机推广产品、斯里兰卡单年 300 台），不写产能、面积、人数、认证清单、出口国家数。

**后续**：B 英文 10 篇（→180）· C SW+FR（→204）· D ES+RU（→228）· E ZH（→240）。


---

## 2026-11-15 执行记录 · 阶段 B（英文母稿 10 篇）

| 项 | 结果 |
|---|---|
| 页面数 | 171 → **180**（新增 `/{lang}/guide/*.html` × 10 + `/{lang}/guides.html` + `/{lang}/faq.html`） |
| 文章 | 10 篇 EN：选型 5（how-to-choose-a-micro-tiller / gasoline-vs-diesel / smallholder / orchards-and-vineyards / how-to-choose-a-water-pump）+ 对比 3（170-vs-173-vs-178-vs-186 / tiller-vs-ditching / self-priming-vs-centrifugal）+ 使用维护 2（maintenance-schedule / how-to-start-and-operate） |
| 每篇规格 | 600–1100 词 · 1 个 H2 + 3–4 个 H3 · ≥3 条内链 · 6–8 条 FAQ；FAQ 合计 **78 条** 聚合到 `/en/faq.html` |
{% raw %}{% raw %}| 参数 | 全部走 `{{spec:型号:字段}}`，从 `js/products.js` 现取现填，文章与产品表永远一致；生成器报告「参数占位符错误」= **0** |{% endraw %}{% endraw %}
| 内链 | `[[model:]]` / `[[cat:]]` / `[[home]]` 占位符，跨语种自动改路径；产品页新增「Related guides」区块，按品类自动挂对应指南 |
| 首图 | 全部换成现有实拍：`tiller-001/002/005/007/009/011.jpg`、`ditch-002.jpg`、`pump-001/003.jpg`、`news-assembly.jpg` |
| 结构化数据 | Article + FAQPage + BreadcrumbList + WebPage（**无 offers**），无 `price:0` |
| 上线 | 提交 `2b3210e` 已 push；线上实测 `/en/guides.html`、`/en/faq.html`、`/en/guide/*.html` 全部 200 |

### 本阶段修掉的两个生成器 bug

**1. 型号含双引号的产品无法解析（`inlineMd` 转义顺序）**

泵类产品的 `model` 字段带英寸符号：`2" Centrifugal`、`3" Centrifugal`、`Self-Priming 2~3"`、`Fire 2"`、`195 Diesel`。
原来的 `inlineMd()` 先整体 `esc()`（把 `"` 变成 `&quot;`）再解析 `[[model:...]]`，导致查不到型号，占位符渲染成方括号文字。

改为「占位符先解析 → 转义 → 回填」：占位符换成哨兵 token → 整体转义 → 按 token 回填 HTML。
同时 `[[model:型号|文字]]` 支持可选锚文本，泵类链接显示产品名（`2-inch Centrifugal Pump`）而不是型号原文。

**2. 泵的 `model` 字段与 `id` 字段不是一回事**

`productByModel()` 匹配的是 `model` 字段，不是 `id`。泵的 `id` 是 `2in-Centrifugal`，`model` 是 `2" Centrifugal`，写错会静默解析成裸文本。**已核对 23 个产品的 `model` 值**（tiller 11 + ditching 4 + pump 8）。

### 内容红线自检

10 篇正文 grep `price|USD|lead time|payment terms|MOQ|testimonial|certificate|stock` → 唯一命中是「the petrol machines still win on purchase price」这句**相对比较**，不含任何具体价格、交期、付款条件、证言或认证声明。

### 后续

{% raw %}{% raw %}C SW + FR（→204）· D ES + RU（→228）· E ZH（→240）。翻译时**只动文字不动数字**：`{{spec:}}` `[[model:]]` `[[cat:]]` 原样保留，型号与单位不翻译。{% endraw %}{% endraw %}

## 2026-11-15 执行记录 · 阶段 B.1（顶部导航补「常见问题」入口）

提交 `2dc6b1b`，185 files changed。页面数不变（180）。

**问题**：`/{lang}/faq.html`（78 条问答）原本只能从 `/{lang}/guides.html` 进入 —— 首页一跳到 FAQ 页面是 **2 跳**，且首页 / 品类页 / 产品页全都没有入口。FAQ 页是最容易被搜索引擎收录成"答案页"的一块内容。

**改动**：

| 文件 | 改动 |
|---|---|
| `scripts/build-static.js` | `addGuidesNav` → `addContentNav`，一次注入「选型指南 / 常见问题」两个入口；链接**追加在导航末尾**（原来 Guides 被插在最前面，顺序不合理）；注入前先 trim 掉 nav 内尾部空白 |
| `js/i18n.js` | 6 语种 `nav` 各加 `faq: "FAQ"` |
| `css/style.css` | 新增 `@media (max-width: 1100px) { .menu { gap: 13px; } }`（C/D/E 完成后导航变 8 项，防中屏溢出）；`?v=16` → `?v=17` |
| `index.html` / `product.html` | CSS 版本号同步 bump |

**死链防护**：注入条件仍是 `articlesOfLang(lang).length` —— 该语种没有文章时，`guides.html` / `faq.html` 两个页面根本不生成，导航也不会出现这两个链接。目前 zh/sw/es/ru/fr 0 篇 → 导航无这两个入口（线上实测 `zh/` 的 `nav-faq` 计数 = 0）。

**线上实测**：`/en/` → `nav-faq` 1 处、`style.css?v=17` 1 处；`/en/faq.html`、`/en/guides.html`、产品页均 200；`/zh/` 无 `nav-faq`；sitemap 180 条。`seo_check.py` 八项全过。

## 2026-11-15 执行记录 · 阶段 C（斯瓦希里语 + 法语 10 篇）

提交 `91793b3`。页面数 **180 → 204**（+24 = 2 语种 × (10 篇文章 + guides 索引 + faq 聚合)）。

### 为什么 SW / FR 先做

老板拍板「EN 10 篇 + 全 6 语种」，语种顺序按主战场排：**EN → SW（肯尼亚/东非）→ FR（西非）→ ES（拉美）→ RU（独联体）→ ZH（华人经销商，最后做）**。

### 做法：`_meta_lang/` 覆盖层 + 按索引合并 FAQ

原 `_asm.py` 的写法是「每语种把 FAQ 数组 append 进去」，一旦多语种就会**条目重复**；而 `faqText(f, lang, where)` 的取值是 `f.q[lang] || f.q.en`，取不到就**回落成英文** —— SW/FR 的 FAQ 页面会混进大段英文。

改成：EN 母稿仍放 `_meta/*.json`，每个译语种单独放 `_meta_lang/<slug>.<lang>.json`（`title` / `desc` / `faq[{q,a}]`），组装时

1. 以 `_meta/*.json` 为底，叠加 `_meta_lang/` 覆盖层，得到每语种一份完整条目；
2. **FAQ 按索引合并**：`entry['faq'][i]['q'][lang] = ...` —— 第 i 条问答在所有语种间一一对应，不会重复、也不会掉进英文回落；
3. 正文从 `_bodies/<slug>.<lang>.md` 读取，缺失即该语种不生成文章（`[文章缺翻译]` 报错）。

组装脚本仍是沙盒临时文件 `_asm.py`（**不入库**），生成物只有 `content/articles.js`。

### 本阶段产出

| 项 | 数量 |
|---|---|
| 正文分片 `_bodies/*.sw.md` / `*.fr.md` | 20 篇（每篇 1 个 H2 + 3–4 个 H3，3 条以上内链） |
| 元数据覆盖层 `_meta_lang/*.json` | 20 个（title + desc + 6–8 条 FAQ） |
| 新增页面 | `/sw/guide/*` 10、`/fr/guide/*` 10、`/sw/guides.html`、`/fr/guides.html`、`/sw/faq.html`、`/fr/faq.html` |
| FAQ 聚合 | 每语种 78 条（10 篇 × 6–8 条），FAQPage 结构化数据同步生成 |

### 翻译红线执行情况

{% raw %}{% raw %}- **数字全部走 `{{spec:}}` 占位符**（`Rated power` / `Working width` / `Max total head` / `Net weight` …），生成时从 `js/products.js` 现取现填，译文不可能写错参数；{% endraw %}{% endraw %}
- 泵类型号带英寸符号（`2" Centrifugal`），组装时用 `@@` 占位再还原成 ASCII 双引号，避免与 Python 字符串引号冲突；
- 术语沿用站内既有叫法：SW `matrekta / mashine ya makorongo / pampu ya maji`、FR `motoculteur / machine à fosses / pompe à eau`；产品显示名直接取 `js/products.js` 的 `name[sw]` / `name[fr]`；
- **英文漏词自检**：对 20 篇译文做词表扫描，命中并修正：`throughout` → `kwa kipindi chote cha msimu`、`gears` → `gear`、`blade` → `mata`、`meta`（错字）→ `mata`、`fixed` → `thabiti`；FR 侧扫描命中项经复核全部是法语正词（machine / diesel / simple / service …），无需改。

### 验证（本地 + 线上）

| 项 | 结果 |
|---|---|
| 页面数 | 204（sitemap 204 条，无重复） |
| 生成器报告 | `[i18n 缺失]` 0 · `[文章缺翻译]` 0 · `[参数占位符错误]` 0 · `[文章缺首图]` 0 · 参数行数 6 语种与 en 一致 |
| `seo_check.py` | 八项全过（JSON-LD 206 页可解析、hreflang 双向互指、canonical 自指、无乱码、sitemap 全覆盖） |
{% raw %}{% raw %}| 占位符残留 | 全库 grep `{{spec:` 与 `[Rated power]` = 0 |{% endraw %}{% endraw %}
| 语言泄漏 | SW/FR 的 78 条 FAQ 与 EN 逐条比对，重复 = 0 |
| 线上实测 | `/sw/` `/fr/` `/sw/guides.html` `/fr/guides.html` `/sw/faq.html`（78 条）`/fr/faq.html`（78 条）`/sw/guide/*` `/fr/guide/*` 全部 200；EN 文章页 hreflang 已指向 sw/fr 对应译文，语言切换器也指向译文页 |

### 副作用（预期内）

- EN 文章页新增 `hreflang="sw"` / `hreflang="fr"` 互指，语言切换器 SW/FR 从首页改为跳对应译文页；
- SW / FR 首页、品类页、产品页顶部导航出现「Guides / FAQ」入口，产品页出现「Miongozo zinazohusiana / Guides associés」相关指南区块。

### 后续

D ES + RU（→228）· E ZH（→240）。临时文件 `_asm.py` `_meta/` `_meta_lang/` `_bodies/` `_articles_header.txt` **只留在沙盒**（`~/.claude/workspace/haogeng-p0-sandbox`），不入库。

---

## Stage D / E / F —— ES + RU + ZH 全部补齐 + 工厂实拍入口（2026-11-16，线上 204 → 240 页）

老板指示「赶紧把网站做出来，haogeng.net 很多地方都没有数据」→ Stage D（ES+RU）与 Stage E（ZH）恢复上线，并合并本轮工厂实拍交互改造。线上页数 **204 → 240**。

### Stage D（西语 + 俄语）→ 228 页（曾上线，后被 `bb2599a` 撤回，本次一并恢复）

| 语种 | 指南 | 索引 | FAQ | 新增页 |
|---|---|---|---|---|
| ES | 10 篇 | `/es/guides.html` | `/es/faq.html`（78 条） | 12 |
| RU | 10 篇 | `/ru/guides.html` | `/ru/faq.html`（78 条） | 12 |

### Stage E（中文）→ 240 页

| 语种 | 指南 | 索引 | FAQ | 新增页 |
|---|---|---|---|---|
| ZH | 10 篇 | `/zh/guides.html` | `/zh/faq.html`（78 条） | 12 |

6 语种现共 **60 篇文章页 + 6 个指南索引 + 6 个 FAQ 聚合页 + 6 个工厂页**，总页数 240。

### Stage F：工厂实拍「点击入口」改造（本轮新增，老板提的「工厂实拍没有点击按钮」）

原方案只写了 `nav.factory` 字典项，**导航 HTML 从未接入**，工厂页等于没有入口。本次补齐：

| 改动 | 文件 | 说明 |
|---|---|---|
| 导航接入「工厂实拍」 | `scripts/build-static.js`（`addContentNav`） | 首页 `<nav class="menu" id="menu">` 与内页 `<ul class="nav-menu" id="navMenu">` **两套导航结构都注入**「工厂实拍」入口，排在「媒体报道」之后、「选型指南」之前；6 语种各一条 |
| 照片可点开大图 | `scripts/build-static.js`（`factoryGalleryHtml`） | 每张实拍图包一层 `<a class="factory-photo-link" href="/images/xxx.jpg" target="_blank" rel="noopener">`，纯 HTML 无 JS；图下加「查看大图」提示（`factory.full`，6 语种） |
| 图集下方加 CTA | `scripts/build-static.js`（`buildFactory`） | 6 张图**正下方**直接给「获取报价」按钮（原来要翻到页面最底部才看得到） |
| 导航字号/间距 | `css/style.css`、`css/product.css` | 导航字号 16 → 15px，间距 24 → 20px（≤1180px 时 13px）；加第 9 项后不再换行 |
| 汉堡断点前移 | `css/style.css`、`css/product.css` | 折叠断点 640px → 1100px，平板宽度也出汉堡，避免第 9 项挤爆导航 |
| 词条缩短（4 处） | `js/i18n.js` | RU `why`: «Преимущества» → «Плюсы»；RU `tagline` → «Сельхозтехника»；FR `factory`: «Notre usine» → «L'usine»；FR `inquiry`: «Demander un devis» → «Devis» |
| **修掉一个线上老 bug** | `js/main.js` | 内页的 `#navToggle` / `#navMenu` **从来没被绑定** → 手机上工厂页/指南页/FAQ 页/文章页/品类页的 ☰ 按钮点了没反应、且**整站无导航**。本次让首页 `#menuToggle` 与内页 `#navToggle` 两套都绑定 |
| 资源版本 | `index.html`、`product.html`、`404.html` | js `?v=39`、`css/style.css?v=18`、`css/product.css?v=7`（旧值 37/17/6，避免 CDN 缓存旧文件） |

### 验证

| 项 | 结果 |
|---|---|
| 页面数 | 240（sitemap 240 条，重复 0） |
| 生成器报告 | `[i18n 缺失]` 0 · 6 语种 × 10 篇正文齐全 · FAQ 每语种 78 条 · `[参数占位符错误]` 0 · 参数行数 6 语种与 en 一致 |
| `seo_check.py` | 八项全过（JSON-LD 242 页可解析、hreflang 双向互指、canonical 自指、sitemap 全覆盖、无乱码、脚本版本一致） |
{% raw %}{% raw %}| 占位符残留 | 244 个静态页全扫 `{{spec:` / `[[model:` / `[[cat:` / `[Rated power]` = **0** |{% endraw %}{% endraw %}
| 导航回归（Playwright） | 6 语种 × 4 类页面 × 14 档宽度 = 336 组：>1100px **无一链接换行**、每页固定 9 项；≤1100px 汉堡可展开且含「工厂实拍」 |
| 照片可点 | 6 张图链接全部 200（image/jpeg），点击新标签打开原图；CTA 指向 `/{lang}/#contact` |
| 旧版本对比 | 线上原 204 页 → 现 240 页；新增 es/ru/zh 各 12 页 + 6 语种导航与工厂页改造 |

### 仍未做（等老板给料，不编）

价格表 / 交期 / 付款方式 / MOQ / 产能数字 / 厂房面积 / 员工数 / 认证清单 / 出口国家数 / 客户证言 —— 一律不编。立创机械成立年份、统一社会信用代码、`Warranty: 1 year` 实质确认、`1WG-4.1B`（名称写 Diesel 但参数是汽油）与 `1WG-4.05ZM`（features.zh 写 173cc 汽油但发动机是柴油）两处数据不一致**只 flag 不擅改**。

---

## 插曲：Pages 构建失败，线上冻结在 204 页（2026-11-16 11:20 → 12:05）

推 `f3f1c9a`（240 页）后线上一直没变。查 GitHub Actions：`pages build and deployment` 这条内部 workflow **连续 4 次失败**（含 Stage C 的 docs 提交、Stage D、revert、本次），失败步骤都是 `Build with Jekyll`，报错：

{% raw %}
Rendering Liquid: docs/P2-content-plan.md
Error: Liquid syntax error (line 376): Variable '{{spec:...'
```
{% endraw %}

**根因**：本仓库的 Pages 用 **Jekyll** 构建（动态 Pages workflow），所有 `.md` / `.html` 会被 **Liquid** 渲染。开发日志里写的双花括号占位符写法被 Liquid 当成变量 → 语法错误 → 构建整体失败 → **部署根本没发生**，所以线上还停在最后一次成功构建（2026-11-15 13:18Z，204 页）。

**修法**：把 `README.md` 和 `docs/P2-content-plan.md` 里所有裸露的双花括号用 Jekyll 的 raw 块包起来（内容一字未改）。并在 `scripts/seo_check.py` 加了**第 9 项检查**：扫描仓库内所有 `.md` / `.html`，只要有裸露的双花括号就报失败——以后再往文档里写占位符，不会再把线上打挂。

> 教训：文档里出现 Liquid 语法 = 线上发布事故。以后写文档避免裸双花括号，或统一走 raw 块。
