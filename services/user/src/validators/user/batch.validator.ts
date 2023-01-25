import { Request, Response } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { catcher } from '../../errors/error-handler'
import { BadRequestError } from '../../errors/common'

export default async function batchValidator(req: Request, res: Response) {
  const schema = z.promise(
    z.object({
      ids: z.array(z.string().uuid()),
    })
  )

  const fields = {
    ...R.pick(['ids'], req.query),
  }

  const validated = await schema
    .parseAsync(fields)
    .catch(catcher(req, res, new BadRequestError()))

  return { ...validated }
}
