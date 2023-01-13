import type { Request, Response } from 'express'

import Logger from '../utils/Logger'

const logger = new Logger()

interface IErrorFeed {
  status?: number
  title?: string
  detail?: string
  meta?: any
}

export default class Error {
  status = 500
  title = 'InternalServerError'
  detail?: string
  meta: any

  constructor(feed: IErrorFeed = {}) {
    this.status = feed.status || this.status
    this.title = feed.title || this.title
    this.detail = feed.detail
    this.meta = feed.meta || {}
  }
}

const exceptionAfterHeadersSentDetail = (
  method: 'Error.throw' | 'Error.catch'
) =>
  `The server triggered an exception using ${method} \
after the headers were sent, the server is unable to send error response. \
Please check you code, there may be some inconsistencies`

export const catcher =
  (req: Request, res: Response, error?: Error) => (catchedError: unknown) => {
    // Case: the response error is not defined
    if (!error)
      error = new Error({
        meta: { route: req.originalUrl, originalError: catchedError },
      })

    // Attaching the catched error
    error.meta.originalError = catchedError

    // Case: headers already sent
    if (res.headersSent)
      throw new Error({
        title: 'exceptionAfterHeadersSent',
        detail: exceptionAfterHeadersSentDetail('Error.catch'),
        meta: {
          route: req.originalUrl,
          originalError: error,
        },
      })

    res.status(error.status).json({ error })

    throw error
  }

export const thrower = (req: Request, res: Response, error?: Error): never => {
  // Case: the response error is not defined
  if (!error)
    error = new Error({
      meta: { route: req.originalUrl },
    })

  // Case: headers already sent
  if (res.headersSent)
    throw new Error({
      title: 'exceptionAfterHeadersSent',
      detail: exceptionAfterHeadersSentDetail('Error.throw'),
      meta: {
        route: req.originalUrl,
        originalError: error,
      },
    })

  res.status(error.status).json({ error })

  throw error
}

export const internal = (req: Request, res: Response, error?: unknown) => {
  if (res.headersSent) logger.error(error)
  else {
    const internalError = new Error({
      detail: 'An unexpected exception has occurred.',
      meta: { route: req.originalUrl, error },
    })

    res.status(internalError.status).json({ error: internalError })
    logger.error(internalError)
  }
}
