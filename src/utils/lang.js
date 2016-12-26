import storage from './storage'

const LANG = 'LANG'

export default {
  /**
   * 初始化
   */
  init() {
    if (!this.get()) this.set('cn')
  },

  /**
   * 设置语言
   * @param value {string} 值
   */
  set(value) {
    storage.set(LANG, value)
  },

  /**
   * 获取语言
   */
  get() {
    return storage.get(LANG)
  }
}
