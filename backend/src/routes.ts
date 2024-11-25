import { Router } from 'express'
import { estimateRideController } from './useCase/estimateRide'
import { confirmRideController } from './useCase/confirmRide'

const router = Router()

router.get('/hello', (req, res) => {
  return res.status(200).json({ message: 'Hello World' })
})

router.post('/ride/estimate', (req, res) => {
  estimateRideController.handle(req, res)
})

router.patch('/ride/confirm', (req, res) => {
  confirmRideController.handle(req, res)
})

export { router }