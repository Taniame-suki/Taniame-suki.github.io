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
          這裏是我留給自己的安靜角落。
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
          <h2>我在寫什么</h2>
          <div class="prose">
            <p>
              我也不知道，應該是想和別人的内容吧
            </p>
            <p>
              這些文字并非教程，亦非人生建議，
              寫給未來的我，也順便給路過的你。
            </p>
          </div>
        </section>

        <section class="about-section">
          <p class="section__index">02 / THE SITE</p>
          <h2>這個網站</h2>
          <div class="prose">
            <p>
              網站使用的引擎你也不會感興趣吧
              沒有後臺、訪客統計或是IP追蹤，它只是一个静态页面，
              安靜地待在这里。
            </p>
            <p>
              如果你也喜欢简单的东西，欢迎从
              <RouterLink :to="{ name: 'columns' }">专栏</RouterLink>
              或
              <RouterLink :to="{ name: 'archive' }">归档</RouterLink>
              開始逛一逛。
            </p>
          </div>

          <dl class="about-facts">
            <div>
              <dt>技术</dt>
              <dd>Vue 3 · Vite · Markdown</dd>
            </div>
            <div>
              <dt>寫作</dt>
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
              <p>能寫完就不錯了吧......允许草稿不完美，卻無法容忍自己的無知與錯誤。</p>
            </li>
            <li>
              <span class="preference-list__label">阅读</span>
              <p></p>
            </li>
            <li>
              <span class="preference-list__label">日常</span>
              <p>奶茶、咖啡，以及漫無目的下午。</p>
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
              <dt>開始記錄</dt>
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
