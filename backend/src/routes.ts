import { Router } from 'express'
import { estimateRideController } from './useCase/estamateRide'

const router = Router()

router.get('/hello', (req, res) => {
  return res.status(200).json({ message: 'Hello World' })
})

router.post('/ride/estimate', async (req, res) => {
  await estimateRideController.handle(req, res)
})

export { router }