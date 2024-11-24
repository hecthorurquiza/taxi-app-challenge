export class Driver {
  public readonly id!: number
  public name!: string
  public description!: string
  public car!: string
  public rating!: string
  public comment!: string
  public fare!: number
  public minKm!: number

  constructor(props: Partial<Driver>) {
    Object.assign(this, props)
  }
}