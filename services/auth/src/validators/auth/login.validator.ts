import { Request, Response } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { catcher } from '../../errors/error-handler'
import { BadRequestError } from '../../errors/common'

export default async function loginValidator(req: Request, res: Response) {
  const schema = z.promise(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  )

  const fields = {
    ...R.pick(['email', 'password'], req.body),
  }

  const validated = await schema
    .parseAsync(fields)
    .catch(catcher(req, res, new BadRequestError()))

  return { ...validated }
}
