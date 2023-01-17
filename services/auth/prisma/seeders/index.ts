import { PrismaClient } from '@prisma/client'

import auth from './seeds/auth'

const prisma = new PrismaClient()

async function seed() {
  console.info('> Running seeds ')

  await auth(prisma)

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
