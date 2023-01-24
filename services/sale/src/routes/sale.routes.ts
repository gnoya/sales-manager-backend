import { Router } from 'express'
import SaleController from '../controllers/sale.controller'

const saleController = new SaleController()
const saleRoutes = Router()

saleRoutes.get('/:id', saleController.show)
saleRoutes.get('/', saleController.index)
saleRoutes.post('/', saleController.create)
saleRoutes.delete('/:id', saleController.destroy)

export default saleRoutes
