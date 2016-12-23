export default {
  /**
   * 判断是否为空
   * @param val {string} 字符串
   */
  isEmpty(val) {
    return val === null || val === undefined || val.trim() === ''
  },

  /**
   * 路由跳转
   * @param path {string} 跳转地址
   */
  go: function (path) {
    this.context.router.push(path)
  }
}
