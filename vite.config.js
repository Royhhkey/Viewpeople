import { fileURLToPath, URL } from 'node:url'
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    cors: true
  },
  plugins: [
    vue(),
  ], 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: () => 'everything.js', // 将所有JavaScript合并到一个文件
        plugins: [terser()], // 使用terser插件进行代码压缩
        entryFileNames: `static/js/2025/3/6/[name].[hash].js`,
        chunkFileNames: `static/js/2025/3/6/[name].[hash].js`,
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.name;

          // 检查CSS文件
          if (fileName.endsWith('.css')) {
            return 'static/css/2025/3/6/[name].[hash].css';
          }

          // 检查图片文件
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico'];
          if (imageExtensions.some(ext => fileName.endsWith(ext))) {
            return 'static/images/2025/3/6/[name].[hash][ext]';
          }

          // 默认路径
          return 'assets/[name].[hash][ext]';
        }

      }
    },
    cssCodeSplit: false, // 确保CSS也合并到一个文件
    assetsDir: '' // 空表示不使用额外目录
  }
})
