import moment from 'moment'
import consts from './consts'
import FileModel from 'redux/models/files'

/**
 * 路由跳转
 * @param path {string} 跳转地址
 */
const go = function (path) {
  this.context.router.push(path)
}

/**
 * 加载文件
 * @param fileId {string} 文件 ID
 * @returns {promise}
 */
const getFileURL = (fileId) => {
  return new Promise((resolve, reject) => {
    new FileModel()
      .addPaths(['{file_id}'])
      .replace({
        file_id: fileId
      })
      .GET()
      .then((response) => {
        const {model, created_at, ext, name} = response.data.data
        const url = `${consts.BASE_URL}/files/${model}/${moment(parseFloat(created_at + '000')).format('YYYYMMDD/HHmmss')}${ext}`

        resolve(url)
      }).catch(reject)
  })
}

export default {
  go,
  getFileURL
}
