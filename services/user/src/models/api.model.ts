import { Send } from 'express-serve-static-core'
import { Response } from 'express'

export interface TypedResponse<T> extends Response {
  json: Send<T, this>
}
