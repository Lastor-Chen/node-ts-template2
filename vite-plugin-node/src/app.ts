import express from 'express'
import router from '@/routes/index.js'

const app = express()

app.use(router)
app.get('/', (req, res) => {
  res.send('Hello Express + TS + vite-plugin-node')
})

if (import.meta.env.PROD) {
  app.listen(3000, () => {
    console.log('server started')
  })
}

// 當 tsconfig 設定 declaration: true 並使用 pnpm 時, 導出 Express 會報錯
// https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
export const viteNodeApp: ReturnType<typeof express> = app

// ts feature test
type SomeENV = string
const someEnv: SomeENV = process.env.SOME_ENV || ''
console.log('SOME_ENV', someEnv)
