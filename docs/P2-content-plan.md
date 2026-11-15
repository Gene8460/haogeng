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

```
额定功率 {{spec:1WG-4.05A:Rated power}}，耕幅 {{spec:1WG-4.05A:Working width}}，
重 {{spec:1WG-4.05A:Net weight}}。
```

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

```js
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
3. `scripts/build-static.js` 加 spec 占位符解析器 `{{spec:型号:字段}}`（先只做解析和报告，不写文章）
4. 报告里加「占位符引用检查」

这四样做完，文章随时可以灌进去，不用再改生成器。

---

## 十三、执行记录（2026-11-14）

### 已完成

1. `js/seo-urls.js`：加 `guidesIndexPath` / `guidePath` / `faqPath`（浏览器 + 生成器共用一份）
2. `js/i18n.js`：6 个语种各加 `nav.guides` + `articles` 字典块（indexTitle / indexLead / related / allGuides / backToGuides / updated / published / faqTitle / faqLead / readMore）
3. `content/articles.js`：骨架 + 结构说明 + 第一篇 EN 母稿
4. `scripts/build-static.js`：
   - `{{spec:型号:字段}}` 占位符解析（写错进报告，必须清零）
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

