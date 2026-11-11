import { createRouter, createWebHashHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import ArchiveView from '@/views/ArchiveView.vue'
import ColumnView from '@/views/ColumnView.vue'
import ColumnsView from '@/views/ColumnsView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PostView from '@/views/PostView.vue'
import NovelView from '@/views/NovelView.vue'
import NovesView from '@/views/NovelsView.vue'
import ChapterView from '@views/ChapterView.vue'
import NovelsView from '../views/NovelsView.vue'

/**
 * 路由表。
 *
 * 增加普通的独立页面时，在这里补一条记录即可：
 * { path: '/guestbook', name: 'guestbook', component: () => import('@/views/GuestbookView.vue') }
 *
 * 注意：新增“专栏”不需要改这里。
 * 专栏由 src/data/columns.js 和 src/content/ 下的文件夹自动生成。
 */
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/columns', name: 'columns', component: ColumnsView },
  {
    path: '/columns/:slug',
    name: 'column',
    component: ColumnView,
    props: true,
  },
  {
    path: '/posts/:column/:slug',
    name: 'post',
    component: PostView,
    props: true,
  },
  { path: '/archive', name: 'archive', component: ArchiveView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/novels', name: 'novels', component: NovelsView },
  { 
    path: '/novels/:slug',
    name: 'novel',
    component: NovelView,
    props: true,
  },
  {
    path:'/chapters/:novel/:slug',
    name: 'chapter',
    component: ChapterView,
    props: true,
  },
  {
    // 兜底路由：访问不存在的地址时显示 404 页面。
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  // hash 模式不依赖服务器重写规则，部署到 GitHub Pages 等静态托管时刷新也不会 404。
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
