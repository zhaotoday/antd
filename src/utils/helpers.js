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
 * 加载文件
 * @param fileId {string} 文件 ID
 * @returns {promise}
 */
export const getFileURL = (fileId) => {
  return new Promise((resolve, reject) => {
    new FileModel()
      .addPaths(['{file_id}'])
      .replace({
        file_id: fileId
      })
      .GET()
      .then((response) => {
        const {model, created_at, ext} = response.data.data
        const url = `${consts.BASE_URL}/files/${model}/${moment(parseFloat(created_at + '000')).format('YYYYMMDD/HHmmss')}${ext}`

        resolve(url)
      }).catch(reject)
  })
}

/**
 * 获取栏目详情
 * @param id {string} 栏目 ID
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
