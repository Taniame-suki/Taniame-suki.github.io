import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 使用相对路径，构建结果可以直接放进任意静态目录。
  // 如果以后部署在 https://example.com/blog/ 这样的子路径下，也不用改这里。
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
