export interface Service {
  url: string
  port: number
}

export type Env = 'development' | 'test' | 'production'

export const urls: Record<Env, Record<string, Service>> = {
  development: {
    auth: {
      url: 'http://localhost',
      port: 3101,
    },
    user: {
      url: 'http://localhost',
      port: 3102,
    },
    product: {
      url: 'http://localhost',
      port: 3103,
    },
    sale: {
      url: 'http://localhost',
      port: 3104,
    },
  },
  test: {
    auth: {
      url: 'http://localhost',
      port: 3101,
    },
    user: {
      url: 'http://localhost',
      port: 3102,
    },
    product: {
      url: 'http://localhost',
      port: 3103,
    },
    sale: {
      url: 'http://localhost',
      port: 3104,
    },
  },
  production: {
    auth: {
      url: 'http://localhost',
      port: 3101,
    },
    user: {
      url: 'http://localhost',
      port: 3102,
    },
    product: {
      url: 'http://localhost',
      port: 3103,
    },
    sale: {
      url: 'http://localhost',
      port: 3104,
    },
  },
}
