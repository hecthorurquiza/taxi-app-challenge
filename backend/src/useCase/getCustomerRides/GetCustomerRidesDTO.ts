interface IRide {
  id: number
  date: Date
  origin: string
  destination: string
  distance: number
  duration: string
  driver: {
    id: number
    name: string
  }
  value: number
}

export interface IGetCustomerRidesResponseDTO {
  customer_id: string
  rides: IRide[]
}