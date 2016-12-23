import storage from './storage'

const TOKEN = 'TOKEN'
const USER = 'USER'

let token = null
let user = null

export default {
  /**
   * 是否登录
   */
  isLogin() {
    return !!this.getToken()
  },

  /**
   * 设置 token
   * @param value {string} 值
   */
  setToken(value) {
    token = value
    storage.set(TOKEN, token)
  },

  /**
   * 获取 token
   */
  getToken() {
    return token || storage.get(TOKEN)
  },

  /**
   * 设置用户
   * @param value {string} 值
   */
  setUser(value) {
    user = value
    storage.set(USER, user)
  },

  /**
   * 获取用户
   */
  getUser() {
    return user || storage.get(USER)
  },

  /**
   * 销毁 token 和 user
   */
  destroy() {
    token = user = null
    storage.remove(TOKEN)
    storage.remove(USER)
  },

  /**
   * 获取授权信息
   */
  getAuth() {
    return {
      auth: this.getToken(),
      username: this.getUser().username
    }
  }
}
