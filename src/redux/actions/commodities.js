import actionTypes from '../consts/commodities'
import Model from '../models/commodities'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取商品
 */
export const getCommodity = createAction(
  actionTypes.GET_COMMODITY,
  (options = {}) => {
    return new Model()
      .addPath('{commodity_id}')
      .replace({
        'commodity_id': options['commodity_id']
      })
      .GET()
  }
)

/**
 * 获取商品列表
 */
export const getCommodities = createAction(
  actionTypes.GET_COMMODITIES,
  (options = {}) => {
    return new Model().GET({
      params: options.params
    })
  }
)

/**
 * 新增商品
 */
export const postCommodity = createAction(
  actionTypes.POST_COMMODITY,
  (options = {}) => {
    return new Model()
      .POST({
        data: options.data
      })
  }
)

/**
 * 编辑商品
 */
export const patchCommodity = createAction(
  actionTypes.PATCH_COMMODITY,
  (options = {}) => {
    return new Model()
      .addPath('{commodity_id}')
      .replace({
        'commodity_id': options['commodity_id']
      })
      .PATCH({
        data: options.data
      })
  }
)

/**
 * 删除商品
 */
export const deleteCommodity = createAction(
  actionTypes.DELETE_COMMODITY,
  (options = {}) => {
    return new Model()
      .DELETE({
        params: options.params
      })
  }
)
