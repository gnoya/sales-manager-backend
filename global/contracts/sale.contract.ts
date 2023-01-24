export interface APISale {
  discriminator: 'Sale'
  id: string
  productId: string
  userId: string
  quantity: number
  deliveryDate: string
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
      productId: 'facade01-0000-4000-a000-000000000000',
      userId: 'facade01-0000-4000-a000-000000000000',
      quantity: 1,
      deliveryDate: '2023-01-01 18:00:00',
    }
  }
}
