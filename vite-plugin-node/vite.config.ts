import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv'
import type { Express } from 'express'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

export default defineConfig(({ command }) => {
  return {
    server: {
      port: 3000,
    },
    publicDir: 'src/client',
    plugins: [
      VitePluginNode({
        /**
         * serve f2e static file
         * @see https://github.com/axe-me/vite-plugin-node/issues/47
         */
        async adapter({ app, req, res, next }) {
          //#region express
          if (req.url === '/' || req.url?.startsWith('/api')) {
            const express: Express = app
            express(req, res)
          } else {
            next()
          }
          //#endregion

          //#region fastify
          // if (req.url === '/' || req.url?.startsWith('/api/')) {
          //   const fastify: FastifyInstance = app
          //   await fastify.ready()
          //   fastify.routing(req, res)
          // } else {
          //   next()
          // }
          //#endregion
        },
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
