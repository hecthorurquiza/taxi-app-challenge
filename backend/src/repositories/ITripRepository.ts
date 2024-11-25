import { Trip } from '~/entities/Trip'

export interface ITripRepository {
  save(data: Trip): Promise<boolean>
}