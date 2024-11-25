import { Request, Response } from 'express'
import { GetCustomerRidesUseCase } from './GetCustomerRidesUseCase'
import { sendErrorMessage } from '~/utils/error'

export class GetCustomerRidesController {
  constructor(private getCustomerRidesUseCase: GetCustomerRidesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { customer_id } = req.params
    const { driver_id } = req.query

    if (!customer_id) return sendErrorMessage(
      res, 400, 'INVALID_DATA', 'O ID do usuário não pode estar em branco.'
    )
    if (driver_id && !Number(driver_id)) return sendErrorMessage(
      res, 400, 'INVALID_DRIVER', 'ID do motorista inválido.'
    )

    try {
      const trips = await this.getCustomerRidesUseCase.execute(customer_id, Number(driver_id))
      if (trips.rides.length === 0) return sendErrorMessage(
        res, 404, 'NO_RIDES_FOUND', 'Nenhuma viagem encontrada.'
      )

      return res.status(200).json(trips)
    }
    catch (err: any) {
      return sendErrorMessage(res, 400, 'INVALID_DRIVER', err.message)
    }
  }
}