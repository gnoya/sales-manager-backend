import axios from 'axios'

export class ProductService {
  async show(id: string) {
    const { data, status } = await axios.get(
      `http://localhost:3002/products/${id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    return data
  }
}
