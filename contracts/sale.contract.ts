export interface APISale {
  discriminator: 'Sale'
  id: string
  name: string
  quantity: number
}

interface SaleCreateParams extends Omit<APISale, 'discriminator' | 'id' | ''> {}

export interface ContractSaleService {
  show?: (id: string) => Promise<APISale>
  create?: (params: SaleCreateParams) => Promise<APISale>
}

export class MockSaleService implements ContractSaleService {
  private static single?: MockSaleService

  static get instance() {
    if (!MockSaleService.single) MockSaleService.single = new MockSaleService()

    return MockSaleService.single
  }

  async show(id: string) {
    return {
      discriminator: 'Sale' as const,
      id: 'facade01-0000-4000-a000-000000000000',
      name: 'iPhone X',
      quantity: 2,
    }
  }
}
