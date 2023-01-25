import { Request, Response } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { catcher } from '../../errors/error-handler'
import { BadRequestError } from '../../errors/common'

export default async function indexValidator(req: Request, res: Response) {
  const schema = z.promise(
    z.object({
      fullName: z.string().optional(),
      page: z.number().min(1).optional(),
      limit: z.number().min(1).max(100).optional(),
    })
  )

  const fields = {
    fullName: req.query.fullName,
    page: req.query.page && +req.query.page,
    limit: req.query.limit && +req.query.limit,
    ...R.pick([''], req.params),
  }

  const validated = await schema
    .parseAsync(fields)
    .catch(catcher(req, res, new BadRequestError()))

  return { ...validated }
}
