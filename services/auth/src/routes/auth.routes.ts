import { Router } from 'express'
import AuthController from '../controllers/auth.controller'

const authController = new AuthController()
const authRoutes = Router()

authRoutes.post('/login', authController.login)
authRoutes.get('/token/:token', authController.checkToken)

export default authRoutes
