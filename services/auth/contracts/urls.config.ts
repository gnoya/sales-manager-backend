export interface Service {
  url: string
}
export type Env = 'development' | 'test' | 'production'

export const urls: Record<Env, Record<string, Service>> = {
  development: {
    auth: {
      url: 'http://localhost:3101',
    },
    user: {
      url: 'http://localhost:3102',
    },
    product: {
      url: 'http://localhost:3103',
    },
    sale: {
      url: 'http://localhost:3104',
    },
  },
  test: {
    auth: {
      url: 'http://localhost:3101',
    },
    user: {
      url: 'http://localhost:3102',
    },
    product: {
      url: 'http://localhost:3103',
    },
    sale: {
      url: 'http://localhost:3104',
    },
  },
  production: {
    auth: {
      url: 'http://localhost:3101',
    },
    user: {
      url: 'http://localhost:3102',
    },
    product: {
      url: 'http://localhost:3103',
    },
    sale: {
      url: 'http://localhost:3104',
    },
  },
}
