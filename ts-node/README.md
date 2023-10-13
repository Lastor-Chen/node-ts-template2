# ts-node-template

Node.js + Typescript template

### Dev ts runtime

- ts-node
- nodemon
  - 當前還是用 nodemon 對 ts 環境做 watch 比較方便

### Build

直接使用 typescript cli

```shell
$ npx tsc
```

## ts-node

nodemon 預設使用 ts-node 運行 .ts file, `tsconfig` 也有相關設定。<br/>

```json
{
  "ts-node": {
    "esm": true, // 需指定啟用 esm
    "transpileOnly": true
  }
}
```

ts-node 兼容 node cli 指令, 可用 `--require` (`-r`) 載入 dotenv, 不需寫在 code 裡, 靈活區分 dev & prod。

```shell
$ ts-node -r dotenv/config ./src/app.ts

# or with nodemon
$ nodemon -r dotenv/config ./src/app.ts
```

如不使用 ts runtime 也可以用 tsc watch，但比較麻煩，速度也慢。

```shell
$ tsc --watch & nodemon ./dist/app.js
```
