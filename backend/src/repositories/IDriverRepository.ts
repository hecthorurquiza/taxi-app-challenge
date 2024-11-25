import { Driver } from '~/entities/Driver'

export interface IDriverRepository {
  findMany(distance: number): Promise<Driver[]>
  findById(id: number): Promise<Driver | null>
}