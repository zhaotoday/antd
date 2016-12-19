import moment from 'moment'
import consts from './consts'
import FileModel from 'redux/models/files'

/**
 * 路由跳转
 * @param path {string} 跳转地址
 */
export const go = function (path) {
  this.context.router.push(path)
}

/**
 * 获取文件
 * @param id {string} 文件 ID
 * @returns {promise}
 */
export const getFile = (id) => {
  return new Promise((resolve, reject) => {
    new FileModel()
      .addPath('{file_id}')
      .replace({
        'file_id': id
      })
      .GET()
      .then((response) => {
        const {name, model, created_at, ext} = response.data.data
        const url = `${consts.BASE_URL}/files/${model}/${moment(parseFloat(created_at + '000')).format('YYYYMMDD/HHmmss')}${ext}`

        resolve({name, url})
      }).catch(reject)
  })
}

/**
 * 获取分类详情
 * @param id {string} 分类 ID
 * @returns {object}
 */
export const getCategoryById = (array, id) => {
  for (let value of array) {
    if (value.id === id) return value
  }

  return {}
}
/**
 * 获取时间
 * @param time {string} 待转化时间
 * @returns {string}
 */
export const getTime = (time) => {
  return moment(parseFloat(time + '000')).format('YYYY-MM-DD HH:mm:ss')
}
