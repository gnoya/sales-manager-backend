import { PrismaClient } from '@prisma/client'

import products from './seeds/products'

const prisma = new PrismaClient()

async function seed() {
  console.info('> Running seeds ')

  await products(prisma)

  console.info('\n✔ All seeds succesfully executed\n')
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
