# vite-node

基於 vite 的 ts runtime, 不依賴 vite 本體。他是 Vitest 的子專案。
功能不多, 吃 vite config 的開箱即用 ts runtime, 不兼容 node cli 指令。

- 速度比 ts-node 快
- 自帶的 watch 有些問題，使用 nodemon 比較合適
- 無法兼容 node cli，例如 `--require`

## Using dotenv in ESM

vite-node 無法透過 cli 預加載 dotenv, 且 ESM import 是置頂載入, 所以 dotenv 不能裝在 devDependencies, 否則 prod 時可能會報錯。

CommonJS
```js
// 未安裝時, 不進 if 就不會報錯
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
```

ESM
```js
// 置頂加載, 一定要安裝
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}
```

另一種解法是改用動態 `import()` 處理
```js
const dotenv = await import('dotenv').catch(() => null)
if (process.env.NODE_ENV !== 'production') {
  dotenv?.config()
}
```
