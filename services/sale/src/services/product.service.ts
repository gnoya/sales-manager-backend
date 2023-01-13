import axios from 'axios'
import {
  APIProduct,
  ContractProductService,
  url,
} from '../../contracts/product.contract'

export default class ProductService implements ContractProductService {
  async show(id: string) {
    const response = await axios.get(`${url}/products/${id}`)

    return response.data as APIProduct
  }
}
