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
├── css/style.css       # 样式（一般不用动）
├── js/
│   ├── i18n.js         # ★ 多语言文字（改文案在这里）
│   ├── products.js     # ★ 产品数据（加/改产品在这里）
│   └── main.js         # 逻辑（一般不用动）
├── images/             # ★ 产品图片放这里
└── README.md           # 本说明
```

## 日常怎么维护（改这 2 个文件就够）

### 1. 改产品 / 加产品 → 打开 `js/products.js`

每个产品是一段这样的代码：

```js
{
  name: { en: "170 Gasoline Micro Tiller", zh: "170汽油微耕机" },
  model: "1WG-4.0AQ",
  cat: "tiller",                      // 分类：tiller/ditching/pump
  specs: { en: ["...", "..."], zh: ["...", "..."] },
  img: "product1.jpg"                 // 图片文件名，放 images/ 文件夹
}
```

- **加新产品**：复制一段，改文字即可
- **改参数**：改 `specs` 里的内容
- **配图片**：图片放到 `images/` 文件夹，`img` 填文件名

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

打开 `index.html`，搜索 `sales@haogeng.com` 和 `+86 138 0000 0000`，换成你的真实信息。
（出现两处：一处是页面显示，一处是 `js/main.js` 里的询盘邮箱）

## 分类对照

| cat 值 | 含义 |
|--------|------|
| `tiller` | 微耕机 |
| `ditching` | 开沟培土机 |
| `pump` | 抽水机 |

## 如何免费上线

1. 注册 GitHub 账号 → 新建仓库 `haogeng`
2. 把 `haogeng-website` 文件夹里的内容上传
3. Settings → Pages → 选 main 分支 → 保存
4. 得到免费网址 `你的用户名.github.io/haogeng`

（国内可用 Gitee Pages 替代，速度更快）

## 需要改的重要事项（上线前必做）

- [ ] 把邮箱 `sales@haogeng.com` 换成真实邮箱
- [ ] 把电话 `+86 138 0000 0000` 换成真实电话/WhatsApp
- [ ] 把地址改成完整地址
- [ ] 上传产品真实图片到 `images/`
- [ ] （可选）绑定自己的域名
