import { watchEffect } from 'vue'
import { site } from '@/data/site'

/**
 * 根据页面内容更新浏览器标签页标题。
 *
 * 用法：
 *   usePageTitle('关于')
 *   usePageTitle(() => post.value?.title)
 *
 * 传入函数时，等数据加载或路由切换后标题也会自动更新。
 */
export function usePageTitle(titleSource) {
  watchEffect(() => {
    const title = typeof titleSource === 'function' ? titleSource() : titleSource
    document.title = title ? `${title} · ${site.title}` : `${site.title} · ${site.tagline}`
  })
}
