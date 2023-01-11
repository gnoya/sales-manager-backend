import axios from 'axios'

export class ProductService {
  async show(id: string) {
    const { data, status } = await axios.get(
      `http://localhost:3002/users/${id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    return data
  }
}
