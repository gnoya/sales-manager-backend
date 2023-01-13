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
import { ResourceNotFoundError } from '../errors/common'
import storeValidator from '../validators/product/store.validator'
import { Product } from '@prisma/client'

const productRepository = new ProductRepository()

export default class ProductController {
  /*
   */
  async index(req: Request, res: TypedResponse<APIProduct[]>) {
    try {
      await indexValidator(req, res)
      const products = await productRepository.index()

      res.json(transformProductArray(products))
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async show(req: Request, res: TypedResponse<APIProduct>) {
    try {
      const validated = await showValidator(req, res)
      const product = await productRepository.show(validated.id)

      if (!product) {
        thrower(req, res, new ResourceNotFoundError())
        return
      }

      res.json(transformProduct(product))
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async create(req: Request, res: Response) {
    try {
      const validated = await storeValidator(req, res)
      await productRepository.store(validated as Product)

      res.status(201).send({})
    } catch (error) {
      internal(req, res, error)
    }
  }
}
