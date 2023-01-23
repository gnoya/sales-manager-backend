import { Router } from 'express'
import GatewayController from '../controllers/gateway.controller'
import JWTMiddleware from '../middleware/jwt.middleware'

const gatewayController = new GatewayController()
const gateway = Router()

gateway.get('/users', JWTMiddleware, gatewayController.gateway)

gateway.get('/sales/:id', JWTMiddleware, gatewayController.gateway)
gateway.get('/sales', JWTMiddleware, gatewayController.gateway)
gateway.post('/sales', JWTMiddleware, gatewayController.gateway)

gateway.get('/products/:id', JWTMiddleware, gatewayController.gateway)
gateway.get('/products', JWTMiddleware, gatewayController.gateway)
gateway.post('/products', JWTMiddleware, gatewayController.gateway)

export default gateway
