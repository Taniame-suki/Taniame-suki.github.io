<script setup>
import { RouterLink } from 'vue-router'
import NovelRow from '@/components/NovelRow.vue'
import { novels } from '@/data/novels'
import { getChaptersForNovel, chapters } from '@/data/chapters'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('专栏')

// 每个专栏带上最近两篇文章，目录行会比单纯的卡片更有内容。
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
        <h1>小说</h1>
        <p class="lede">
          久世谷雨曾写下的文字。
        </p>
      </div>

      <aside class="page-head__aside">
        <p class="eyebrow">READING NOTE</p>
        <p>
          每篇小说都反映了谷雨的内心思考，
          如果写完了就好了。
        </p>
        <RouterLink class="text-link" :to="{ name: 'archive' }">
          按时间浏览 <span aria-hidden="true">↗</span>
        </RouterLink>
      </aside>
    </header>

    <section class="column-list column-list--page" aria-label="全部专栏">
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
