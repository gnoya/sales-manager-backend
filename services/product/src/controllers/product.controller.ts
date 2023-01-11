import { Request, Response } from 'express'
import { TypedResponse } from '../models/api.model'
import ProductRepository from '../repositories/product.repository'
import {
  TransformedProduct,
  transformProduct,
  transformProductArray,
} from '../transforms/product.transform'

const productRepository = new ProductRepository()

export default class ProductController {
  async index(req: Request, res: TypedResponse<TransformedProduct[]>) {
    const products = await productRepository.index()
    const transformedProducts = transformProductArray(products)
    res.json(transformedProducts)
  }

  async show(req: Request, res: TypedResponse<TransformedProduct>) {
    const product = await productRepository.show(req.params.id)
    if (!product) return

    const transformedProduct = transformProduct(product)
    res.json(transformedProduct)
  }

  async create(req: Request, res: Response) {
    res.send(req.body)
  }
}
