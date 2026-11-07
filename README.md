# Taniame · 个人笔记

一个安静、轻量的个人静态网站，使用 **Vue 3 + Vite** 构建。

没有后台、数据库和统计脚本。文章存放在 Markdown 文件里，专栏通过一份配置自动生成。首页会突出最新一篇，并提供“眼下”、专栏目录和归档入口。代码里保留了新增专栏和文章的注释模板，日常更新只需要写文件。

## 页面

- **首页**：主标题、最新文章卡片、眼下清单、最近文章、专栏目录、归档入口
- **专栏**：带最近文章预览的专栏目录
- **归档**：自动按年份分组，并显示文章数量
- **文章**：自动生成 h2/h3 目录，支持平滑滚动
- **关于**：自我介绍、站点信息、偏好与联系方式
- **404**：访问不存在的地址时显示

## 技术栈

- Vue 3（Composition API + `<script setup>`）
- Vue Router 4（hash 模式，静态托管刷新不会 404）
- Vite 6
- Markdown 渲染：marked

## 快速开始

需要 Node.js 20.19+，推荐使用当前 LTS 版本。

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建到 dist/
pnpm build

# 本地预览构建结果
pnpm preview
```

也可以使用 npm：`npm install`、`npm run dev`、`npm run build`。

## 项目结构

```text
.
├── index.html                 # HTML 入口和站点标题
├── public/favicon.svg         # 站点图标
├── src/
│   ├── main.js                # 应用入口
│   ├── App.vue                # 页头、正文、页脚的整体骨架
│   ├── router/index.js        # 路由表
│   ├── components/            # 页头、页脚、文章行、专栏目录行、文章目录等
│   ├── views/                 # 首页、专栏、归档、文章、关于、404
│   ├── composables/           # usePageTitle 等组合式函数
│   ├── data/
│   │   ├── site.js            # 站点名称、简介、链接、导航、眼下与引用
│   │   ├── columns.js         # 专栏配置 + 新增专栏模板
│   │   └── posts.js           # 自动读取 Markdown 的数据层
│   ├── content/               # 文章内容
│   │   ├── README.md          # 文章模板与字段说明
│   │   ├── tech/              # 技术手记
│   │   ├── reading/           # 阅读与思考
│   │   └── life/              # 生活碎片
│   └── styles/main.css        # 全站样式与响应式规则
├── .github/workflows/deploy.yml  # GitHub Pages 自动部署
└── pnpm-workspace.yaml         # 允许 esbuild 安装脚本
```

## 先换成你自己的信息

建议按这个顺序改：

1. `src/data/site.js`：站名、简介、邮箱、GitHub 链接、导航、页脚、“眼下”清单和引用。
2. `src/views/HomeView.vue`：首页主标题与各板块文案。
3. `src/views/AboutView.vue`：关于页的自我介绍、偏好和站点说明。
4. `index.html`：页面 `<title>` 和 `description`。
5. `public/favicon.svg`：站点图标。

全站没有外部字体和图片依赖，换完文字就能直接运行。

## 新增一个专栏

专栏配置在 `src/data/columns.js`，文件顶部已经放了一份可直接复制的注释模板：

```js
{
  slug: 'new-column',              // 英文短名，同时是文件夹名和网址
  name: '新专栏',                   // 显示名称
  description: '用一句话介绍这个专栏会写什么。',
  accent: '#8a6f4d',               // 卡片上的强调色
},
```

完整步骤只有三步：

1. 把上面的对象追加到 `columns` 数组，例如 slug 用 `travel`。
2. 新建文件夹 `src/content/travel/`。
3. 在文件夹里放入 Markdown 文章。

不需要改路由、页面或组件。保存后，新专栏会出现在首页和“专栏”页里，文章会自动归入其中。

> 如果内容文件夹没有对应的专栏配置，浏览器控制台会给出提示，避免文章“消失”得莫名其妙。

## 新增一篇文章

在对应专栏文件夹中新建 `.md` 文件，例如 `src/content/tech/hello-world.md`，然后复制：

```md
---
title: 文章标题
date: 2026-11-01
summary: 一句出现在文章列表里的摘要。
tags: [日常, 记录]
---

从这里开始写正文。

## 一个小标题

普通段落、**加粗**、`行内代码` 都可以直接使用 Markdown。
```

字段说明：

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `title` | 建议 | 缺省时使用文件名 |
| `date` | 建议 | `YYYY-MM-DD`，用于排序和显示 |
| `summary` | 可选 | 缺省时从正文自动截取 |
| `tags` | 可选 | 写作 `[标签一, 标签二]` |
| `draft` | 可选 | 设为 `true` 时隐藏文章 |

文件名会成为网址的一部分，建议使用简短的英文、数字和连字符。

正文里的 `##` 和 `###` 标题会自动生成页面目录，点击目录项会平滑滚动到对应位置，不需要手动维护锚点。

## 部署到 GitHub Pages

项目自带 `.github/workflows/deploy.yml`，会构建 `dist/` 并通过 GitHub Pages 发布。

首次部署时：

1. 如果当前目录还不是 Git 仓库，先初始化并推送：

   ```bash
   git init -b main
   git add .
   git commit -m "Initial personal site"
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git push -u origin main
   ```

2. 打开仓库 **Settings → Pages**。
3. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
4. 等待 Actions 完成，站点会发布在 `https://<用户名>.github.io/`。

如果仓库名不是 `<用户名>.github.io`，而是普通项目仓库，站点会位于 `https://<用户名>.github.io/<仓库名>/`。当前 Vite 使用相对路径和 hash 路由，不需要额外修改。

如果不使用 GitHub Actions，也可以在任何地方运行 `pnpm build`，把 `dist/` 目录作为静态站点上传。

## 一些实现说明

- **为什么用 hash 路由**：静态托管没有服务器重写规则，hash 模式可以让 `/#/columns/tech` 这样的地址在刷新时依然可用。
- **文章如何加载**：`src/data/posts.js` 使用 Vite 的 `import.meta.glob` 在构建时读取 `src/content/*/*.md`，解析 front matter 后按日期倒序排列。
- **文章目录**：构建时会为 h2/h3 补充稳定的 id，并生成目录数据；点击目录使用 `scrollIntoView` 滚动，避免与 hash 路由冲突。
- **归档页**：直接从文章数据按年份分组，新增文章后会自动出现在正确的年份里。
- **文章 HTML**：Markdown 来自本仓库，属于可信内容，所以通过 `v-html` 渲染。若以后允许读者投稿，务必先增加 HTML 清洗。
- **样式修改**：颜色、字体和宽度集中在 `src/styles/main.css` 顶部的 `:root` 变量里。

## 可选：删除示例内容

发布前可以把 `src/content/tech`、`reading`、`life` 里的示例文章替换成自己的。若想清空所有专栏，保留 `columns.js` 的数组结构和注释模板，只删除文章文件夹即可。
