import { Request, Response } from 'express'
import { string, z } from 'zod'
import * as R from 'ramda'
import { catcher } from '../../errors/error-handler'
import { BadRequestError } from '../../errors/common'

export default async function updateValidator(req: Request, res: Response) {
  const schema = z.promise(
    z.object({
      id: string().uuid(),
      name: z.string().optional(),
      quantity: z.number().min(0).optional(),
    })
  )

  const fields = {
    id: req.params.id,
    ...R.pick(['name', 'quantity'], req.body),
  }

  const validated = await schema
    .parseAsync(fields)
    .catch(catcher(req, res, new BadRequestError()))

  return { ...validated }
}
