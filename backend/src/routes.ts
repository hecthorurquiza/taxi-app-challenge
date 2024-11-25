import { Router } from 'express'
import { estimateRideController } from './useCase/estimateRide'
import { confirmRideController } from './useCase/confirmRide'
import { getCustomerRidesController } from './useCase/getCustomerRides'

const router = Router()

router.post('/ride/estimate', (req, res) => {
  estimateRideController.handle(req, res)
})

router.patch('/ride/confirm', (req, res) => {
  confirmRideController.handle(req, res)
})

router.get('/ride/:customer_id', (req, res) => {
  getCustomerRidesController.handle(req, res)
})

export { router }