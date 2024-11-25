import { IDriverRepository } from '~/repositories/IDriverRepository'
import { IEstimateRouteRequestDTO, IEstimateRouteResponseDTO } from './EstimateRouteDTO'
import axios, { AxiosResponse } from 'axios'

interface IAddress {
  address: string;
}

interface IRouteRequest {
  origin: IAddress;
  destination: IAddress;
  travelMode: string;
}

interface IOptions {
  id: number
  name: string
  description: string
  vehicle: string
  review: {
    rating: string
    comment: string
  }
  value: number
}

export class EstimateRideUseCase {
  constructor(private driverRepository: IDriverRepository) {}

  async execute(data: IEstimateRouteRequestDTO): Promise<IEstimateRouteResponseDTO> {
    const axiosResponse = await this.getRoute(data.origin, data.destination)

    const distance = axiosResponse.data.routes[0].distanceMeters

    const drivers = await this.driverRepository.findMany(distance)

    const originLat = axiosResponse.data.routes[0].legs[0].startLocation.latLng.latitude
    const originLng = axiosResponse.data.routes[0].legs[0].startLocation.latLng.longitude
    const destinationLat = axiosResponse.data.routes[0].legs[0].endLocation.latLng.latitude
    const destinationLng = axiosResponse.data.routes[0].legs[0].endLocation.latLng.longitude
    const duration = axiosResponse.data.routes[0].duration

    const options: IOptions[] = await Promise.all(drivers.map(driver => {
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: {
          rating: driver.rating,
          comment: driver.comment
        },
        value: driver.fare
      }
    }))

    return {
      origin: {
        latitude: originLat,
        longitude: originLng
      },
      destination: {
        latitude: destinationLat,
        longitude: destinationLng
      },
      distance,
      duration,
      options,
      routeResponse: axiosResponse.data
    }
  }

  private async getRoute(originReq: string, destinationReq: string): Promise<AxiosResponse> {
    const googleMapsApiBody: IRouteRequest = {
      origin: {
        address: originReq
      },
      destination: {
        address: destinationReq
      },
      travelMode: 'DRIVE'
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation'
    }

    try {
      const response = await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', googleMapsApiBody, { headers })
      return response
    }
    catch (err: any) {
      console.error(err)
      return err.response
    }
  }
}