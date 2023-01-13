import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { catcher } from '../../errors/error-handler'
import { BadRequestError, ResourceNotFoundError } from '../../errors/common'
import UserService from '../../services/user.service'
import ProductService from '../../services/product.service'

export default async function storeValidator(req: Request, res: Response) {
  const schema = z.promise(
    z.object({
      productId: z.string().uuid(),
      userId: z.string().uuid(),
      quantity: z.number(),
      deliveryDate: z.string(),
    })
  )

  const fields = {
    ...R.pick(['productId', 'userId', 'quantity', 'deliveryDate'], req.body),
  }

  const validated = await schema
    .parseAsync(fields)
    .catch(catcher(req, res, new BadRequestError()))

  const userService = new UserService(req, res)
  const productService = new ProductService(req, res)

  const product = await productService
    .show(validated.productId)
    .catch(catcher(req, res, new ResourceNotFoundError()))

  const user = await userService
    .show(validated.userId)
    .catch(catcher(req, res, new ResourceNotFoundError()))

  return { ...validated, product, user }
}
