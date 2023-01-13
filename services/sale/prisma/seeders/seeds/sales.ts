import { Prisma, PrismaClient } from '@prisma/client'

export default async function seed(prisma: PrismaClient) {
  console.info('-> Seeding sales ...')

  const sales: Prisma.SaleCreateManyInput[] = [
    {
      id: 'facade01-0000-4000-a000-000000000000',
      productId: 'facade01-0000-4000-a000-000000000000',
      userId: 'facade01-0000-4000-a000-000000000000',
      quantity: 1,
      deliveryDate: '2023-01-01 18:00:00',
      price: 50,
      profit: 30,
    },
    {
      id: 'facade02-0000-4000-a000-000000000000',
      productId: 'facade01-0000-4000-a000-000000000000',
      userId: 'facade02-0000-4000-a000-000000000000',
      quantity: 1,
      deliveryDate: '2023-01-01 19:00:00',
      price: 50,
      profit: 30,
    },
    {
      id: 'facade03-0000-4000-a000-000000000000',
      productId: 'facade02-0000-4000-a000-000000000000',
      userId: 'facade02-0000-4000-a000-000000000000',
      quantity: 1,
      deliveryDate: '2023-01-01 20:00:00',
      price: 20,
      profit: 10,
    },
  ]

  return prisma.sale.createMany({
    data: sales,
  })
}
