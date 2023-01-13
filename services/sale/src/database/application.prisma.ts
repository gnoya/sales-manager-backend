import { PrismaClient } from '@prisma/client'

export default class ApplicationPrisma {
  private static prisma?: PrismaClient

  static get client() {
    if (!ApplicationPrisma.prisma) ApplicationPrisma.prisma = new PrismaClient()

    return ApplicationPrisma.prisma
  }

  static async disconnect() {
    await ApplicationPrisma.prisma?.$disconnect()
  }
}
