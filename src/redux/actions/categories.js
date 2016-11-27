import actionTypes from '../consts/categories'
import Model from '../models/categories'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取栏目列表
 */
export const getCategories = createAction(
  actionTypes.GET_CATEGORIES,
  (options) => {
    return new Model().GET()
  }
)
