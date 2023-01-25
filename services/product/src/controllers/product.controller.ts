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
import updateValidator from '../validators/product/update.validatory'
import batchValidator from '../validators/product/batch.validator'

const productRepository = new ProductRepository()

export default class ProductController {
  /*
   */
  async index(
    req: Request,
    res: TypedResponse<{
      data: APIProduct[]
      links: { count: number; pages: number }
    }>
  ) {
    try {
      // Validate request parameters
      const validated = await indexValidator(req, res)
      const { name, ...pagination } = validated

      // Fetch products from the database
      const products = await productRepository.index(pagination, { name })

      // Pagination information
      const count = await productRepository.countAll({ name })
      const pages = Math.ceil(count / (pagination.limit || 10))

      // Send the response after we transform the data
      res.json({
        data: transformProductArray(products),
        links: { count, pages },
      })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async batch(req: Request, res: TypedResponse<{ data: APIProduct[] }>) {
    try {
      // Validate request parameters
      const validated = await batchValidator(req, res)

      // Get products in batch from the database
      const products = await productRepository.batch(validated.ids)

      // Send the response after we transform the data
      res.json({ data: transformProductArray(products) })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async show(req: Request, res: TypedResponse<{ data: APIProduct }>) {
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
      res.json({ data: transformProduct(product) })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async create(req: Request, res: TypedResponse<{ data: APIProduct }>) {
    try {
      // Validate request parameters
      const validated = await storeValidator(req, res)

      // Create the new product in the database
      const product = await productRepository.store(validated as Product)

      // Send the response after we transform the data
      res.status(201).json({ data: transformProduct(product) })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async update(req: Request, res: TypedResponse<{ data: APIProduct }>) {
    try {
      // Validate request parameters
      const validated = await updateValidator(req, res)

      // Update the product in the database
      const product = await productRepository.update(
        validated.id,
        validated as Product
      )

      // Send the response after we transform the data
      res.status(202).json({ data: transformProduct(product) })
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

      // Update the product in the database
      await productRepository.destroy(validated.id)

      // Send the response
      res.status(200).json({})
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
