import { Driver } from '~/entities/Driver'
import { IDriverRepository } from '../IDriverRepository'
import { prismaClient } from '~/prismaClient'

export class DriverRepository implements IDriverRepository {
  async findMany(distance: number): Promise<Driver[]> {
    const distanceKm = distance / 1000
    const drivers = await prismaClient.driver.findMany({
      where: { minKm: { lte: distanceKm } },
      orderBy: { fare: 'asc' }
    })
    return await Promise.all(drivers.map(driver => new Driver(driver)))
  }
}