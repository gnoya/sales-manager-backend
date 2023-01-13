import { Sale } from '@prisma/client'
import { APISale } from '../../contracts/sale.contract'

export function transformSale(data: Sale): APISale {
  const { createdAt, updatedAt, price, profit, ...transformedSale } = data

  return { discriminator: 'Sale', ...transformedSale }
}

export function transformSaleArray(data: Sale[]) {
  return data.map((sale: Sale) => transformSale(sale))
}
