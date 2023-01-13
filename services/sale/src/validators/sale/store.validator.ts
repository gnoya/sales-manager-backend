import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { catcher } from '../../errors/error-handler'
import { BadRequestError } from '../../errors/common'

export default async function storeValidator(req: Request, res: Response) {
  const schema = z.promise(
    z.object({
      productId: z.string().uuid(),
      userId: z.string().uuid(),
      quantity: z.number(),
      deliveryDate: z.date(),
    })
  )

  const fields = {
    ...R.pick(['productId', 'userId', 'quantity', 'deliveryDate'], req.body),
  }

  const validated = await schema
    .parseAsync(fields)
    .catch(catcher(req, res, new BadRequestError()))

  return { ...validated }
}
