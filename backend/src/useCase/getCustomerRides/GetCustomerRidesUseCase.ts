import { IDriverRepository } from '~/repositories/IDriverRepository'
import { ITripRepository } from '~/repositories/ITripRepository'
import { IGetCustomerRidesResponseDTO } from './GetCustomerRidesDTO'
import { Trip } from '~/entities/Trip'

export class GetCustomerRidesUseCase {
  constructor(
    private driverRepository: IDriverRepository,
    private tripRepository: ITripRepository
  ) {}

  async execute(customerId: string, driverId?: number): Promise<IGetCustomerRidesResponseDTO> {
    let trips: Trip[] = []

    if (driverId) {
      const driverDB = await this.driverRepository.findById(driverId)
      if (!driverDB) throw new Error('ID do motorista inválido.')

      trips = await this.tripRepository.findMany(customerId, driverId)
    }
    else {
      trips = await this.tripRepository.findMany(customerId)
    }
      
    return {
      customer_id: customerId,
      rides: trips.map(trip => ({
        id: trip.id,
        date: trip.date,
        origin: trip.origin,
        destination: trip.destination,
        distance: trip.distance,
        duration: trip.duration,
        driver: {
          id: trip.driverId,
          name: trip.driver.name
        },
        value: trip.value
      }))
    }
  }
}