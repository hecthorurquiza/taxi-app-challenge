import { DriverRepository } from '~/repositories/implementations/DriverRepository'
import { TripRepository } from '~/repositories/implementations/TripRepository'
import { GetCustomerRidesUseCase } from './GetCustomerRidesUseCase'
import { GetCustomerRidesController } from './GetCustomerRidesController'

const driverRepository = new DriverRepository()
const tripRepository = new TripRepository()
const getCustomerRidesUseCase = new GetCustomerRidesUseCase(driverRepository, tripRepository)
const getCustomerRidesController = new GetCustomerRidesController(getCustomerRidesUseCase)

export { getCustomerRidesController }