import { APIUser } from '../../contracts/user.contract'
import jwt from 'jsonwebtoken'
import { generateRandomKey } from '../utils/generator'
import ApplicationPrisma from '../database/application.prisma'
import { AuthJWTPayload } from '../../contracts/auth.contract'

const prisma = ApplicationPrisma.client

export default class AuthRepository {
  async showByUserId(userId: string) {
    return await prisma.jWT.findFirst({ where: { userId } })
  }

  async verifyToken(token: string, secret: string): Promise<boolean> {
    try {
      jwt.verify(token, secret)
      return true
    } catch (err) {
      return false
    }
  }

  async decodeToken(token: string): Promise<AuthJWTPayload | null> {
    const decoded = jwt.decode(token)
    if (!decoded) return null

    return decoded as AuthJWTPayload
  }

  async removeAllTokens(userId: string) {
    await prisma.jWT.deleteMany({ where: { userId } })
  }

  async generateToken(user: APIUser) {
    const JWTpayload: AuthJWTPayload = {
      userId: user.id,
    }

    const secret = generateRandomKey(255)
    const token = jwt.sign(JWTpayload, secret, {
      expiresIn: '7d',
    })

    await prisma.jWT.create({ data: { userId: user.id, secret } })
    return token
  }
}
