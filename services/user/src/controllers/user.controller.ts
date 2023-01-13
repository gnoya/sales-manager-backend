import { Request, Response } from 'express'
import { APIUser } from '../../contracts/user.contract'
import { TypedResponse } from '../utils/typed'
import { transformUser, transformUserArray } from '../transforms/user.transform'
import UserRepository from '../repositories/user.repository'
import { internal, thrower } from '../errors/error-handler'
import indexValidator from '../validators/user/index.validator'
import showValidator from '../validators/user/show.validator'
import { ResourceNotFoundError } from '../errors/common'
import storeValidator from '../validators/user/store.validator'
import { User } from '@prisma/client'

const userRepository = new UserRepository()

export default class UserController {
  /*
   */
  async index(req: Request, res: TypedResponse<APIUser[]>) {
    try {
      await indexValidator(req, res)
      const users = await userRepository.index()

      res.json(transformUserArray(users))
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async show(req: Request, res: TypedResponse<APIUser>) {
    try {
      const validated = await showValidator(req, res)
      const user = await userRepository.show(validated.id)

      if (!user) {
        thrower(req, res, new ResourceNotFoundError())
        return
      }

      res.json(transformUser(user))
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async create(req: Request, res: Response) {
    try {
      const validated = await storeValidator(req, res)
      await userRepository.store(validated as User)

      res.status(201).send({})
    } catch (error) {
      internal(req, res, error)
    }
  }
}
