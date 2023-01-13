export interface APIUser {
  discriminator: 'User'
  id: string
  email: string | null
  fullName: string
  identification: string
  address: string
  phone: string | null
}

interface UserCreateParams extends Omit<APIUser, 'discriminator' | 'id'> {}

export interface ContractUserService {
  show?: (id: string) => Promise<APIUser>
  create?: (params: UserCreateParams) => Promise<APIUser>
}

export class MockUserService implements ContractUserService {
  private static single?: MockUserService

  static get instance() {
    if (!MockUserService.single) MockUserService.single = new MockUserService()

    return MockUserService.single
  }

  async show(id: string) {
    return {
      discriminator: 'User' as const,
      id: 'facade01-0000-4000-a000-000000000000',
      email: 'admin1@admin.com',
      fullName: 'Administrator 1',
      identification: 'V123456951',
      address: 'Caracas',
      phone: '+58 4240000000',
    }
  }
}
