import { Sale } from '@prisma/client'

import ApplicationPrisma from '../database/application.prisma'

const prisma = ApplicationPrisma.client

export default class SaleRepository {
  async index(): Promise<Sale[]> {
    return prisma.sale.findMany()
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
