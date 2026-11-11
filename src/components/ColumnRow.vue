<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  column: { type: Object, required: true },
  index: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  posts: { type: Array, default: () => [] },
})

const number = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <RouterLink
    class="column-row"
    :to="{ name: 'column', params: { slug: column.slug } }"
    :style="{ '--column-accent': column.accent }"
  >
    <span class="column-row__index">{{ number }}</span>

    <span class="column-row__main">
      <span class="column-row__title-row">
        <span class="column-row__title">{{ column.name }}</span>
        <span class="column-row__dot" aria-hidden="true"></span>
      </span>
      <span class="column-row__desc">{{ column.description }}</span>
    </span>

    <span class="column-row__previews">
      <span
        v-for="post in posts.slice(0, 2)"
        :key="post.slug"
        class="column-row__preview"
      >
        {{ post.title }}
      </span>
      <span v-if="!posts.length" class="column-row__preview is-empty">
        等待第一篇
      </span>
    </span>

    <span class="column-row__meta">
      <span>{{ count }} 篇</span>
      <span aria-hidden="true">↗</span>
    </span>
  </RouterLink>
</template>
