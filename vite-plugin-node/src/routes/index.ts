import { Router } from 'express'
import userRouter from './users.js'

const router: ReturnType<typeof Router> = Router()

router.get('/', (req, res) => {
  res.send('Hello Express + TS + vite-plugin-node')
})

router.use('/users', userRouter)

export default router
