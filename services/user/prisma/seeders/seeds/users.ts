import { Prisma, PrismaClient } from '@prisma/client'

export default async function seed(prisma: PrismaClient) {
  console.info('-> Seeding users ...')

  const users: Prisma.UserCreateManyInput[] = [
    {
      id: 'facade01-0000-4000-a000-000000000000',
      email: 'admin1@admin.com',
      password: '$2a$12$LQ3YO.AXF5XJmRVDhwvfJu5RCCZxzqQxCmXrPv9huMN.6QnKc9Lhu',
      fullName: 'Administrator 1',
      identification: 'V123456951',
      address: 'Caracas',
      phone: '+58 4240000000',
    },
    {
      id: 'facade02-0000-4000-a000-000000000000',
      email: 'admin2@admin.com',
      password: '$2a$12$LQ3YO.AXF5XJmRVDhwvfJu5RCCZxzqQxCmXrPv9huMN.6QnKc9Lhu',
      fullName: 'Administrator 2',
      identification: 'V651651232',
      address: 'Caracas',
      phone: '+58 4240000001',
    },
    {
      id: 'facade03-0000-4000-a000-000000000000',
      fullName: 'Client 1',
      identification: 'V0000111000',
      address: 'Caracas, El Marques, Calle Demo 2, Residencias Aedsasd',
      phone: '+58 4240000002',
    },
    {
      id: 'facade04-0000-4000-a000-000000000000',
      fullName: 'Client 2',
      identification: 'V065332150',
      address: 'Caracas, El Llanito, Calle Demo 9, Residencias htgfrrth',
      phone: '+58 4240000003',
    },
  ]

  return prisma.user.createMany({
    data: users,
  })
}
