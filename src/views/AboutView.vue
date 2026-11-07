<script setup>
import { RouterLink } from 'vue-router'
import { posts } from '@/data/posts'
import { site } from '@/data/site'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('关于')
</script>

<template>
  <div class="about-page">
    <header class="page-head page-head--about">
      <div class="about-intro">
        <p class="eyebrow">ABOUT / 关于</p>
        <h1>你好，<br />我是 {{ site.name }}。</h1>
        <p class="lede">
          一个在代码和文字之间来回走动的人。
          这里是我留给自己的安静角落。
        </p>
        <p class="about-intro__meta">
          {{ site.location }} · 自 {{ site.startYear }} 年开始记录
        </p>
      </div>

      <div class="about-portrait" aria-hidden="true">
        <span class="about-portrait__monogram">{{ site.monogram }}</span>
        <span class="about-portrait__line"></span>
        <span class="about-portrait__caption">KEEP NOTES</span>
      </div>
    </header>

    <div class="about-grid">
      <div class="about-main">
        <section class="about-section">
          <p class="section__index">01 / WRITING</p>
          <h2>我在写什么</h2>
          <div class="prose">
            <p>
              我主要记录三件事：做东西时遇到的问题、读完一本书之后留下的想法，
              以及日常生活里那些微小但不想忘记的瞬间。
            </p>
            <p>
              这些文字大多不是教程，也不追求完整。它们更像草稿纸上的批注，
              写给未来的自己，也顺便留给偶然路过的你。
            </p>
          </div>
        </section>

        <section class="about-section">
          <p class="section__index">02 / THE SITE</p>
          <h2>这个网站</h2>
          <div class="prose">
            <p>
              网站使用 Vue 3 与 Vite 构建，文章存放在 Markdown 文件里。
              没有后台、没有统计脚本，也不会追踪访客。它只是一个静态页面，
              安静地待在这里。
            </p>
            <p>
              如果你也喜欢简单的东西，欢迎从
              <RouterLink :to="{ name: 'columns' }">专栏</RouterLink>
              或
              <RouterLink :to="{ name: 'archive' }">归档</RouterLink>
              开始逛一逛。
            </p>
          </div>

          <dl class="about-facts">
            <div>
              <dt>技术</dt>
              <dd>Vue 3 · Vite · Markdown</dd>
            </div>
            <div>
              <dt>写作</dt>
              <dd>{{ posts.length }} 篇文章，持续更新中</dd>
            </div>
            <div>
              <dt>原则</dt>
              <dd>不追踪、不打扰、保持简单</dd>
            </div>
          </dl>
        </section>

        <section class="about-section">
          <p class="section__index">03 / PREFERENCES</p>
          <h2>一些偏好</h2>
          <ul class="preference-list">
            <li>
              <span class="preference-list__label">写作</span>
              <p>先写完，再改好。允许草稿不完美。</p>
            </li>
            <li>
              <span class="preference-list__label">阅读</span>
              <p>小说、随笔、传记，偶尔重读一本旧书。</p>
            </li>
            <li>
              <span class="preference-list__label">日常</span>
              <p>散步、咖啡，以及没有目的的下午。</p>
            </li>
          </ul>
        </section>
      </div>

      <aside class="about-aside" aria-label="补充信息">
        <section class="about-profile">
          <span class="about-profile__mark" aria-hidden="true">
            {{ site.monogram }}
          </span>
          <h2>{{ site.name }}</h2>
          <p class="about-profile__role">写作者 / 记录者</p>

          <dl class="about-profile__meta">
            <div>
              <dt>所在</dt>
              <dd>{{ site.location }}</dd>
            </div>
            <div>
              <dt>开始记录</dt>
              <dd>{{ site.startYear }}</dd>
            </div>
            <div>
              <dt>文章</dt>
              <dd>{{ posts.length }} 篇</dd>
            </div>
          </dl>

          <ul class="contact-list">
            <li v-for="link in site.links" :key="link.label">
              <a :href="link.href" rel="noreferrer">
                <span>{{ link.label }}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </section>

        <section class="about-card">
          <h2 class="eyebrow">NOW / 现在</h2>
          <dl class="about-list">
            <div v-for="item in site.now" :key="item.label">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.text }}</dd>
            </div>
          </dl>
        </section>
      </aside>
    </div>

    <section class="about-quote" aria-label="本站的一句话">
      <p class="eyebrow">NOTE / 页边</p>
      <blockquote>“{{ site.quote.text }}”</blockquote>
      <cite>—— {{ site.quote.source }}</cite>
    </section>
  </div>
</template>
