import actionTypes from '../consts/categories'
import Model from '../models/categories'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取栏目列表
 */
export const getCategory = createAction(
  actionTypes.GET_CATEGORY,
  (options) => {
    return new Model()
      .addPaths(['{category_id}'])
      .replace({
        category_id: options.category_id
      })
      .GET()
  }
)

/**
 * 获取栏目列表
 */
export const getCategories = createAction(
  actionTypes.GET_CATEGORIES,
  (options) => {
    return new Model().GET({
      params: options.params
    })
  }
)

/**
 * 新增栏目
 */
export const postCategory = createAction(
  actionTypes.POST_CATEGORY,
  (options) => {
    return new Model()
      .POST({
        data: options.data
      })
  }
)

/**
 * 编辑栏目
 */
export const patchCategory = createAction(
  actionTypes.PATCH_CATEGORY,
  (options) => {
    return new Model()
      .addPaths(['{category_id}'])
      .replace({
        'category_id': options.category_id
      })
      .PATCH({
        data: options.data
      })
  }
)

/**
 * 删除栏目
 */
export const deleteCategory = createAction(
  actionTypes.DELETE_CATEGORY,
  (options) => {
    return new Model()
      .DELETE({
        params: options.params
      })
  }
)
