import { Request, Response } from 'express'
import { APISale } from '../../contracts/sale.contract'
import { TypedResponse } from '../utils/typed'
import { transformSale, transformSaleArray } from '../transforms/sale.transform'
import SaleRepository from '../repositories/sale.repository'
import { internal, thrower } from '../errors/error-handler'
import indexValidator from '../validators/sale/index.validator'
import showValidator from '../validators/sale/show.validator'
import { ResourceNotFoundError } from '../errors/common'
import storeValidator from '../validators/sale/store.validator'
import { Sale } from '@prisma/client'
import ProductService from '../services/product.service'

const saleRepository = new SaleRepository()

export default class SaleController {
  /*
   */
  async index(req: Request, res: TypedResponse<APISale[]>) {
    try {
      await indexValidator(req, res)
      const sales = await saleRepository.index()

      res.json(transformSaleArray(sales))
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async show(req: Request, res: TypedResponse<APISale>) {
    try {
      const validated = await showValidator(req, res)
      const sale = await saleRepository.show(validated.id)

      if (!sale) {
        thrower(req, res, new ResourceNotFoundError())
        return
      }

      res.json(transformSale(sale))
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async create(req: Request, res: Response) {
    try {
      const { product, user, ...validated } = await storeValidator(req, res)
      const newSale = {
        ...validated,
        price: product.price,
        profit: product.profit,
      }

      await saleRepository.store(newSale as Sale)

      const productService = new ProductService(req, res)
      await productService.subtract(product.id)

      res.status(201).send({})
    } catch (error) {
      internal(req, res, error)
    }
  }
}
