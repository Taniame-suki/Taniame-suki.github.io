/**
 * 专栏配置。
 *
 * 一个专栏 = 这里的一条配置 + src/content/ 下的一个同名文件夹。
 * 专栏顺序就是页面上的显示顺序，改数组顺序即可调整。
 *
 * ── 新增专栏：复制下面这段模板 ─────────────────────────────
 *
 * {
 *   slug: 'new-column',              // 必填：英文短名，同时是文件夹名和网址的一部分
 *   name: '新专栏',                   // 必填：显示给读者的名称
 *   description: '用一句话介绍这个专栏会写什么。',
 *   accent: '#8a6f4d',               // 可选：卡片上的强调色
 * },
 *
 * 添加步骤：
 * 1. 把上面的对象追加到 columns 数组末尾；
 * 2. 新建 src/content/new-column/ 文件夹；
 * 3. 在文件夹里放 Markdown 文章，模板见 src/content/README.md；
 * 4. 不需要改路由或页面，刷新后文章会自动出现。
 * ────────────────────────────────────────────────────────
 *
 * 示例配置（发布前可以按自己的需要全部改写）：
 */
export const novels = [
  {
    slug: 'second',
    name: 'second',
    description: '关于代码、工具，以及把一个想法慢慢做出来的过程。',
    accent: '#a64b2a',
  },
  {
    slug: 'first',
    name: 'first',
    description: '关于代码、工具，以及把一个想法慢慢做出来的过程。',
    accent: '#a64b2a',
  }
]

/** 按 slug 查找专栏，找不到时返回 undefined。 */
export function getNovel(slug) {
  return novels.find((novel) => novel.slug === slug)
}

/** 返回专栏在列表中的序号（从 0 开始），用于显示 01、02…… */
export function getNovelIndex(slug) {
  return novels.findIndex((novel) => novel.slug === slug)
}
