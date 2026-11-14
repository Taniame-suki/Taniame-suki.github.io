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

usePageTitle(() => novel.value?.name || '小説未找到，那真的是我寫的嗎？')
</script>

<template>
  <div v-if="novel" class="column-page">
    <nav class="breadcrumb" aria-label="面包屑">
      <RouterLink :to="{ name: 'novels' }">小説</RouterLink>
      <span aria-hidden="true">/</span>
      <span>{{ novel.name }}</span>
    </nav>

    <header class="page-head column-page__head">
      <div class="column-page__grid">
        <div>
          <p class="eyebrow">{{ novelNumber }} / NOVEL</p>

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
      這個小説還在寫，還未發佈。
    </p>

    <RouterLink class="back-link" :to="{ name: 'novels' }">
      ← 返回全部小説
    </RouterLink>
  </div>

  <NotFoundPanel
    v-else
    title="沒有找到這部小説"
    description="它可能已經改名了，或者沒寫 / 發佈。"
  />
</template>
