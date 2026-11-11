<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { posts } from '@/data/posts'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('归档')

/**
 * 按年份分组。
 * posts 已经按日期倒序排列，所以 Map 的插入顺序就是年份的倒序。
 */
const yearGroups = computed(() => {
  const groups = new Map()

  for (const post of posts) {
    const year = post.date ? post.date.slice(0, 4) : '未注明'
    if (!groups.has(year)) groups.set(year, [])
    groups.get(year).push(post)
  }

  return [...groups.entries()].map(([year, items]) => ({
    year,
    posts: items,
  }))
})

const latestDate = computed(() => posts[0]?.dateLabel || '—')
</script>

<template>
  <div class="archive-page">
    <header class="page-head page-head--split">
      <div class="page-head__main">
        <p class="eyebrow">ARCHIVE / 归档</p>
        <h1>归档</h1>
        <p class="lede">
          所有写过的文字，按时间安静地排在一起。
          从最近的一篇开始，或者随便挑一个年份。
        </p>
      </div>

      <aside class="archive-summary" aria-label="归档统计">
        <dl>
          <div>
            <dt>文字</dt>
            <dd>{{ posts.length }}</dd>
          </div>
          <div>
            <dt>年份</dt>
            <dd>{{ yearGroups.length }}</dd>
          </div>
          <div>
            <dt>最近更新</dt>
            <dd>{{ latestDate }}</dd>
          </div>
        </dl>
      </aside>
    </header>

    <div v-if="yearGroups.length" class="archive">
      <section
        v-for="group in yearGroups"
        :key="group.year"
        class="archive-year"
        :aria-labelledby="`archive-year-${group.year}`"
      >
        <div class="archive-year__head">
          <h2 :id="`archive-year-${group.year}`">{{ group.year }}</h2>
          <p>{{ group.posts.length }} 篇</p>
        </div>

        <div class="archive-list">
          <RouterLink
            v-for="post in group.posts"
            :key="`${post.columnSlug}-${post.slug}`"
            class="archive-item"
            :to="{
              name: 'post',
              params: { column: post.columnSlug, slug: post.slug },
            }"
          >
            <time class="archive-item__date" :datetime="post.date">
              {{ post.dateLabel }}
            </time>

            <span class="archive-item__main">
              <span class="archive-item__kicker">{{ post.columnName }}</span>
              <span class="archive-item__title">{{ post.title }}</span>
              <span class="archive-item__summary">{{ post.summary }}</span>
            </span>

            <span class="archive-item__meta">
              {{ post.readingTime }} 分钟
              <span aria-hidden="true">↗</span>
            </span>
          </RouterLink>
        </div>
      </section>
    </div>

    <p v-else class="empty-panel">还没有文章，等这里慢慢长出来。</p>

    <RouterLink class="back-link" :to="{ name: 'columns' }">
      ← 去看看专栏
    </RouterLink>
  </div>
</template>
