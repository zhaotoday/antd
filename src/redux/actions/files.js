import actionTypes from '../consts/files'
import Model from '../models/files'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取文件详情
 */
export const getFile = createAction(
  actionTypes.GET_FILE,
  (options = {}) => {
    return new Model()
      .addPath('{file_id}')
      .replace({
        'file_id': options['file_id']
      })
      .GET()
  }
)

/**
 * 获取文件列表
 */
export const getFiles = createAction(
  actionTypes.GET_FILES,
  (options = {}) => {
    return new Model().GET({
      params: options.params
    })
  }
)
