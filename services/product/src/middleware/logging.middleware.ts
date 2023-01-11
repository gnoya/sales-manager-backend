import { NextFunction, Request, Response } from 'express'

export default function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.info(`incoming ${req.method} request at route ${req.originalUrl}`)
  next()
}
