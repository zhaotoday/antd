import actionTypes from '../consts/settings'
import Model from '../models/settings'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取设置
 */
export const getSetting = createAction(
  actionTypes.GET_SETTING,
  (options = {}) => {
    return new Model()
      .addPath('{setting_id}')
      .replace({
        'setting_id': options['setting_id']
      })
      .GET()
  }
)

/**
 * 编辑设置
 */
export const putSetting = createAction(
  actionTypes.PUT_SETTING,
  (options = {}) => {
    return new Model()
      .addPath('{setting_id}')
      .replace({
        'setting_id': options['setting_id']
      })
      .PUT({
        data: options.data
      })
  }
)
