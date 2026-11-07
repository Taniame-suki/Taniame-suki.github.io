# 内容目录说明

每篇文章都是一个 Markdown 文件，放在对应专栏的文件夹里：

```text
src/content/
├── tech/       → 对应 columns.js 中的 slug: 'tech'
├── reading/    → 对应 columns.js 中的 slug: 'reading'
└── life/       → 对应 columns.js 中的 slug: 'life'
```

## 新建一篇文章

在专栏文件夹中新建 `my-post.md`，复制下面的模板（外层用了四个反引号，方便直接复制）：

````md
---
title: 文章标题
date: 2026-11-01
summary: 一句出现在列表里的摘要。
tags: [标签一, 标签二]
---

从这里开始写正文。

## 小标题

普通段落、**加粗**、`行内代码` 都可以直接使用 Markdown。

> 引用会显示为左侧带线条的样式。

```js
// 代码块也会被自动排版
const message = 'hello'
```
````

## front matter 字段

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `title` | 建议 | 文章标题，缺省时使用文件名 |
| `date` | 建议 | 格式为 YYYY-MM-DD，用于排序和显示 |
| `summary` | 可选 | 列表摘要，缺省时自动从正文截取 |
| `tags` | 可选 | 写成 `[标签一, 标签二]` |
| `draft` | 可选 | 设为 `true` 时隐藏文章 |

文件名会成为网址的一部分，建议使用简短的英文、数字和连字符，例如
`write-readable-code.md`。

正文中的 `##` 和 `###` 标题会自动进入文章页的目录，不需要手写锚点。
标题 id 也会自动生成，遇到同名标题时会自动追加序号。
