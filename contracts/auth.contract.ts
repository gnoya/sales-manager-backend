export interface AuthJWTPayload {
  userId: string
}

export interface ContractAuthService {
  checkToken?: (token: string) => void
}
