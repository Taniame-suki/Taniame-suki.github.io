<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ArticleToc from '@/components/ArticleToc.vue'
import NotFoundPanel from '@/components/NotFoundPanel.vue'
import { getColumn } from '@/data/columns'
import { findPost, getPostNeighbors } from '@/data/posts'
import { site } from '@/data/site'
import { usePageTitle } from '@/composables/usePageTitle'

const props = defineProps({
  column: { type: String, required: true },
  slug: { type: String, required: true },
})

const post = computed(() => findPost(props.column, props.slug))
const column = computed(() => getColumn(props.column))
const neighbors = computed(() =>
  post.value ? getPostNeighbors(post.value) : { newer: null, older: null },
)

usePageTitle(() => post.value?.title || '文章未找到')
</script>

<template>
  <article v-if="post" class="article">
    <nav class="breadcrumb" aria-label="面包屑">
      <RouterLink :to="{ name: 'columns' }">专栏</RouterLink>
      <span aria-hidden="true">/</span>
      <RouterLink
        v-if="column"
        :to="{ name: 'column', params: { slug: column.slug } }"
      >
        {{ column.name }}
      </RouterLink>
      <span aria-hidden="true">/</span>
      <span>{{ post.title }}</span>
    </nav>

    <header class="article__header">
      <p class="eyebrow">NOTE / 文章</p>

      <div class="article__meta-row">
        <RouterLink
          v-if="column"
          class="article__column"
          :to="{ name: 'column', params: { slug: column.slug } }"
        >
          {{ column.name }}
        </RouterLink>
        <span aria-hidden="true">·</span>
        <time :datetime="post.date">{{ post.dateLabel }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ post.readingTime }} 分钟阅读</span>
      </div>

      <h1 class="article__title">{{ post.title }}</h1>
      <p class="article__summary">{{ post.summary }}</p>

      <ul v-if="post.tags.length" class="tag-list" aria-label="文章标签">
        <li v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>
    </header>

    <ArticleToc :headings="post.headings" />

    <!--
      文章由本地 Markdown 渲染，属于可信内容，所以使用 v-html。
      如果将来允许读者投稿，请先对 HTML 做清洗再渲染。
    -->
    <div class="prose article__body" v-html="post.html"></div>

    <div class="article-author">
      <span class="article-author__mark" aria-hidden="true">
        {{ site.monogram }}
      </span>
      <div class="article-author__info">
        <p class="eyebrow">WRITTEN BY</p>
        <p class="article-author__name">{{ site.author }}</p>
        <p class="article-author__meta">
          写于 {{ post.dateLabel }} · {{ post.readingTime }} 分钟阅读
        </p>
      </div>
      <RouterLink class="text-link" :to="{ name: 'about' }">
        关于我 <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>

    <footer class="article__footer">
      <RouterLink
        v-if="column"
        class="back-link"
        :to="{ name: 'column', params: { slug: column.slug } }"
      >
        ← 返回“{{ column.name }}”
      </RouterLink>

      <nav
        v-if="neighbors.older || neighbors.newer"
        class="article-nav"
        aria-label="同专栏文章"
      >
        <RouterLink
          v-if="neighbors.older"
          class="article-nav__item"
          :to="{
            name: 'post',
            params: { column: neighbors.older.columnSlug, slug: neighbors.older.slug },
          }"
        >
          <span class="article-nav__label">← 较早一篇</span>
          <span class="article-nav__title">{{ neighbors.older.title }}</span>
        </RouterLink>

        <RouterLink
          v-if="neighbors.newer"
          class="article-nav__item article-nav__item--next"
          :to="{
            name: 'post',
            params: { column: neighbors.newer.columnSlug, slug: neighbors.newer.slug },
          }"
        >
          <span class="article-nav__label">较新一篇 →</span>
          <span class="article-nav__title">{{ neighbors.newer.title }}</span>
        </RouterLink>
      </nav>
    </footer>
  </article>

  <NotFoundPanel
    v-else
    title="没有找到这篇文章"
    description="也许链接不完整，或者这篇文章已经被移走了。"
  />
</template>
