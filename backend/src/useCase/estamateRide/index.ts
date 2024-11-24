import { DriverRepository } from '~/repositories/implementations/DriverRepository'
import { EstimateRideUseCase } from './EstimateRideUseCase'
import { EstimateRideController } from './EstimateRideController'

const driverRepository = new DriverRepository()
const estimateRideUseCase = new EstimateRideUseCase(driverRepository)
const estimateRideController = new EstimateRideController(estimateRideUseCase)

export { estimateRideController }