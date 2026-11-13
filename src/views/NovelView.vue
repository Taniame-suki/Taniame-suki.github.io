<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import NotFoundPanel from '@/components/NotFoundPanel.vue'
import ChapterListItem from '@/components/ChapterListItem.vue'
import { getNovel, getNovelIndex } from '@/data/novels'
import { getChaptersForNovel } from '@/data/chapters'
import { usePageTitle } from '@/composables/usePageTitle'

const props = defineProps({
  slug: { type: String, required: true },
})

const novel = computed(() => getNovel(props.slug))
const novelIndex = computed(() => getNovelIndex(props.slug))
const novelChapters = computed(() => getChaptersForNovel(props.slug))
const novelNumber = computed(() =>
  novelIndex.value >= 0 ? String(novelIndex.value + 1).padStart(2, '0') : '',
)
const latestNovelDate = computed(
  () => novelChapters.value[0]?.dateLabel || '—',
)

usePageTitle(() => novel.value?.name || '专栏未找到')
</script>

<template>
  <div v-if="novel" class="column-page">
    <nav class="breadcrumb" aria-label="面包屑">
      <RouterLink :to="{ name: 'novels' }">专栏</RouterLink>
      <span aria-hidden="true">/</span>
      <span>{{ novel.name }}</span>
    </nav>

    <header class="page-head column-page__head">
      <div class="column-page__grid">
        <div>
          <p class="eyebrow">{{ novelNumber }} / COLUMN</p>

          <div class="column-heading">
            <span
              class="column-heading__dot"
              :style="{ backgroundColor: novel.accent }"
              aria-hidden="true"
            ></span>
            <h1>{{ novel.name }}</h1>
          </div>

          <p class="lede">{{ novel.description }}</p>
        </div>

        <aside class="column-page__stat" aria-label="专栏统计">
          <p class="eyebrow">IN THIS NOVEL</p>
          <p class="column-page__count">{{ novelChapters.length }}</p>
          <p class="column-page__stat-meta">
            篇文章<br />最近更新 {{ latestNovelDate }}
          </p>
        </aside>
      </div>
    </header>

    <div v-if="novelChapters.length" class="post-list column-page__posts">
      <ChapterListItem
        v-for="chapter in novelChapters"
        :key="chapter.slug"
        :chapter="chapter"
        title-tag="h2"
      />
    </div>

    <p v-else class="empty-panel">
      这个专栏还在生长，暂时没有文章。
    </p>

    <RouterLink class="back-link" :to="{ name: 'novels' }">
      ← 返回全部专栏
    </RouterLink>
  </div>

  <NotFoundPanel
    v-else
    title="没有找到这个专栏"
    description="它可能已经改名，或者还没有被创建。"
  />
</template>
