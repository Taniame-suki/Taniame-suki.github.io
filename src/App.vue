<script setup>
import { RouterView } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <div class="site-shell">
    <!-- 键盘用户可以直接跳过导航，进入正文。 -->
    <a class="skip-link" href="#main">跳到正文</a>

    <SiteHeader />

    <main id="main" class="site-main" tabindex="-1">
      <div class="container">
        <RouterView />
      </div>
    </main>

    <SiteFooter />
  </div>
</template>
