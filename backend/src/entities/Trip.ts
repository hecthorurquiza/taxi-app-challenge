export class Trip {
  public readonly id!: number
  public date!: Date
  public origin!: string
  public destination!: string
  public distance!: number
  public duration!: string
  public driverId!: number
  public value!: number

  constructor(props: Partial<Trip>) {
    Object.assign(this, props)
  }
}