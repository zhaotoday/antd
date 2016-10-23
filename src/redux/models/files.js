import { REST, consts } from 'utils'

export default class extends REST {
  constructor() {
    super()
    this.baseURL = consts.API_URL
    this.path = '/files'
  }
}
