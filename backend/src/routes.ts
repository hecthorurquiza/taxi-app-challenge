import { Router } from 'express'
// import { createUserController } from "./useCases/CreateUser";

const router = Router()

router.get('/hello', (req, res) => {
  return res.status(200).json({ message: 'Hello World' })
})

export { router }