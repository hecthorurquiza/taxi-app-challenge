import { Response } from 'express'

export function sendErrorInvalidData(res: Response, message: string) {
  return res.status(400).json({
    error_code: 'INVALID_DATA',
    error_description: message
  })
}

export function sendErrorDriverNotFound(res: Response, message: string) {
  return res.status(404).json({
    error_code: 'DRIVER_NOT_FOUND',
    error_description: message
  })
}

export function sendErrorInvalidDistance(res: Response, message: string) {
  return res.status(406).json({
    error_code: 'INVALID_DISTANCE',
    error_description: message
  })
}

export function sendErrorServerError(res: Response, message: string) {
  return res.status(500).json({
    error_code: 'SERVER_ERROR',
    error_description: message
  })
}

