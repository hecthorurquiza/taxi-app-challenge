import { Request, Response } from 'express'
import { ConfirmRideUseCase } from './ConfirmRideUseCase'
import { IConfirmRideRequestDTO } from './ConfirmRideDTO'
import { sendErrorMessage } from '~/utils/error'

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

      return res.status(200).json({ success })
    } catch (err: any) {
      if (err.message.includes('não encontrado')) {
        return sendErrorMessage(res, 404, 'DRIVER_NOT_FOUND', err.message)
      }
      else if (err.message.includes('inválida')) {
        return sendErrorMessage(res, 406, 'INVALID_DISTANCE', err.message)
      }
      else {
        return sendErrorMessage(res, 500, 'SERVER_ERROR', err.message)
      }
    }
  }

  private validateRequest(data: IConfirmRideRequestDTO, res: Response) {
    if (!data.customerId) return sendErrorMessage(
      res, 400, 'INVALID_DATA', 'O ID do usuário não pode estar em branco.'
    )
    if (!data.origin) return sendErrorMessage(
      res, 400, 'INVALID_DATA', 'O endereço de origem não pode estar em branco.'
    )
    if (!data.destination) return sendErrorMessage(
      res, 400, 'INVALID_DATA', 'O endereço de destino não pode estar em branco.'
    )
    if (data.destination === data.origin) return sendErrorMessage(
      res, 400, 'INVALID_DATA', 'O endereço de origem e destino não podem ser iguais.'
    )
    if (!data.distance) return sendErrorMessage(
      res, 400, 'INVALID_DATA', 'A distância não pode estar em branco.'
    )
    if (!data.duration) return sendErrorMessage(
      res, 400, 'INVALID_DATA', 'A duração não pode estar em branco.'
    )
    if (!data.driver) return sendErrorMessage(
      res, 400, 'INVALID_DATA', 'O motorista não pode estar em branco.'
    )
    if (!data.value) return sendErrorMessage(
      res, 400, 'INVALID_DATA', 'O valor da viagem não pode estar em branco.'
    )

    return null
  }
}
