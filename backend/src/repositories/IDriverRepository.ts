import { Driver } from "~/entities/Driver";

export interface IDriverRepository {
  findMany(distance: number): Promise<Driver[]>
}