import axios from 'axios'
import { Request, Response } from 'express'
import { ContractAuthService, url } from '../../contracts/auth.contract'
import { catcher } from '../errors/error-handler'

export default class AuthService implements ContractAuthService {
  req: Request
  res: Response

  constructor(req: Request, res: Response) {
    this.req = req
    this.res = res
  }

  async checkToken(token: string) {
    await axios.get(`${url}/auth/token/${token}`)
  }
}
