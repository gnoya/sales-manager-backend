import { NextFunction, Request, Response } from 'express'
import AppLogger from '../utils/Logger'

const logger = new AppLogger()

export default function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(`Incoming ${req.method} request at route ${req.originalUrl}`)
  next()
}
