export interface APIProduct {
  discriminator: 'Product'
  id: string
  name: string
  quantity: number
}

interface ProductCreateParams
  extends Omit<APIProduct, 'discriminator' | 'id' | ''> {}

export interface ContractProductService {
  show?: (id: string) => Promise<APIProduct>
  create?: (params: ProductCreateParams) => Promise<APIProduct>
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
    }
  }
}
