<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  post: { type: Object, required: true },
  showColumn: { type: Boolean, default: false },
  // 首页列表位于 h2 之下，用 h3；专栏页没有中间层级，传入 h2。
  titleTag: { type: String, default: 'h3' },
})
</script>

<template>
  <article class="post-row">
    <time class="post-row__date" :datetime="post.date">
      {{ post.dateLabel }}
    </time>

    <div class="post-row__main">
      <p v-if="showColumn" class="post-row__kicker">{{ post.columnName }}</p>

      <component :is="titleTag" class="post-row__title">
        <RouterLink
          :to="{
            name: 'post',
            params: { column: post.columnSlug, slug: post.slug },
          }"
        >
          {{ post.title }}
        </RouterLink>
      </component>

      <p class="post-row__summary">{{ post.summary }}</p>
      <p class="post-row__meta">{{ post.readingTime }} 分钟阅读</p>
    </div>

    <span class="post-row__arrow" aria-hidden="true">↗</span>
  </article>
</template>
