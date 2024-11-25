import { Trip } from '~/entities/Trip'
import { ITripRepository } from '../ITripRepository'
import { prismaClient } from '~/prismaClient'

export class TripRepository implements ITripRepository {
  async save(data: Trip): Promise<boolean> {
    try {
      const trip = await prismaClient.trip.create({
        data: {
          ...data,
          date: new Date()
        }
      })
      return !!trip
    }
    catch (err: any) {
      console.error(err)
      return false
    }
  }
}