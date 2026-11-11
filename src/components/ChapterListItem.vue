<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  Chapter: { type: Object, required: true },
  showNovel: { type: Boolean, default: false },
  // 首页列表位于 h2 之下，用 h3；专栏页没有中间层级，传入 h2。
  titleTag: { type: String, default: 'h3' },
})
</script>

<template>
  <article class="post-row">
    <time class="post-row__date" :datetime="chapter.date">
      {{ chapter.dateLabel }}
    </time>

    <div class="post-row__main">
      <p v-if="showNovel" class="post-row__kicker">{{ chapter.novelName }}</p>

      <component :is="titleTag" class="post-row__title">
        <RouterLink
          :to="{
            name: 'chapter',
            params: { novel: chapter.novelSlug, slug: chapter.slug },
          }"
        >
          {{ chapter.title }}
        </RouterLink>
      </component>

      <p class="post-row__summary">{{ chapter.summary }}</p>
      <p class="post-row__meta">{{ chapter.readingTime }} 分钟阅读</p>
    </div>

    <span class="post-row__arrow" aria-hidden="true">↗</span>
  </article>
</template>
