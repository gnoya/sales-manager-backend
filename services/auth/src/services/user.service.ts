import axios from 'axios'
import { Request, Response } from 'express'
import { Env, urls } from '../../contracts/urls.config'
import { APIUser, ContractUserService } from '../../contracts/user.contract'
import { catcher } from '../errors/error-handler'
const env: Env = (process.env.NODE_ENV as Env) || 'development'

export default class UserService implements ContractUserService {
  req: Request
  res: Response
  url: string

  constructor(req: Request, res: Response) {
    this.req = req
    this.res = res
    this.url = urls[env]['user'].url
  }

  async showByEmail(email: string) {
    const response = await axios
      .get(`${this.url}/users/email/${email}`)
      .catch(catcher(this.req, this.res))

    return response.data as APIUser
  }
}
