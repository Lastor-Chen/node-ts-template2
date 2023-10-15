import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

export default defineConfig(({ command }) => {
  return {
    server: {
      port: 3000,
    },
    plugins: [
      VitePluginNode({
        adapter: 'express',
        appPath: './src/app.ts',
        exportName: 'viteNodeApp',
        tsCompiler: 'esbuild',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    build: {
      /**
       * No bundle js on build
       * @see https://github.com/vitejs/vite/issues/9629
       */
      rollupOptions: {
        output: {
          preserveModules: true,
        },
      },
    },
  }
})
