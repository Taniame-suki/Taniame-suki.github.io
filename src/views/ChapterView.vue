<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ArticleToc from '@/components/ArticleToc.vue'
import NotFoundPanel from '@/components/NotFoundPanel.vue'
import { getNovel } from '@/data/novels'
import { findChapter, getChapterNeighbors } from '@/data/chapters'
import { site } from '@/data/site'
import { usePageTitle } from '@/composables/usePageTitle'

const props = defineProps({
  novel: { type: String, required: true },
  slug: { type: String, required: true },
})

const chapter = computed(() => findChapter(props.novel, props.slug))
const novel = computed(() => getNovel(props.novel))
const neighbors = computed(() =>
  chapter.value ? getChapterNeighbors(chapter.value) : { newer: null, older: null },
)

usePageTitle(() => chapter.value?.title || '文章未找到')
</script>

<template>
  <article v-if="chapter" class="article">
    <nav class="breadcrumb" aria-label="面包屑">
      <RouterLink :to="{ name: 'novels' }">专栏</RouterLink>
      <span aria-hidden="true">/</span>
      <RouterLink
        v-if="novel"
        :to="{ name: 'novel', params: { slug: novel.slug } }"
      >
        {{ novel.name }}
      </RouterLink>
      <span aria-hidden="true">/</span>
      <span>{{ chapter.title }}</span>
    </nav>

    <header class="article__header">
      <p class="eyebrow">NOTE / 文章</p>

      <div class="article__meta-row">
        <RouterLink
          v-if="novel"
          class="article__column"
          :to="{ name: 'novel', params: { slug: novel.slug } }"
        >
          {{ novel.name }}
        </RouterLink>
        <span aria-hidden="true">·</span>
        <time :datetime="chapter.date">{{ chapter.dateLabel }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ chapter.readingTime }} 分钟阅读</span>
      </div>

      <h1 class="article__title">{{ chapter.title }}</h1>
      <p class="article__summary">{{ chapter.summary }}</p>

      <ul v-if="chapter.tags.length" class="tag-list" aria-label="文章标签">
        <li v-for="tag in chapter.tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>
    </header>

    <ArticleToc :headings="chapter.headings" />

    <!--
      文章由本地 Markdown 渲染，属于可信内容，所以使用 v-html。
      如果将来允许读者投稿，请先对 HTML 做清洗再渲染。
    -->
    <div class="prose article__body" v-html="chapter.html"></div>

    <div class="article-author">
      <span class="article-author__mark" aria-hidden="true">
        {{ site.monogram }}
      </span>
      <div class="article-author__info">
        <p class="eyebrow">WRITTEN BY</p>
        <p class="article-author__name">{{ site.author }}</p>
        <p class="article-author__meta">
          写于 {{ chapter.dateLabel }} · {{ chapter.readingTime }} 分钟阅读
        </p>
      </div>
      <RouterLink class="text-link" :to="{ name: 'about' }">
        关于我 <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>

    <footer class="article__footer">
      <RouterLink
        v-if="novel"
        class="back-link"
        :to="{ name: 'novel', params: { slug: novel.slug } }"
      >
        ← 返回“{{ novel.name }}”
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
            name: 'chapter',
            params: { novel: neighbors.older.novelSlug, slug: neighbors.older.slug },
          }"
        >
          <span class="article-nav__label">← 较早一篇</span>
          <span class="article-nav__title">{{ neighbors.older.title }}</span>
        </RouterLink>

        <RouterLink
          v-if="neighbors.newer"
          class="article-nav__item article-nav__item--next"
          :to="{
            name: 'chapter',
            params: { chapter: neighbors.newer.novelSlug, slug: neighbors.newer.slug },
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
    title="沒有找到這篇文章"
    description="也许链接不完整，或者这篇文章已经被移走了。"
  />
</template>
