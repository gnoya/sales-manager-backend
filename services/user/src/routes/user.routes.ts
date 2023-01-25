import { Router } from 'express'
import UserController from '../controllers/user.controller'

const userController = new UserController()
const userRoutes = Router()

userRoutes.get('/batch', userController.batch)
userRoutes.get('/:id', userController.show)
userRoutes.get('/', userController.index)
userRoutes.post('/', userController.create)
userRoutes.delete('/:id', userController.destroy)
userRoutes.get('/email/:email', userController.showByEmail)

export default userRoutes
