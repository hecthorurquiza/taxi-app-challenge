import { Request, Response } from 'express'
import { EstimateRideUseCase } from './EstimateRideUseCase'

export class EstimateRideController {
  constructor(private estimateRideUseCase: EstimateRideUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { customer_id, origin, destination } = req.body

    if (!customer_id) return res.status(400).json({
      error_code: 400,
      error_description: 'O ID do usuário não pode estar em branco.'
    })

    if (!origin) return res.status(400).json({
      error_code: 400,
      error_description: 'O endereço de origem não pode estar em branco.'
    })

    if (!destination) return res.status(400).json({
      error_code: 400,
      error_description: 'O endereço de destino não pode estar em branco.'
    })

    if (destination === origin) return res.status(400).json({
      error_code: 400,
      error_description: 'O endereço de origem e destino não podem ser iguais.'
    })

    const estimateResp = await this.estimateRideUseCase.execute(
      {
        customerId: customer_id,
        origin: origin as string,
        destination: destination as string
      }
    )
    return res.status(200).json(estimateResp)
    return res.status(200).json({ok: true})
  }
}