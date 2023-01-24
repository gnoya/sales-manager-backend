import { Request, Response } from 'express'
import { APIProduct } from '../../contracts/product.contract'
import { TypedResponse } from '../utils/typed'
import {
  transformProduct,
  transformProductArray,
} from '../transforms/product.transform'
import ProductRepository from '../repositories/product.repository'
import { internal, thrower } from '../errors/error-handler'
import indexValidator from '../validators/product/index.validator'
import showValidator from '../validators/product/show.validator'
import { BadRequestError, ResourceNotFoundError } from '../errors/common'
import storeValidator from '../validators/product/store.validator'
import { Product } from '@prisma/client'

const productRepository = new ProductRepository()

export default class ProductController {
  /*
   */
  async index(req: Request, res: TypedResponse<APIProduct[]>) {
    try {
      // Validate request parameters
      await indexValidator(req, res)

      // Fetch products from the database
      const products = await productRepository.index()

      // Send the response after we transform the data
      res.json(transformProductArray(products))
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async show(req: Request, res: TypedResponse<APIProduct>) {
    try {
      // Validate request parameters
      const validated = await showValidator(req, res)

      // Fetch the product from the database
      const product = await productRepository.show(validated.id)

      // If product doesn't exists return 404 not found
      if (!product) {
        thrower(req, res, new ResourceNotFoundError())
        return
      }

      // Send the response after we transform the data
      res.json(transformProduct(product))
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async create(req: Request, res: TypedResponse<APIProduct>) {
    try {
      // Validate request parameters
      const validated = await storeValidator(req, res)

      // Create the new product in the database
      const product = await productRepository.store(validated as Product)

      // Send the response after we transform the data
      res.status(201).json(transformProduct(product))
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async subtract(req: Request, res: Response) {
    try {
      // Validate request parameters
      const validated = await showValidator(req, res)
      const product = await productRepository.show(validated.id)

      // If product doesn't exists return 404 not found
      if (!product) {
        thrower(req, res, new ResourceNotFoundError())
        return
      }

      // If inventory is 0 return 400 not enough inventory
      if (product.quantity === 0) {
        thrower(req, res, new BadRequestError('Not enought inventory'))
        return
      }

      // Subtract one to quantity in the product
      await productRepository.update(product.id, {
        quantity: product.quantity - 1,
      } as Product)

      // Send the response
      res.status(202).json({})
    } catch (error) {
      internal(req, res, error)
    }
  }
}
