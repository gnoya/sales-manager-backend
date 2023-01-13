import { User } from '@prisma/client'

import ApplicationPrisma from '../database/application.prisma'

const prisma = ApplicationPrisma.client

export default class UserRepository {
  async index(): Promise<User[]> {
    return prisma.user.findMany()
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
}
