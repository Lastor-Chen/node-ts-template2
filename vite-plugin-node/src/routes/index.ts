import { Router } from 'express'
import userRouter from './users.js'

const router: ReturnType<typeof Router> = Router()

router.use('/users', userRouter)

export default router
