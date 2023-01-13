export interface APIProduct {
  discriminator: 'Product'
  id: string
  name: string
  quantity: number
  price: number
  profit: number
}

interface ProductCreateParams
  extends Omit<APIProduct, 'discriminator' | 'id' | ''> {}

export const url = 'http://localhost:3002'

export interface ContractProductService {
  show?: (id: string) => Promise<APIProduct>
  create?: (params: ProductCreateParams) => Promise<APIProduct>
  subtract?: (id: string) => void
}

export class MockProductService implements ContractProductService {
  private static single?: MockProductService

  static get instance() {
    if (!MockProductService.single)
      MockProductService.single = new MockProductService()

    return MockProductService.single
  }

  async show(id: string) {
    return {
      discriminator: 'Product' as const,
      id: 'facade01-0000-4000-a000-000000000000',
      name: 'iPhone X',
      quantity: 2,
      price: 50,
      profit: 30,
    }
  }
}
