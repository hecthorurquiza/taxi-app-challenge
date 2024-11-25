import { Driver } from '@prisma/client'

export class Trip {
  public readonly id: number
  public date: Date
  public origin: string
  public destination: string
  public distance: number
  public duration: string
  public value: number
  public customerId: string
  public driverId: number
  public driver: Driver

  constructor(props: Partial<Trip>) {
    Object.assign(this, props)
  }
}