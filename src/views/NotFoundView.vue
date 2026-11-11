<script setup>
import NotFoundPanel from '@/components/NotFoundPanel.vue'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('页面不存在')
</script>

<template>
  <NotFoundPanel />
</template>
