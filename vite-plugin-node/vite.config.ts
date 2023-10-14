import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
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
  }
})
