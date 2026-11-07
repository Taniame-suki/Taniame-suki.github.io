/**
 * 站点级信息。
 *
 * 第一次使用时，优先把这里的示例文字、邮箱和链接换成自己的资料。
 * 页头、页脚、首页和“关于”页面都会复用这份配置。
 */
// 联系方式：改一次，邮箱链接会自动同步。
const email = 'entropyatunievrse@gmail.com' // TODO: 替换成你的常用邮箱

export const site = {
  monogram: 'T',
  name: 'Taniame',
  title: 'Taniame',
  tagline: '个人笔记',
  description: 'Taniame 的个人笔记：技术、阅读与生活。',
  intro:
    '我在這裏記錄身邊發生的事、读过的书，以及日常生活里值得停一下的瞬间。',
  author: 'Taniame',
  location: 'China Mainland',
  email,
  startYear: 2026,

  // 首页收尾引用，可替换成自己喜欢的句子。
  quote: {
    text: '寫作不是爲了看見，而是为了把想法放穩。',
    source: '久世 谷雨',
  },

  // “眼下”小档案：首页与关于页会读取这份数据。
  // 增加或减少条目都可以，页面会自动排版。
  now: [
    { label: '正在寫', text: '把零散的笔记整理成可以重读的文章' },
    { label: '正在读', text: '小说、随笔，以及一本读得很慢的书' },
    { label: '正在学', text: '中國高中課程内容' },
  ],

  // 页脚和“关于”页面会按顺序显示这些链接。
  links: [
    { label: 'GitHub', href: 'https://github.com/Taniame-suki' },
    { label: '邮箱', href: `mailto:${email}` },
  ],
}

/**
 * 顶部导航。
 * match 表示：当前路由名在这组名称中时，该导航项保持高亮。
 */
export const nav = [
  { label: '首页', to: { name: 'home' }, match: ['home'] },
  { label: '专栏', to: { name: 'columns' }, match: ['columns', 'column', 'post'] },
  { label: '归档', to: { name: 'archive' }, match: ['archive'] },
  { label: '关于', to: { name: 'about' }, match: ['about'] },
]
