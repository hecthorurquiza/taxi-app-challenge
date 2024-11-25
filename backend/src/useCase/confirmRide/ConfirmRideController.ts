import { Request, Response } from 'express'
import { ConfirmRideUseCase } from './ConfirmRideUseCase'
import { IConfirmRideRequestDTO } from './ConfirmRideDTO'
import { sendErrorDriverNotFound, sendErrorInvalidData, sendErrorInvalidDistance, sendErrorServerError } from '~/utils/error'

export class ConfirmRideController {
  constructor(private confirmRideUseCase: ConfirmRideUseCase) {}

  async handle(req: Request, res: Response) {
    const { customer_id, origin, destination, distance, duration, driver, value } = req.body

    const error = this.validateRequest({
      customerId: customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value
    }, res)
    if (error) return error

    try {
      const success = await this.confirmRideUseCase.execute({
        customerId: customer_id,
        origin,
        destination,
        distance,
        duration,
        driver,
        value
      })

      return res.status(200).json(success)
    } catch (err: any) {
      if (err.message.includes('não encontrado')) {
        return sendErrorDriverNotFound(res, err.message)
      }
      else if (err.message.includes('inválida')) {
        return sendErrorInvalidDistance(res, err.message)
      }
      else {
        return sendErrorServerError(res, err.message)
      }
    }
  }

  private validateRequest(data: IConfirmRideRequestDTO, res: Response) {
    if (!data.customerId) return sendErrorInvalidData(res, 'O ID do usuário não pode estar em branco.')
    if (!data.origin) return sendErrorInvalidData(res, 'O endereço de origem não pode estar em branco.')
    if (!data.destination) return sendErrorInvalidData(res, 'O endereço de destino não pode estar em branco.')
    if (data.destination === data.origin) return sendErrorInvalidData(res, 'O endereço de origem e destino não podem ser iguais.')
    if (!data.distance) return sendErrorInvalidData(res, 'A distância não pode estar em branco.')
    if (!data.duration) return sendErrorInvalidData(res, 'A duração não pode estar em branco.')
    if (!data.driver) return sendErrorInvalidData(res, 'O motorista não pode estar em branco.')
    if (!data.value) return sendErrorInvalidData(res, 'O valor da viagem não pode estar em branco.')

    return null
  }
}
