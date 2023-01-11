import { Product } from '@prisma/client'

import ApplicationPrisma from '../database/application.prisma'

const prisma = ApplicationPrisma.client

export default class ProductRepository {
  async show(id: string): Promise<Product | null> {
    return prisma.product.findFirst({ where: { id } })
  }

  async index(): Promise<Product[]> {
    return prisma.product.findMany()
  }

  async create(data: Product): Promise<Product> {
    return prisma.product.create({ data })
  }

  async update(id: string, data: Product): Promise<Product> {
    return prisma.product.update({ data, where: { id } })
  }

  async delete(id: string): Promise<Product> {
    return prisma.product.delete({ where: { id } })
  }
}
