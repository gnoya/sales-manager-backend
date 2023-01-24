import { Router } from 'express'
import GatewayController from '../controllers/gateway.controller'
import JWTMiddleware from '../middleware/jwt.middleware'

const gatewayController = new GatewayController()
const gateway = Router()

gateway.post('/auth/login', gatewayController.gateway)

gateway.get('/users', JWTMiddleware, gatewayController.gateway)
gateway.post('/users', JWTMiddleware, gatewayController.gateway)
gateway.delete('/users/:id', JWTMiddleware, gatewayController.gateway)

gateway.get('/sales/:id', JWTMiddleware, gatewayController.gateway)
gateway.get('/sales', JWTMiddleware, gatewayController.gateway)
gateway.post('/sales', JWTMiddleware, gatewayController.gateway)
gateway.delete('/sales/:id', JWTMiddleware, gatewayController.gateway)

gateway.get('/products/:id', JWTMiddleware, gatewayController.gateway)
gateway.get('/products', JWTMiddleware, gatewayController.gateway)
gateway.post('/products', JWTMiddleware, gatewayController.gateway)
gateway.put('/products/:id', JWTMiddleware, gatewayController.gateway)
gateway.delete('/products/:id', JWTMiddleware, gatewayController.gateway)

export default gateway
