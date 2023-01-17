import { Prisma, PrismaClient } from '@prisma/client'

export default async function seed(prisma: PrismaClient) {
  console.info('-> Seeding jtw ...')

  const jwt: Prisma.JWTCreateManyInput[] = []

  return prisma.jWT.createMany({
    data: jwt,
  })
}
