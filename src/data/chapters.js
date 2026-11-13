import { marked } from 'marked'
import { novels } from './novels'

/**
 * 文章数据层。
 *
 * 约定：
 * - 文章放在 src/content/<专栏 slug>/<文章 slug>.md；
 * - 文件名就是文章网址中的 slug；
 * - 顶部用 --- 包起来的部分是 front matter，用来填写标题、日期等信息；
 * - 标记 draft: true 的文章不会出现在网站上。
 *
 * 这里在构建时读取 Markdown 并解析，不需要数据库或后台。
 * 新增文章时只要新建文件，页面会自动更新。
 */

// eager: true 表示在构建时把 Markdown 原文一起打包进来。
// 只匹配“专栏文件夹/文章.md”这一层，不会把说明文件当成文章。
const contentFiles = import.meta.glob('../novelcontent/*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

marked.setOptions({
  gfm: true,
  breaks: false,
})

const FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/

/** 将 front matter 中的字符串转换成布尔值、数组或普通字符串。 */
function parseValue(rawValue) {
  const value = rawValue.trim()

  if (value === 'true') return true
  if (value === 'false') return false

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }

  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }

  return value
}

/** 解析文章顶部的简单 YAML 风格 front matter。 */
function parseFrontMatter(raw) {
  const match = raw.match(FRONT_MATTER_PATTERN)

  if (!match) {
    return { data: {}, body: raw.trim() }
  }

  const data = {}

  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf(':')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1)
    data[key] = parseValue(value)
  }

  return {
    data,
    body: raw.slice(match[0].length).trim(),
  }
}

/** 把 2026-10-18 显示成 2026.10.18；日期缺失时给出可读提示。 */
function formatDate(value) {
  const parts = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/)
  return parts ? `${parts[1]}.${parts[2]}.${parts[3]}` : '未注明日期'
}

/**
 * 从正文生成摘要，保证没有手写 summary 的文章也有内容可显示。
 * 这里只做轻量清理，不追求完整的 Markdown 解析。
 */
function makeExcerpt(body) {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return text.length > 96 ? `${text.slice(0, 96)}……` : text
}

/** 粗略估算阅读时间：中文按每分钟 400 字，英文按每分钟 200 词。 */
function estimateReadingTime(body) {
  const chineseCharacters = (body.match(/[\u4e00-\u9fff]/g) || []).length
  const englishWords = (body.match(/[A-Za-z0-9]+/g) || []).length
  return Math.max(1, Math.ceil(chineseCharacters / 400 + englishWords / 200))
}

/** 还原标题中常见的 HTML 实体，避免目录里出现 &amp; 这样的字符。 */
function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

/** 把标题转换成稳定、可读的 id；中文会原样保留。 */
function slugifyHeading(text, fallbackIndex) {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return slug || `section-${fallbackIndex}`
}

/**
 * 给 Markdown 生成的 h2/h3 补上 id，同时收集文章目录。
 * 这里只处理 marked 输出的标题标签；对个人博客来说足够，
 * 也避免了引入额外的 Markdown 解析依赖。
 */
function buildArticleHtml(html) {
  const headings = []
  const usedIds = new Set()
  let fallbackIndex = 0

  const withIds = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (match, level, innerHtml) => {
      const text = decodeEntities(innerHtml.replace(/<[^>]*>/g, '')).trim()
      if (!text) return match

      fallbackIndex += 1
      const baseId = slugifyHeading(text, fallbackIndex)
      let id = baseId
      let suffix = 2

      // 同名标题自动加 -2、-3，保证页面内 id 唯一。
      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`
        suffix += 1
      }

      usedIds.add(id)
      headings.push({ level: Number(level), text, id })
      return `<h${level} id="${id}">${innerHtml}</h${level}>`
    },
  )

  return { html: withIds, headings }
}

/**
 * 从“../content/tech/example.md”中拆出专栏和文章 slug。
 * 使用 import.meta.glob 后，路径分隔符始终是 /。
 */
function parseFilePath(path) {
  const match = path.match(/\/novelcontent\/([^/]+)\/([^/]+)\.md$/)
  return match ? { novelSlug: match[1], slug: match[2] } : null
}

const parsedChapters = Object.entries(contentFiles).flatMap(([path, raw]) => {
  const pathInfo = parseFilePath(path)
  if (!pathInfo) return []

  const { novelSlug, slug } = pathInfo
  const novel = novels.find((item) => item.slug === novelSlug)

  // 如果内容文件夹没有对应配置，开发时会给出提示，避免文章“消失”得莫名其妙。
  if (!novel) {
    console.warn(
      `[内容] 文章 ${path} 所在的文件夹 "${novelSlug}" 没有对应专栏，请在 src/data/novels.js 中补充配置。`,
    )
    return []
  }

  const { data, body } = parseFrontMatter(raw)

  // 草稿仍然留在仓库里，但不会进入文章列表。
  if (data.draft === true) return []

  // 渲染一次 Markdown：既得到正文，也得到文章目录。
  const { html: articleHtml, headings } = buildArticleHtml(marked.parse(body))

  const date = String(data.date || '')
  const tags = Array.isArray(data.tags)
    ? data.tags
    : data.tags
      ? [String(data.tags)]
      : []

  return [
    {
      ...data,
      novelSlug,
      novelName: novel.name,
      slug,
      date,
      dateLabel: formatDate(date),
      title: String(data.title || slug),
      summary: String(data.summary || makeExcerpt(body)),
      tags,
      headings,
      readingTime: estimateReadingTime(body),
      // 内容来自本仓库，属于可信来源，所以直接交给 v-html 渲染。
      // 如果以后接入用户投稿，必须在这里增加 HTML 清洗步骤。
      html: articleHtml,
    },
  ]
})

// 按日期从新到旧排序；同一天时按标题排序，保证每次构建顺序稳定。
export const chapters = parsedChapters.sort(
  (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
)

/** 首页展示的最新文章。 */
export const latestChapters = chapters.slice(0, 4)

/** 某个专栏下的全部文章（已按时间倒序）。 */
export function getChaptersForNovel(novelSlug) {
  return chapters.filter((chapter) => chapter.novelSlug === novelSlug)
}

/** 按专栏和文章 slug 查找单篇文章。 */
export function findPost(novelSlug, chapterSlug) {
  return chapters.find(
    (chapter) => chapter.novelSlug === novelSlug && chapter.slug === chapterSlug,
  )
}

/**
 * 返回同一专栏内的相邻文章。
 * 因为列表是新到旧排序，所以 newer 在数组中的位置更靠前。
 */
export function getChapterNeighbors(chapter) {
  const novelChapters = getChaptersForNovel(chapter.novelSlug)
  const index = novelChapters.findIndex((item) => item.slug === chapter.slug)

  return {
    newer: index > 0 ? novelChapters[index - 1] : null,
    older: index < novelChapters.length - 1 ? novelChapters[index + 1] : null,
  }
}
