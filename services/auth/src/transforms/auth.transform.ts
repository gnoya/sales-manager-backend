import { Auth } from '@prisma/client'
import { APIAuth } from '../../contracts/auth.contract'

export function transformAuth(data: Auth): APIAuth {
  const { password, createdAt, updatedAt, ...transformedAuth } = data

  return { discriminator: 'Auth', ...transformedAuth }
}

export function transformAuthArray(data: Auth[]) {
  return data.map((auth: Auth) => transformAuth(auth))
}
