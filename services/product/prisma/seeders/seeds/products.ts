import { Prisma, PrismaClient } from '@prisma/client'

export default async function seed(prisma: PrismaClient) {
  console.info('-> Seeding products ...')

  const products: Prisma.ProductCreateManyInput[] = [
    {
      id: 'facade01-0000-4000-a000-000000000000',
      name: 'iPhone X',
      quantity: 2,
      price: 50,
      profit: 30,
    },
    {
      id: 'facade02-0000-4000-a000-000000000000',
      name: 'iPhone 14',
      quantity: 3,
      price: 20,
      profit: 10,
    },
    {
      id: 'facade03-0000-4000-a000-000000000000',
      name: 'Google Pixel 6',
      quantity: 1,
      price: 50,
      profit: 30,
    },
  ]

  return prisma.product.createMany({
    data: products,
  })
}
