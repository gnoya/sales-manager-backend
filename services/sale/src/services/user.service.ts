import axios from 'axios'
import { Request, Response } from 'express'
import {
  APIUser,
  ContractUserService,
  url,
} from '../../contracts/user.contract'
import { catcher } from '../errors/error-handler'

export default class UserService implements ContractUserService {
  req: Request
  res: Response

  constructor(req: Request, res: Response) {
    this.req = req
    this.res = res
  }

  async show(id: string) {
    const response = await axios
      .get(`${url}/users/${id}`)
      .catch(catcher(this.req, this.res))

    return response.data as APIUser
  }
}
