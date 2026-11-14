<script setup>
import { RouterLink } from 'vue-router'
import NovelRow from '@/components/NovelRow.vue'
import { novels } from '@/data/novels'
import { getChaptersForNovel, chapters } from '@/data/chapters'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('小説')

// 每个小説带上最近两篇文章，目录行会比单纯的卡片更有内容。
const NovelRows = novels.map((novel, index) => {
  const novelChapters = getChaptersForNovel(novel.slug)

  return {
    novel,
    index,
    count: novelChapters.length,
    chapters: novelChapters.slice(0, 2),
  }
})
</script>

<template>
  <div class="columns-page">
    <header class="page-head page-head--split">
      <div class="page-head__main">
        <p class="eyebrow">INDEX / 目录</p>
        <h1>小説</h1>
        <p class="lede">
          久世谷雨曾寫下的文字。
        </p>
      </div>

      <aside class="page-head__aside">
        <p class="eyebrow">READING NOTE</p>
        <p>
          每篇小說都反映了谷雨的内心思考，
          如果寫完了就好了。
        </p>
        <RouterLink class="text-link" :to="{ name: 'archive' }">
          按時間瀏覽 <span aria-hidden="true">↗</span>
        </RouterLink>
      </aside>
    </header>

    <section class="column-list column-list--page" aria-label="全部小説">
      <NovelRow
        v-for="item in NovelRows"
        :key="item.novel.slug"
        :novel="item.novel"
        :index="item.index"
        :count="item.count"
        :chapters="item.chapters"
      />
    </section>

    <p v-if="!NovelRows.length" class="empty-panel">
      小説頁面還在建設中
    </p>

    <section class="page-callout" aria-labelledby="archive-callout-title">
      <div>
        <p class="eyebrow">ALL NOTES / 全部文字</p>
        <h2 id="archive-callout-title">想按時間讀？</h2>
        <p>去歸檔里看看所有寫過的文章，从最近的一篇往回走。</p>
      </div>

      <RouterLink class="button-link" :to="{ name: 'archive' }">
        打开歸檔 <span aria-hidden="true">→</span>
      </RouterLink>
    </section>
  </div>
</template>
