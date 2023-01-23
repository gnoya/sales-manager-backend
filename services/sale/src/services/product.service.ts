import axios, { AxiosError } from 'axios'
import { Request, Response } from 'express'
import {
  APIProduct,
  ContractProductService,
} from '../../contracts/product.contract'
import { urls } from '../../contracts/urls'
import { Env } from '../../contracts/urls.config'
import { BadRequestError } from '../errors/common'
import { catcher } from '../errors/error-handler'
const env: Env = (process.env.NODE_ENV as Env) || 'development'

export default class ProductService implements ContractProductService {
  req: Request
  res: Response
  url: string

  constructor(req: Request, res: Response) {
    this.req = req
    this.res = res
    this.url = urls[env]['product'].url
  }

  async show(id: string): Promise<APIProduct> {
    const response = await axios
      .get(`${this.url}/products/${id}`)
      .catch(catcher(this.req, this.res))

    return response.data as APIProduct
  }

  async subtract(id: string): Promise<void> {
    await axios
      .put(`${this.url}/products/${id}/subtract`)
      .catch((error: AxiosError) => {
        catcher(
          this.req,
          this.res,
          new BadRequestError()
        )((error.response?.data as any).error)
      })
  }
}
