import { Product } from '@prisma/client'

export interface TransformedProduct
  extends Omit<Product, 'createdAt' | 'updatedAt'> {}

export function transformProduct(data: Product): TransformedProduct {
  const { createdAt, updatedAt, ...transformedProduct } = data

  return transformedProduct
}

export function transformProductArray(data: Product[]): TransformedProduct[] {
  return data.map((product: Product) => transformProduct(product))
}
