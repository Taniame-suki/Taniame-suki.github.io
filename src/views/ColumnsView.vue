<script setup>
import { RouterLink } from 'vue-router'
import ColumnRow from '@/components/ColumnRow.vue'
import { columns } from '@/data/columns'
import { getPostsForColumn, posts } from '@/data/posts'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('專欄')

// 每个专栏带上最近两篇文章，目录行会比单纯的卡片更有内容。
const columnRows = columns.map((column, index) => {
  const columnPosts = getPostsForColumn(column.slug)

  return {
    column,
    index,
    count: columnPosts.length,
    posts: columnPosts.slice(0, 2),
  }
})
</script>

<template>
  <div class="columns-page">
    <header class="page-head page-head--split">
      <div class="page-head__main">
        <p class="eyebrow">INDEX / 目錄</p>
        <h1>專欄</h1>
        <p class="lede">
          把零散的文字分成几束。選擇一個方向，慢慢讀。
        </p>
      </div>

      <aside class="page-head__aside">
        <p class="eyebrow">READING NOTE</p>
        <p>
          每個專欄都有自己的語氣。先從最近的一篇開始，
          亦可以順著標題，挑一個此刻想讀的方向。
        </p>
        <RouterLink class="text-link" :to="{ name: 'archive' }">
          按時間瀏覽 <span aria-hidden="true">↗</span>
        </RouterLink>
      </aside>
    </header>

    <section class="column-list column-list--page" aria-label="全部专栏">
      <ColumnRow
        v-for="item in columnRows"
        :key="item.column.slug"
        :column="item.column"
        :index="item.index"
        :count="item.count"
        :posts="item.posts"
      />
    </section>

    <p v-if="!columnRows.length" class="empty-panel">
      還沒有專欄，稍後再來看看。
    </p>

    <section class="page-callout" aria-labelledby="archive-callout-title">
      <div>
        <p class="eyebrow">ALL NOTES / 全部文字</p>
        <h2 id="archive-callout-title">想按時間讀？</h2>
        <p>去歸檔裏看看所有寫過的文章，從最近的一篇往回走。</p>
      </div>

      <RouterLink class="button-link" :to="{ name: 'archive' }">
        打開歸檔 <span aria-hidden="true">→</span>
      </RouterLink>
    </section>
  </div>
</template>
