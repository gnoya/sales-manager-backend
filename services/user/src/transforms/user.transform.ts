import { User } from '@prisma/client'

export interface TransformedUser
  extends Omit<User, 'password' | 'createdAt' | 'updatedAt'> {}

export function transformUser(data: User): TransformedUser {
  const { password, createdAt, updatedAt, ...transformedUser } = data

  return transformedUser
}

export function transformUserArray(data: User[]): TransformedUser[] {
  return data.map((user: User) => transformUser(user))
}
