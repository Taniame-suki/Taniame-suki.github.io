<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { nav, site } from '@/data/site'

const route = useRoute()

/** 判断当前导航项是否应该高亮。 */
function isActive(item) {
  return item.match.includes(route.name)
}
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <RouterLink class="brand" :to="{ name: 'home' }" aria-label="返回首页">
        <span class="brand__mark" aria-hidden="true">{{ site.monogram }}</span>
        <span class="brand__text">
          <span class="brand__name">{{ site.name }}</span>
          <span class="brand__tagline">
            {{ site.tagline }} · {{ site.startYear }}
          </span>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="主导航">
        <RouterLink
          v-for="item in nav"
          :key="item.label"
          class="site-nav__link"
          :class="{ 'is-active': isActive(item) }"
          :to="item.to"
          :aria-current="isActive(item) ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
