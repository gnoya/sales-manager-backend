import { Request, Response } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { catcher } from '../../errors/error-handler'
import { BadRequestError } from '../../errors/common'

export default async function storeValidator(req: Request, res: Response) {
  const schema = z.promise(
    z.object({
      name: z.string(),
      quantity: z.number().min(0),
    })
  )

  const fields = {
    ...R.pick(['name', 'quantity'], req.body),
  }

  const validated = await schema
    .parseAsync(fields)
    .catch(catcher(req, res, new BadRequestError()))

  return { ...validated }
}
