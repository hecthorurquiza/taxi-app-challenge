export interface IEstimateRouteRequestDTO {
  customerId: string
  origin: string
  destination: string
}

export interface IEstimateRouteResponseDTO {
  origin: {
    latitude: number,
    longitude: number
  },
  destination: {
    latitude: number,
    longitude: number
  },
  distance: number,
  duration: string,
  options: {
    id: number,
    name: string,
    description: string,
    vehicle: string,
    review: {
      rating: string,
      comment: string
    },
    value: number
  }[],
  routeResponse: object
}