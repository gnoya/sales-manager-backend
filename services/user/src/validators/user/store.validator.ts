import { Request, Response } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { catcher } from '../../errors/error-handler'
import { BadRequestError } from '../../errors/common'

export default async function storeValidator(req: Request, res: Response) {
  const schema = z.promise(
    z.object({
      fullName: z.string(),
      identification: z.string(),
      address: z.string(),
      phone: z.string(),
    })
  )

  const fields = {
    ...R.pick(['fullName', 'identification', 'address', 'phone'], req.body),
  }

  const validated = await schema
    .parseAsync(fields)
    .catch(catcher(req, res, new BadRequestError()))

  return { ...validated }
}
