import { Sale } from '@prisma/client'

import ApplicationPrisma from '../database/application.prisma'

const prisma = ApplicationPrisma.client

export default class SaleRepository {
  async index(
    pagination: { page?: number; limit?: number },
    filters: {}
  ): Promise<Sale[]> {
    const page = pagination.page || 1
    const limit = pagination.limit || 10

    return prisma.sale.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async show(id: string): Promise<Sale | null> {
    return prisma.sale.findFirst({ where: { id } })
  }

  async store(data: Sale): Promise<Sale> {
    return prisma.sale.create({ data })
  }

  async update(id: string, data: Sale): Promise<Sale> {
    return prisma.sale.update({ data, where: { id } })
  }

  async destroy(id: string): Promise<Sale> {
    return prisma.sale.delete({ where: { id } })
  }
}
