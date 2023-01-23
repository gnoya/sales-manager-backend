import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWTErrors } from '../errors/common'
import { errorHandler, internal, thrower } from '../errors/error-handler'
import { AuthJWTPayload } from '../../contracts/auth.contract'
import AuthService from '../services/auth.service'

export default async function JWTMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = req.get('Authorization')

  if (!bearerToken) {
    thrower(req, res, new JWTErrors.MissingJWTError())
    return
  }

  const token = bearerToken.split('Bearer ')[1]

  const authService = new AuthService(req, res)

  try {
    await authService.checkToken(token)
    next()
  } catch (error) {
    errorHandler(req, res, new JWTErrors.InvalidJWTError(token))
  }
}
