<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: { type: String, default: '这一页不在这里' },
  description: {
    type: String,
    default: '可能是链接写错了，或者这篇文字还没有被写下。',
  },
})
</script>

<template>
  <section class="not-found-panel">
    <p class="eyebrow">404 / NOT FOUND</p>
    <h1>{{ title }}</h1>
    <p class="not-found-panel__desc">{{ description }}</p>
    <RouterLink class="button" :to="{ name: 'home' }">回到首页</RouterLink>
  </section>
</template>
