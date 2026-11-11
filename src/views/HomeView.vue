<script setup>
import { RouterLink } from 'vue-router'
import ColumnRow from '@/components/ColumnRow.vue'
import PostListItem from '@/components/PostListItem.vue'
import { columns } from '@/data/columns'
import { getPostsForColumn, latestPosts, posts } from '@/data/posts'
import { site } from '@/data/site'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle()

// 首页把最新一篇单独拿出来做“封面”，其余文章继续按时间排列。
const featuredPost = latestPosts[0] || null
const recentPosts = latestPosts.slice(1)

const columnRows = columns.map((column, index) => {
  const columnPosts = getPostsForColumn(column.slug)

  return {
    column,
    index,
    count: columnPosts.length,
    posts: columnPosts.slice(0, 2),
  }
})

const archiveYears = new Set(
  posts.map((post) => post.date.slice(0, 4)).filter(Boolean),
).size

const latestDate = featuredPost?.dateLabel || '—'
const issueNumber = String(posts.length).padStart(2, '0')
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero__grid">
        <div class="hero__copy">
          <p class="eyebrow">PERSONAL NOTES / 个人笔记</p>

          <!-- 首页主标题：想换文案时直接改这里。 -->
          <h1 class="hero__title">
            把走過的路，<br />
            <span>寫成可以重讀的字。</span>
          </h1>

          <p class="hero__intro">{{ site.intro }}</p>

          <div class="hero__actions">
            <RouterLink class="button-link" :to="{ name: 'columns' }">
              按專欄瀏覽 <span aria-hidden="true">→</span>
            </RouterLink>
            <RouterLink class="text-link" :to="{ name: 'about' }">
              關於我 <span aria-hidden="true">↗</span>
            </RouterLink>
          </div>

          <dl class="hero__stats">
            <div>
              <dt>最近更新</dt>
              <dd>{{ latestDate }}</dd>
            </div>
            <div>
              <dt>文章</dt>
              <dd>{{ posts.length }} 篇</dd>
            </div>
            <div>
              <dt>專欄</dt>
              <dd>{{ columns.length }} 个</dd>
            </div>
          </dl>
        </div>

        <aside v-if="featuredPost" class="hero__latest" aria-label="最新文章">
          <div class="hero__latest-head">
            <p class="eyebrow">LATEST / 最新一篇</p>
            <span class="hero__issue">No. {{ issueNumber }}</span>
          </div>

          <RouterLink
            class="latest-card"
            :to="{
              name: 'post',
              params: {
                column: featuredPost.columnSlug,
                slug: featuredPost.slug,
              },
            }"
          >
            <time class="latest-card__date" :datetime="featuredPost.date">
              {{ featuredPost.dateLabel }}
            </time>
            <h2 class="latest-card__title">{{ featuredPost.title }}</h2>
            <p class="latest-card__summary">{{ featuredPost.summary }}</p>
            <span class="latest-card__more">
              閲讀全文 <span aria-hidden="true">→</span>
            </span>
          </RouterLink>

          <div class="hero__latest-foot">
            <span>{{ posts.length }} 篇文字</span>
            <span>{{ columns.length }} 個專欄</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="now-strip" aria-labelledby="now-title">
      <div class="now-strip__head">
        <p class="eyebrow">NOW / 眼下</p>
        <h2 id="now-title">最近常做的幾件事</h2>
      </div>

      <dl class="now-list">
        <div v-for="item in site.now" :key="item.label" class="now-list__item">
          <dt>{{ item.label }}</dt>
          <dd>{{ item.text }}</dd>
        </div>
      </dl>

      <RouterLink class="text-link" :to="{ name: 'about' }">
        關於我 <span aria-hidden="true">↗</span>
      </RouterLink>
    </section>

    <section class="section" aria-labelledby="latest-title">
      <div class="section__head">
        <div>
          <p class="section__index">01</p>
          <h2 id="latest-title">最近寫下的</h2>
        </div>

        <RouterLink class="text-link" :to="{ name: 'archive' }">
          按時間瀏覽 <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>

      <div v-if="recentPosts.length" class="post-list">
        <PostListItem
          v-for="post in recentPosts"
          :key="`${post.columnSlug}/${post.slug}`"
          :post="post"
          show-column
        />
      </div>
      <p v-else class="empty-panel">
        還沒有更多的文章，等這裏慢慢長出來。
      </p>
    </section>

    <section class="section" aria-labelledby="columns-title">
      <div class="section__head">
        <div>
          <p class="section__index">02</p>
          <h2 id="columns-title">按專欄閲讀</h2>
        </div>

        <RouterLink class="text-link" :to="{ name: 'columns' }">
          全部專欄 <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>

      <div v-if="columnRows.length" class="column-list">
        <ColumnRow
          v-for="item in columnRows"
          :key="item.column.slug"
          :column="item.column"
          :index="item.index"
          :count="item.count"
          :posts="item.posts"
        />
      </div>
      <p v-else class="empty-panel">還沒有專欄，改天再來看看。</p>
    </section>

    <section class="home-end" aria-label="页边与归档">
      <div class="home-end__quote">
        <p class="eyebrow">NOTE / 寫在頁邊</p>
        <blockquote>“{{ site.quote.text }}”</blockquote>
        <cite>—— {{ site.quote.source }}</cite>
      </div>

      <aside class="home-end__archive">
        <p class="eyebrow">ARCHIVE / 檔案</p>
        <h2>按時間<br />慢慢往回走</h2>
        <p class="home-end__archive-meta">
          {{ posts.length }} 篇文字 · {{ archiveYears }} 個年份
        </p>
        <RouterLink class="button-link" :to="{ name: 'archive' }">
          瀏覽歸檔 <span aria-hidden="true">→</span>
        </RouterLink>
      </aside>
    </section>
  </div>
</template>
