<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  novel: { type: Object, required: true },
  index: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  chapters: { type: Array, default: () => [] },
})

const number = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <RouterLink
    class="column-row"
    :to="{ name: 'novel', params: { slug: novel.slug } }"
    :style="{ '--column-accent': novel.accent }"
  >
    <span class="column-row__index">{{ number }}</span>

    <span class="column-row__main">
      <span class="column-row__title-row">
        <span class="column-row__title">{{ novel.name }}</span>
        <span class="column-row__dot" aria-hidden="true"></span>
      </span>
      <span class="column-row__desc">{{ novel.description }}</span>
    </span>

    <span class="column-row__previews">
      <span
        v-for="chapter in chapters.slice(0, 2)"
        :key="chapter.slug"
        class="column-row__preview"
      >
        {{ chapter.title }}
      </span>
      <span v-if="!chapters.length" class="column-row__preview is-empty">
        等待第一篇
      </span>
    </span>

    <span class="column-row__meta">
      <span>{{ count }} 篇</span>
      <span aria-hidden="true">↗</span>
    </span>
  </RouterLink>
</template>
