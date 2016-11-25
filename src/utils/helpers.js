import moment from 'moment'
import consts from './consts'

/**
 * 路由跳转
 * @param path {string} 跳转地址
 */
const go = function (path) {
  this.context.router.push(path)
}

/**
 * 获取文件地址
 * @param model {string} 模型
 * @param createdAt {string} 创建时间
 * @param ext {string} 后缀
 * @returns {string}
 */
const getFileSrc = (model, createdAt, ext) => {
  return `${consts.BASE_URL}/files/${model}/${moment(parseFloat(createdAt + '000')).format('YYYYMMDD/HHmmss')}${ext}`
}

export default {
  go,
  getFileSrc
}
