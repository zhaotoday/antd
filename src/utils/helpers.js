/**
 * 路由跳转
 * @param path {string} 跳转地址
 */
const go = function (path) {
  this.context.router.push(path)
}

export default {
  go
}
