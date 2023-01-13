import axios from 'axios'
import {
  APIUser,
  ContractUserService,
  url,
} from '../../contracts/user.contract'

export default class UserService implements ContractUserService {
  async show(id: string) {
    const response = await axios.get(`${url}/users/${id}`)

    return response.data as APIUser
  }
}
