import { Prisma, PrismaClient } from '@prisma/client'

export default async function seed(prisma: PrismaClient) {
  console.info('-> Seeding products ...')

  const products: Prisma.ProductCreateManyInput[] = [
    {
      id: 'facade01-0000-4000-a000-000000000000',
      name: 'iPhone14',
      quantity: 5,
    },
    {
      id: 'facade02-0000-4000-a000-000000000000',
      name: 'iPhoneX',
      quantity: 2,
    },
    {
      id: 'facade03-0000-4000-a000-000000000000',
      name: 'Samsung XP',
      quantity: 9,
    },
  ]

  return prisma.product.createMany({
    data: products,
  })
}
