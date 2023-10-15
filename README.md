# Node.js backend with Typescript dev

傳統 typescript cli 的方式編譯速度較慢, 嘗試使用 vite 去運行後端專案。

已嘗試方案:
- ts-node + nodemon (傳統)
- vite-node + nodemon
- vite + vite-plugin-node

待研究:
- tsup, 專門建立 typescript 開發環境的腳手架
- 更好的編譯打包方案

尚有其他 ts runtime 可做選擇 [TypeScript runtime comparisons](https://github.com/privatenumber/ts-runtime-comparison)。

## Todo List

- [ ] vite-plugin-node serve frontend
- [ ] 處理 node-ts-template
- [ ] 整理 gads 專案
- [ ] 改用 pnpm monorepo 機制

## vite-node vs vite-plugin-node

`vite-node` 是純 runtime 可單獨執行 script, 而 `vite-plugin-node` 會搭配 vite 作為一個 node server。

相關討論:
- https://github.com/axe-me/vite-plugin-node/issues/94
- [How to Choose the Right Plugin for a Vite and Express/Node Project?](https://stackoverflow.com/questions/77124072/how-to-choose-the-right-plugin-for-a-vite-and-express-node-project)
- [Developing and Building Node.js Applications with Vite](https://dev.to/rxliuli/developing-and-building-nodejs-applications-with-vite-311n)
  - 同名的其他 `vite-plugin-node`, 這篇文章提及 `tsup`

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

## Path Alias

使用 vite + vite-plugin-node 方案的話, 可直接使用 vite 的 path alias。<br/>

js 環境可在 `package.json` 設定 path alias。(不能使用 `@` 開頭)

```json
{
  "imports": {
    "#lib/*": "./lib/*",
    "#*": "./*"
  }
}
```

ts 環境下比較麻煩, 要區分 build 前後運行不同資料夾, 得使用實驗性功能 `--conditions`。<br/>
參考, [The Native Way To Configure Path Aliases in Frontend Projects](https://betterprogramming.pub/the-native-way-to-configure-path-aliases-in-frontend-projects-5db70f19a6e0)

```json
{
  "imports": {
    "#*": {
      "production": "./dist/*",
      "default": "./src/*" // 要放下面
    }
  }
}
```

設定 `imports` 條件後, 運行時加上參數。

```shell
$ node --conditions=production dist/app.js
or
$ node -C production dist/app.js
```

也可以考慮使用套件 `tsconfig-paths`。<br/>
參考, [How to configure and resolve path alias with a Typescript Project](https://plusreturn.com/blog/how-to-configure-and-resolve-path-alias-with-a-typescript-project/)
