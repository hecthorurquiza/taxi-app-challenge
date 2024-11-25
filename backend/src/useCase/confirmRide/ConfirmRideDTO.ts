interface IRequestDriver {
  id: number
  name: string
}

export interface IConfirmRideRequestDTO {
  customerId: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: IRequestDriver
  value: number
}
