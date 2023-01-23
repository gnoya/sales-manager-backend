import axios from 'axios'
import { Request, Response } from 'express'
import { ContractAuthService } from '../../contracts/auth.contract'
import { Env, urls } from '../../contracts/urls.config'
const env: Env = (process.env.NODE_ENV as Env) || 'development'

export default class AuthService implements ContractAuthService {
  req: Request
  res: Response
  url: string

  constructor(req: Request, res: Response) {
    this.req = req
    this.res = res
    this.url = urls[env]['auth'].url
  }

  async checkToken(token: string) {
    await axios.get(`${this.url}/auth/token/${token}`)
  }
}
