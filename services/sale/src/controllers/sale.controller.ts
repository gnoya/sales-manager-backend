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
  async index(
    req: Request,
    res: TypedResponse<{
      data: APISale[]
      links: { count: number; pages: number }
    }>
  ) {
    try {
      // Validate request parameters
      const validated = await indexValidator(req, res)
      const { ...pagination } = validated

      // Fetch sales from database
      const sales = await saleRepository.index(pagination, {})

      // Pagination information
      const count = await saleRepository.countAll({})
      const pages = Math.ceil(count / (pagination.limit || 10))

      // Send the response after we transform the data
      res.json({ data: transformSaleArray(sales), links: { count, pages } })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async show(req: Request, res: TypedResponse<{ data: APISale }>) {
    try {
      // Validate request parameters
      const validated = await showValidator(req, res)

      // Fetch sale from database
      const sale = await saleRepository.show(validated.id)

      // If the sale is not found return 404 not found
      if (!sale) {
        thrower(req, res, new ResourceNotFoundError())
        return
      }

      // Send the response after we transform the data
      res.json({ data: transformSale(sale) })
    } catch (error) {
      internal(req, res, error)
    }
  }

  /*
   */
  async create(req: Request, res: TypedResponse<{ data: APISale }>) {
    try {
      // Validate request parameters
      const { product, user, ...validated } = await storeValidator(req, res)
      const newSale = {
        ...validated,
        price: product.price,
        profit: product.profit,
      }

      // Subtract inventory from product service
      const productService = new ProductService(req, res)
      await productService.subtract(product.id)

      // Create this new sale in the database
      const sale = await saleRepository.store(newSale as Sale)

      // Send the response after we transform the data
      res.status(201).json({ data: transformSale(sale) })
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

      // Update the sale in the database
      await saleRepository.destroy(validated.id)

      // Send the response
      res.status(200).json({})
    } catch (error) {
      internal(req, res, error)
    }
  }
}
