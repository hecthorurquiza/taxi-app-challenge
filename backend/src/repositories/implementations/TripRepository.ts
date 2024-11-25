import { Trip } from '~/entities/Trip'
import { ITripRepository } from '../ITripRepository'
import { prismaClient } from '~/utils/prismaClient'

export class TripRepository implements ITripRepository {
  async save(data: Trip): Promise<boolean> {
    const { driver, ...tripData } = data

    try {
      const trip = await prismaClient.trip.create({
        data: { 
          ...tripData, 
          date: new Date(),
        }
      })
      return !!trip
    }
    catch (err: any) {
      console.error(err)
      return false
    }
  }
  async findMany(customerId: string, driverId?: number): Promise<Trip[]> {
    try {
      const trips = await prismaClient.trip.findMany({
        where: {
          customerId,
          driverId
        },
        include: {
          driver: true
        },
        orderBy: { date: 'desc' }
      })
      return await Promise.all(trips.map(trip => new Trip(trip)))
    }
    catch (err: any) {
      console.error(err)
      return []
    }
  }
}