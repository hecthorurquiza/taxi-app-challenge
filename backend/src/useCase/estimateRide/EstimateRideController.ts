import { Request, Response } from 'express'
import { EstimateRideUseCase } from './EstimateRideUseCase'
import { IEstimateRouteRequestDTO } from './EstimateRouteDTO'
import { sendErrorMessage } from '~/utils/error'

export class EstimateRideController {
  constructor(private estimateRideUseCase: EstimateRideUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { customer_id, origin, destination } = req.body

    const error = this.validadeRequest({ customerId: customer_id, origin, destination }, res)
    if (error) return error
    
    const estimateResp = await this.estimateRideUseCase.execute(
      {
        customerId: customer_id,
        origin: origin as string,
        destination: destination as string
      }
    )
    return res.status(200).json(estimateResp)
  }

  private validadeRequest(data: IEstimateRouteRequestDTO, res: Response) {
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

    return null
  }
}