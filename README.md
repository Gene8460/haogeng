# 柳州浩耕国际 — 外贸网站使用说明

## 网站是什么

一套**纯静态**外贸展示网站，无需服务器，可免费托管在 GitHub Pages / Gitee Pages。

- 主页默认**英文**，右上角可切换 中文 / 英文 / 西班牙语 / 俄语 / 法语
- 产品按三大类展示：微耕机、开沟培土机、抽水机
- 有询盘表单（点击后打开访客的邮箱客户端，直接发到你邮箱）

## 目录结构

```
haogeng-website/
├── index.html          # 页面结构（一般不用动）
├── product.html        # 详情页模板
├── css/
│   ├── style.css       # 首页样式
│   └── product.css     # 详情页样式
├── js/
│   ├── i18n.js         # ★ 多语言文字（改文案在这里）
│   ├── products.js     # ★ 产品数据（加/改产品在这里）
│   ├── product.js      # 详情页渲染
│   └── main.js         # 逻辑（一般不用动）
├── images/             # ★ 产品图片放这里
├── robots.txt          # 搜索引擎爬虫规则
├── sitemap.xml         # 站点地图
└── README.md           # 本说明
```

## 日常怎么维护（改这 2 个文件就够）

### 1. 改产品 / 加产品 → 打开 `js/products.js`

每个产品是一段这样的代码：

```js
{
  id: "tiller-001",
  name: { en: "170 Gasoline Micro Tiller", zh: "170汽油微耕机" },
  model: "1WG-4.0AQ",
  cat: "tiller",                      // 分类：tiller/ditching/pump
  specs: { en: ["...", "..."], zh: ["...", "..."], es: [...], ru: [...], fr: [...] },
  img: "tiller-001.jpg",              // 主图（放 images/）
  gallery: ["tiller-001-2.jpg"],      // 选填：详情页图集
  desc:    { en: "...", zh: "...", es: "...", ru: "...", fr: "..." },
  bestFor: { en: [...], zh: [...], ... },
  features:{ en: [...], zh: [...], ... }
}
```

- **加新产品**：复制一段，改文字即可。`id` 必须唯一
- **改参数**：改 `specs` 里的内容（**5 个语种都要改**，否则其他语种会回退到英文）
- **配图片**：图片放到 `images/` 文件夹，`img` 填文件名
- **配图集**：`gallery` 数组里的图会出现在详情页轮播里

### 2. 改文案 / 换语言 → 打开 `js/i18n.js`

里面按语言分了字典（en / zh / es / ru / fr），想改哪句就找到对应文字改掉。

例如改英文首页标题：
```js
title: "Factory-Direct Agricultural Machinery",
```
改成：
```js
title: "Your New Title Here",
```

### 3. 换联系方式（邮箱/电话/地址）

打开 `index.html`，搜索 `138 7722 8460` 和 `sales@haogeng.net`，换成你的真实信息。
**三处都要改**：
1. 页面显示的 `contact-info` 区块
2. `js/main.js` 里 `WA_NUMBER` 和 `MAIL_TO` 两个常量
3. `js/product.js` 里同样两个常量（询盘弹窗）

## 分类对照

| cat 值 | 含义 |
|--------|------|
| `tiller` | 微耕机 |
| `ditching` | 开沟培土机 |
| `pump` | 抽水机 |

## 当前联系方式

- **WhatsApp / Phone**：+86 138 7722 8460
- **Email**：sales@haogeng.net
- **地址**：No. 86, Liugong Avenue, Liunan District, Liuzhou City, Guangxi, China

## SEO 必做项

- ✅ Open Graph + Twitter Card（分享到 WhatsApp/Facebook/LinkedIn 才有缩略图）
- ✅ hreflang 多语言版本声明
- ✅ JSON-LD Product schema（详情页已加）
- ✅ robots.txt + sitemap.xml
- ⚠️ 上线后到 Google Search Console 提交 sitemap：`https://haogeng.net/sitemap.xml`
- ⚠️ 上线后到 Bing Webmaster 提交一次

## 分析追踪

- **Google Analytics 4**：测量 ID `G-EN7BG78YJV`（在 `index.html` 和 `product.html` 的 `<head>`）
- **Microsoft Clarity**：项目 ID `yc0hril0fu`
- 已埋事件：`view_product`（产品卡片点击）、`language_switch`、`generate_lead`（询盘提交）、`contact`（WhatsApp/Email 点击）

## 如何免费上线

1. 注册 GitHub 账号 → 新建仓库 `haogeng`（或 `用户名.github.io`）
2. 把 `haogeng-website` 文件夹里的内容上传
3. Settings → Pages → 选 main 分支根目录 → 保存
4. 得到免费网址 `你的用户名.github.io/haogeng`

（国内可用 Gitee Pages 替代，速度更快）

## 需要改的重要事项（上线前必做）

- [x] 把邮箱换成企业邮箱 `sales@haogeng.net`
- [ ] 把电话 `+86 138 7722 8460` 确认无误
- [ ] 上传所有产品真实图片到 `images/`（当前可能缺 `hero-tiller.jpg`、`tiller_acc_v10.jpg`、`tiller_acc_v11.jpg`）
- [ ] 绑定自己的域名 `haogeng.net`（`CNAME` 文件已写好）
- [ ] 到 Google Search Console 提交 sitemap
- [ ] 检查 GA4 / Clarity ID 是否为你自己的号