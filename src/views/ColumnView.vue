<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import NotFoundPanel from '@/components/NotFoundPanel.vue'
import PostListItem from '@/components/PostListItem.vue'
import { getColumn, getColumnIndex } from '@/data/columns'
import { getPostsForColumn } from '@/data/posts'
import { usePageTitle } from '@/composables/usePageTitle'

const props = defineProps({
  slug: { type: String, required: true },
})

const column = computed(() => getColumn(props.slug))
const columnIndex = computed(() => getColumnIndex(props.slug))
const columnPosts = computed(() => getPostsForColumn(props.slug))
const columnNumber = computed(() =>
  columnIndex.value >= 0 ? String(columnIndex.value + 1).padStart(2, '0') : '',
)
const latestColumnDate = computed(
  () => columnPosts.value[0]?.dateLabel || '—',
)

usePageTitle(() => column.value?.name || '专栏未找到')
</script>

<template>
  <div v-if="column" class="column-page">
    <nav class="breadcrumb" aria-label="面包屑">
      <RouterLink :to="{ name: 'columns' }">专栏</RouterLink>
      <span aria-hidden="true">/</span>
      <span>{{ column.name }}</span>
    </nav>

    <header class="page-head column-page__head">
      <div class="column-page__grid">
        <div>
          <p class="eyebrow">{{ columnNumber }} / COLUMN</p>

          <div class="column-heading">
            <span
              class="column-heading__dot"
              :style="{ backgroundColor: column.accent }"
              aria-hidden="true"
            ></span>
            <h1>{{ column.name }}</h1>
          </div>

          <p class="lede">{{ column.description }}</p>
        </div>

        <aside class="column-page__stat" aria-label="专栏统计">
          <p class="eyebrow">IN THIS COLUMN</p>
          <p class="column-page__count">{{ columnPosts.length }}</p>
          <p class="column-page__stat-meta">
            篇文章<br />最近更新 {{ latestColumnDate }}
          </p>
        </aside>
      </div>
    </header>

    <div v-if="columnPosts.length" class="post-list column-page__posts">
      <PostListItem
        v-for="post in columnPosts"
        :key="post.slug"
        :post="post"
        title-tag="h2"
      />
    </div>

    <p v-else class="empty-panel">
      这个专栏还在生长，暂时没有文章。
    </p>

    <RouterLink class="back-link" :to="{ name: 'columns' }">
      ← 返回全部专栏
    </RouterLink>
  </div>

  <NotFoundPanel
    v-else
    title="没有找到这个专栏"
    description="它可能已经改名，或者还没有被创建。"
  />
</template>
