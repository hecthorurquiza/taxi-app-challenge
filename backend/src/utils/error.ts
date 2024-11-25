import { Response } from 'express'

export function sendErrorMessage(res: Response, status: number, code: string, message: string) {
  return res.status(status).json({
    error_code: code,
    error_description: message
  })
}
