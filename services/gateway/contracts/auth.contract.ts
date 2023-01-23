export interface AuthJWTPayload {
  userId: string
}

export const url = 'http://localhost:3101'

export interface ContractAuthService {
  checkToken?: (token: string) => void
}
