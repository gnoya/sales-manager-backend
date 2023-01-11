import { Request, Response } from 'express'
import { TypedResponse } from '../models/api.model'
import UserRepository from '../repositories/user.repository'
import {
  TransformedUser,
  transformUser,
  transformUserArray,
} from '../transforms/user.transform'

const userRepository = new UserRepository()

export default class UserController {
  async index(req: Request, res: TypedResponse<TransformedUser[]>) {
    const users = await userRepository.index()
    const transformedUsers = transformUserArray(users)
    res.json(transformedUsers)
  }

  async show(req: Request, res: TypedResponse<TransformedUser>) {
    const user = await userRepository.show(req.params.id)
    if (!user) return

    const transformedUser = transformUser(user)
    res.json(transformedUser)
  }

  async create(req: Request, res: Response) {
    res.send(req.body)
  }
}
