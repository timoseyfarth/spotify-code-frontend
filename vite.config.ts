import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import { createHtmlPlugin } from 'vite-plugin-html'

const appVersion = process.env.npm_package_version;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const cdnBaseUrl = env.VITE_CDN_BASE_URL;

  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      vueDevTools(),
      createHtmlPlugin({
        minify: false,
        inject: {
          data: {
            APP_VERSION: appVersion,
          }
        }
      })
      // {
      //   name: 'html-transform',
      //   transformIndexHtml(html) {
      //     return html.replace(
      //       /%APP_VERSION%/g,
      //       (match, href) =>
      //         process.env.npm_package_version
      //     )
      //   }
      // }
    ],
    base: process.env.NODE_ENV === 'production' ? `${cdnBaseUrl}` : '/',
    build: {
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
