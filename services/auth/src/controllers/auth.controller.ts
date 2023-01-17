import { Request, Response } from 'express'
import JWTRepository from '../repositories/jwt.repository'
import { internal, thrower } from '../errors/error-handler'
import UserService from '../services/user.service'
import loginValidator from '../validators/auth/login.validator'
import { JWTErrors, WrongCredentialsError } from '../errors/common'
import bcrypt from 'bcrypt'
import { TypedResponse } from '../utils/typed'
import { APIUser } from '../../contracts/user.contract'
import checkTokenValidator from '../validators/auth/check-token.validator'

const jwtRepository = new JWTRepository()

export default class AuthController {
  /*
   */
  async login(req: Request, res: TypedResponse<APIUser & { token: string }>) {
    try {
      const validated = await loginValidator(req, res)

      const userService = new UserService(req, res)
      const user = await userService.showByEmail(validated.email)

      if (!user || !user.password) {
        thrower(req, res, new WrongCredentialsError())
        return
      }

      //---------------------- auth comparison
      let auth = await bcrypt.compare(validated.password, user.password)
      if (!auth) {
        thrower(req, res, new WrongCredentialsError())
        return
      }

      //---------------------- token management
      await jwtRepository.removeAllTokens(user.id)
      const token = await jwtRepository.generateToken(user)

      delete user.password

      res.json({ ...user, token })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async checkToken(req: Request, res: Response) {
    try {
      const validated = await checkTokenValidator(req, res)

      //---------------------- decoding token
      const decoded = await jwtRepository.decodeToken(validated.token)
      if (!decoded) {
        thrower(req, res, new JWTErrors.BadJWTError(validated.token))
        return
      }

      const jwt = await jwtRepository.showByUserId(decoded.userId)
      if (!jwt) {
        thrower(req, res, new JWTErrors.InvalidJWTError(validated.token))
        return
      }

      res.json({})
    } catch (error) {
      internal(req, res, error)
    }
  }
}
