import { Router } from 'express'

const userRouter: ReturnType<typeof Router> = Router()

userRouter.get('/', (req, res) => {
  res.send('Users')
})

userRouter.get('/:id', (req, res) => {
  const { id } = req.params
  res.send(`User ${id}`)
})

export default userRouter
