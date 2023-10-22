# vite-plugin-node

第三方插件，透過 vite 運行 node dev server 的插件，適用於純 API Server，不適合同時 serve 前端內容。

## About

- 有調用到 vite 環境變數, 需要加入 vite 的環境定義檔 `env.d.ts`
  - See [IntelliSense for TypeScript](https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript)
- 不需要 nodemon, 使用 vite 主導開發啟動
- 可以使用 vite 編譯 typescript, 而非 tsc
- 使用 `console.log` debug 時, 要用瀏覽器 GET 才會運行

## Using dotenv

雖可使用 vite 的環境變數機制, 但它原本是 for 前端, build 時會將環境變數替換為 string 注入, 變為靜態值。<br/>
因此, 還是另外用 `dotenv` 並以 `process.env` 來調用會更好。<br/>

如要限制僅在 dev mode 啟用 dotenv, 可將 dotenv 初始化寫在 vite config 上。

## Type Check

vite 為了速度默認不進行 type check, 因此要自行添加 npm scripts 以進行檢查。<br/>
See [Transpile Only](https://vitejs.dev/guide/features.html#transpile-only)<br/>

```json
{
  "scripts": {
    "type-check": "tsc --noEmit"
  }
}
```

## Path Alias

如果遇到 `__dirname` 在 esm 不可用的情況...

```js
// vite.config.ts
import path from 'node:path'
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'), // esm 可能會報錯
    },
  },
})
```

可將 vite config 改為 cjs 或是用 esm 的作法替代。

```js
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

## Build

`vite-plugin-node` 會設定以 ssr 模式進行 vite build, 因此不需求 `index.html`。<br/>
預設會 bundle js, 如不想 bundle 需添加 rollup 設定。

```js
build: {
  rollupOptions: {
    output: {
      preserveModules: true,
    },
  },
}
```

## Serve Frontend

`vite-plugin-node` 製作目的是 for 純 API Server 使用，不適用於 full stack。<br/>
但硬要的話，可以透過一些手段實現。

在 vite config 設定 VitePluginNode 的 `adapter`，定義 `/api` 開頭的進 Server，其他則進 vite dev server。<br/>
[Custom Adapter](https://github.com/axe-me/vite-plugin-node#custom-adapter)。

```ts
// vite.config.ts
VitePluginNode({
  async adapter({ app, req, res, next }) {
    // express
    if (req.url?.startsWith('/api')) {
      const express: Express = app
      express(req, res)
    } else {
      next()
    }

    // fastify
    if (req.url?.startsWith('/api/')) {
      const fastify: FastifyInstance = app
      await fastify.ready()
      fastify.routing(req, res)
    } else {
      next()
    }
  }
  // ...
})
```

只是這做法需要考慮 build 後的 static files 路徑對應問題，會增加架構的複雜度。
