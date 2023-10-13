# Node.js backend with Typescript dev

嘗試使用不同的 typescript runtime 去運行後端專案
- ts-node + nodemon
- vite-node
- vite + vite-plugin-node

也有其他 ts runtime 可做選擇 [TypeScript runtime comparisons](https://github.com/privatenumber/ts-runtime-comparison)。

## Config

node16 開始有比較好的 esm & cjs 兼容模式設定 `nodenext`，能以 package.json 為基準自動判斷，並且能識別附檔名 `.cjs`、`.mjs` 決定該檔案使用哪種 module 解析。

```js
// package.json
{
  "type": "module", // module | commonjs
  // ...
}
```

```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "nodenext",
    // ...
  }
}
```

## Serve Static Files for Typescript

請求靜態檔案時，node server 會直接回應該檔案，無法用 ts runtime 同時讓前後端的 ts file 都運作。<br />
需要比照前後端分離的概念 public dir 只放編譯好的 js files，開發模式另起前端的 ts rumtime。

```html
<!-- NG, browser cannot read ts file -->
<script src="./main.ts">
```
