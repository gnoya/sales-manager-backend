import { Router } from 'express'
import UserController from '../controllers/user.controller'

const userController = new UserController()
const userRoutes = Router()

userRoutes.get('/:id', userController.show)
userRoutes.get('/', userController.index)
userRoutes.post('/', userController.create)
userRoutes.get('/email/:email', userController.showByEmail)

export default userRoutes
