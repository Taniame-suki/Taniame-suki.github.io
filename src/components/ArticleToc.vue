<script setup>
defineProps({
  headings: { type: Array, default: () => [] },
})

/**
 * 使用 scrollIntoView 而不是直接跳转 hash，
 * 这样不会和 HashRouter 的地址冲突。
 */
function goToHeading(id) {
  const target = document.getElementById(id)
  if (!target) return

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  target.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <nav v-if="headings.length" class="article-toc" aria-label="本文目录">
    <div class="article-toc__head">
      <p class="eyebrow">CONTENTS / 目录</p>
      <span class="article-toc__count">{{ headings.length }} 节</span>
    </div>

    <ol class="article-toc__list">
      <li
        v-for="(heading, index) in headings"
        :key="heading.id"
        :class="`article-toc__item article-toc__item--h${heading.level}`"
      >
        <a
          :href="`#${heading.id}`"
          @click.prevent="goToHeading(heading.id)"
        >
          <span class="article-toc__index">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <span>{{ heading.text }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>
