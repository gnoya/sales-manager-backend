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
import showByEmailValidator from '../validators/user/show-by-email.validator'
import batchValidator from '../validators/user/batch.validator'

const userRepository = new UserRepository()

export default class UserController {
  /*
   */
  async index(
    req: Request,
    res: TypedResponse<{
      data: APIUser[]
      links: { count: number; pages: number }
    }>
  ) {
    try {
      // Validate request parameters
      const validated = await indexValidator(req, res)
      const { fullName, ...pagination } = validated

      // Get users from the database
      const users = await userRepository.index(pagination, { fullName })

      // Pagination information
      const count = await userRepository.countAll({ fullName })
      const pages = Math.ceil(count / (pagination.limit || 10))

      // Send the response after we transform the data
      res.json({ data: transformUserArray(users), links: { count, pages } })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async batch(req: Request, res: TypedResponse<{ data: APIUser[] }>) {
    try {
      // Validate request parameters
      const validated = await batchValidator(req, res)

      // Get users in batch from the database
      const users = await userRepository.batch(validated.ids)

      // Send the response after we transform the data
      res.json({ data: transformUserArray(users) })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async show(req: Request, res: TypedResponse<{ data: APIUser }>) {
    try {
      // Validate request parameters
      const validated = await showValidator(req, res)

      // Get user from the database
      const user = await userRepository.show(validated.id)

      // If user is not found, return 404 not found
      if (!user) {
        thrower(req, res, new ResourceNotFoundError())
        return
      }

      // Send the response after we transform the data
      res.json({ data: transformUser(user) })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async create(req: Request, res: TypedResponse<{ data: APIUser }>) {
    try {
      // Validate request parameters
      const validated = await storeValidator(req, res)

      // Create the user in the database
      const user = await userRepository.store(validated as User)

      // Send the response after we transform the data
      res.status(201).json({ data: transformUser(user) })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async destroy(req: Request, res: Response) {
    try {
      // Validate request parameters
      const validated = await showValidator(req, res)

      // Update the user in the database
      await userRepository.destroy(validated.id)

      // Send the response
      res.status(200).json({})
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async showByEmail(req: Request, res: TypedResponse<{ data: APIUser }>) {
    try {
      // Validate request parameters
      const validated = await showByEmailValidator(req, res)

      // Get user from the database
      const user = await userRepository.showByEmail(validated.email)

      // If user doesn't exists return 404 not found
      if (!user || !user.password) {
        thrower(req, res, new ResourceNotFoundError())
        return
      }

      // Transform user's data and add its password (this endpoint its just from internal usage)
      const transformedUser = transformUser(user)
      transformedUser.password = user.password

      // Send the response after we transform the data
      res.json({ data: transformedUser })
    } catch (error) {
      internal(req, res, error)
    }
  }
}
