<script setup>
import { RouterLink } from 'vue-router'
import { columns } from '@/data/columns'
import { nav, site } from '@/data/site'

const currentYear = new Date().getFullYear()
const yearRange =
  currentYear > site.startYear
    ? `${site.startYear}–${currentYear}`
    : String(site.startYear)
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__main">
        <div class="site-footer__brand">
          <RouterLink class="footer-brand" :to="{ name: 'home' }">
            <span class="footer-brand__mark" aria-hidden="true">
              {{ site.monogram }}
            </span>
            <span class="footer-brand__name">{{ site.name }}</span>
          </RouterLink>

          <p class="site-footer__desc">{{ site.description }}</p>
          <p class="site-footer__since">
            {{ yearRange }} · 用文字留下一点回声
          </p>
        </div>

        <nav class="site-footer__nav" aria-label="页脚导航">
          <h2 class="footer-heading">浏览</h2>
          <ul>
            <li v-for="item in nav" :key="item.label">
              <RouterLink :to="item.to">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <nav class="site-footer__nav" aria-label="页脚专栏">
          <h2 class="footer-heading">专栏</h2>
          <ul>
            <li v-for="column in columns" :key="column.slug">
              <RouterLink
                :to="{ name: 'column', params: { slug: column.slug } }"
              >
                {{ column.name }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="site-footer__nav">
          <h2 class="footer-heading">联系</h2>
          <ul>
            <li v-for="link in site.links" :key="link.label">
              <a :href="link.href" rel="noreferrer">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p>© {{ currentYear }} {{ site.author }}</p>
        <p>Vue + Markdown · 保持简单</p>
      </div>
    </div>
  </footer>
</template>
