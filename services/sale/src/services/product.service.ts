import axios, { AxiosError } from 'axios'
import { Request, Response } from 'express'
import {
  APIProduct,
  ContractProductService,
  url,
} from '../../contracts/product.contract'
import { BadRequestError } from '../errors/common'
import Error, { catcher } from '../errors/error-handler'

export default class ProductService implements ContractProductService {
  req: Request
  res: Response

  constructor(req: Request, res: Response) {
    this.req = req
    this.res = res
  }

  async show(id: string): Promise<APIProduct> {
    const response = await axios
      .get(`${url}/products/${id}`)
      .catch(catcher(this.req, this.res))

    return response.data as APIProduct
  }

  async subtract(id: string): Promise<void> {
    await axios
      .put(`${url}/products/${id}/subtract`)
      .catch((error: AxiosError) => {
        catcher(
          this.req,
          this.res,
          new BadRequestError()
        )((error.response?.data as any).error)
      })
  }
}
