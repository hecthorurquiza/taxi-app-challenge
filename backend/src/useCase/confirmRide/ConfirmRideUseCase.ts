import { ITripRepository } from '~/repositories/ITripRepository'
import { IDriverRepository } from '~/repositories/IDriverRepository'
import { IConfirmRideRequestDTO } from './ConfirmRideDTO'
import { Trip } from '~/entities/Trip'

export class ConfirmRideUseCase {
  constructor(
    private driverRepository: IDriverRepository,
    private tripRepository: ITripRepository
  ) {}

  async execute(data: IConfirmRideRequestDTO): Promise<boolean> {
    const driverDB = await this.driverRepository.findById(data.driver.id)

    if (!driverDB) throw new Error(`Motorista não encontrado para o id = ${data.driver.id}`)
    if (driverDB.minKm > (data.distance / 1000)) throw new Error('Quilometragem inválida para o motorista')

    const success = await this.tripRepository.save(new Trip({
      origin: data.origin,
      destination: data.destination,
      distance: data.distance,
      duration: data.duration,
      value: data.value,
      customerId: data.customerId,
      driverId: data.driver.id,
    }))

    if (!success) throw new Error('Erro ao confirmar viagem')
    return success
  }
}