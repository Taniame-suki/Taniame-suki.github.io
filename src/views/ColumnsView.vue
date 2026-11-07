<script setup>
import { RouterLink } from 'vue-router'
import ColumnRow from '@/components/ColumnRow.vue'
import { columns } from '@/data/columns'
import { getPostsForColumn, posts } from '@/data/posts'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('专栏')

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
        <p class="eyebrow">INDEX / 目录</p>
        <h1>专栏</h1>
        <p class="lede">
          把零散的文字分成几束。选择一个方向，慢慢读。
        </p>
      </div>

      <aside class="page-head__aside">
        <p class="eyebrow">READING NOTE</p>
        <p>
          每个专栏都有自己的语气。先从最近的一篇开始，
          也可以顺着标题，挑一个此刻想读的方向。
        </p>
        <RouterLink class="text-link" :to="{ name: 'archive' }">
          按时间浏览 <span aria-hidden="true">↗</span>
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
      还没有专栏，稍后再来看看。
    </p>

    <section class="page-callout" aria-labelledby="archive-callout-title">
      <div>
        <p class="eyebrow">ALL NOTES / 全部文字</p>
        <h2 id="archive-callout-title">想按时间读？</h2>
        <p>去归档里看看所有写过的文章，从最近的一篇往回走。</p>
      </div>

      <RouterLink class="button-link" :to="{ name: 'archive' }">
        打开归档 <span aria-hidden="true">→</span>
      </RouterLink>
    </section>
  </div>
</template>
