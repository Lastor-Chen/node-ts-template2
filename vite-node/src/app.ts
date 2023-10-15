import express from 'express'

// path alias
import { foo } from '#foo.js'
console.log('foo', foo)

// load dotenv
const dotenv = await import('dotenv').catch(() => undefined)
if (process.env.NODE_ENV !== 'production') {
  dotenv?.config()
}

const app = express()

app.get('/', (req, res) => {
  res.send('Hello Express + TS + vite-node')
})

app.listen(3000, () => {
  console.log('server started')
})

// ts feature test
type SomeENV = string
const someEnv: SomeENV = process.env.SOME_ENV || ''
console.log('SOME_ENV', someEnv)
