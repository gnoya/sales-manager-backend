import { Router } from 'express'
import ProductController from '../controllers/product.controller'

const productController = new ProductController()
const productRoutes = Router()

productRoutes.put('/:id/subtract', productController.subtract)
productRoutes.get('/:id', productController.show)
productRoutes.get('/', productController.index)
productRoutes.post('/', productController.create)

export default productRoutes
