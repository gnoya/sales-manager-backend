import { User } from '@prisma/client'

import ApplicationPrisma from '../database/application.prisma'

const prisma = ApplicationPrisma.client

export default class UserRepository {
  async index(
    pagination: { page?: number; limit?: number },
    filters: { fullName?: string }
  ): Promise<User[]> {
    const page = pagination.page || 1
    const limit = pagination.limit || 10

    return prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        fullName: {
          contains: filters.fullName || '',
        },
      },
      orderBy: {
        fullName: 'asc',
      },
    })
  }

  async show(id: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { id } })
  }

  async store(data: User): Promise<User> {
    return prisma.user.create({ data })
  }

  async update(id: string, data: User): Promise<User> {
    return prisma.user.update({ data, where: { id } })
  }

  async destroy(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } })
  }

  async showByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { email } })
  }
}
