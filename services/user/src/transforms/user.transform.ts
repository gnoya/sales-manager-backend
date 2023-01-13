import { User } from '@prisma/client'
import { APIUser } from '../../contracts/user.contract'

export function transformUser(data: User): APIUser {
  const { password, createdAt, updatedAt, ...transformedUser } = data

  return { discriminator: 'User', ...transformedUser }
}

export function transformUserArray(data: User[]) {
  return data.map((user: User) => transformUser(user))
}
