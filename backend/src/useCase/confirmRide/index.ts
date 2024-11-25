import { DriverRepository } from '~/repositories/implementations/DriverRepository'
import { TripRepository } from '~/repositories/implementations/TripRepository'
import { ConfirmRideUseCase } from './ConfirmRideUseCase'
import { ConfirmRideController } from './ConfirmRideController'

const driverReposiotry = new DriverRepository()
const tripRepository = new TripRepository()
const confirmRideUseCase = new ConfirmRideUseCase(driverReposiotry, tripRepository)
const confirmRideController = new ConfirmRideController(confirmRideUseCase)

export { confirmRideController }