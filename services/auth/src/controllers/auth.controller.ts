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
  async login(
    req: Request,
    res: TypedResponse<{ data: APIUser & { token: string } }>
  ) {
    try {
      // Validate request parameters
      const validated = await loginValidator(req, res)

      // Fetch the user given an email
      const userService = new UserService(req, res)
      const user = await userService.showByEmail(validated.email)

      // If user with given email doesn't exist return 400 wrong credentials
      if (!user || !user.password) {
        thrower(req, res, new WrongCredentialsError())
        return
      }

      // Compare hashed password with given one
      let auth = await bcrypt.compare(validated.password, user.password)
      if (!auth) {
        thrower(req, res, new WrongCredentialsError())
        return
      }

      // Remove previous token
      await jwtRepository.removeAllTokens(user.id)

      // Generate and store new token
      const token = await jwtRepository.generateToken(user)

      // Delete password so it is not sent
      delete user.password

      // Return the user
      res.json({ data: { ...user, token } })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async checkToken(req: Request, res: Response) {
    try {
      // Validate request parameters
      const validated = await checkTokenValidator(req, res)

      // Decode token
      const decoded = await jwtRepository.decodeToken(validated.token)
      if (!decoded) {
        thrower(req, res, new JWTErrors.BadJWTError(validated.token))
        return
      }

      // Get the jwt of the given userId
      const jwt = await jwtRepository.showByUserId(decoded.userId)
      if (!jwt) {
        thrower(req, res, new JWTErrors.InvalidJWTError(validated.token))
        return
      }

      // Send 200 ok
      res.json({})
    } catch (error) {
      internal(req, res, error)
    }
  }
}
