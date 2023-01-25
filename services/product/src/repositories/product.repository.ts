import { Product } from '@prisma/client'

import ApplicationPrisma from '../database/application.prisma'

const prisma = ApplicationPrisma.client

export default class ProductRepository {
  async index(
    pagination: { page?: number; limit?: number },
    filters: { name?: string }
  ): Promise<Product[]> {
    const page = pagination.page || 1
    const limit = pagination.limit || 10

    return prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        name: {
          contains: filters.name || '',
        },
      },
      orderBy: {
        quantity: 'asc',
      },
    })
  }

  async batch(ids: string[]): Promise<Product[]> {
    return prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }

  async countAll(filters: { name?: string }): Promise<number> {
    return prisma.product.count({
      where: {
        name: {
          contains: filters.name || '',
        },
      },
    })
  }

  async show(id: string): Promise<Product | null> {
    return prisma.product.findFirst({ where: { id } })
  }

  async store(data: Product): Promise<Product> {
    return prisma.product.create({ data })
  }

  async update(id: string, data: Product): Promise<Product> {
    return prisma.product.update({ data, where: { id } })
  }

  async destroy(id: string): Promise<Product> {
    return prisma.product.delete({ where: { id } })
  }
}
