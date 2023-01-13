import { Product } from '@prisma/client'
import { APIProduct } from '../../contracts/product.contract'

export function transformProduct(data: Product): APIProduct {
  const { createdAt, updatedAt, ...transformedProduct } = data

  return { discriminator: 'Product', ...transformedProduct }
}

export function transformProductArray(data: Product[]) {
  return data.map((product: Product) => transformProduct(product))
}
