import actionTypes from '../consts/sliders'
import Model from '../models/sliders'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取滚动广告详情
 */
export const getSlider = createAction(
  actionTypes.GET_SLIDER,
  (options = {}) => {
    return new Model()
      .addPath('{slider_id}')
      .replace({
        'slider_id': options['slider_id']
      })
      .GET()
  }
)

/**
 * 获取滚动广告列表
 */
export const getSliders = createAction(
  actionTypes.GET_SLIDERS,
  (options = {}) => {
    return new Model().GET({
      params: options.params
    })
  }
)

/**
 * 新增滚动广告
 */
export const postSlider = createAction(
  actionTypes.POST_SLIDER,
  (options = {}) => {
    return new Model()
      .POST({
        data: options.data
      })
  }
)

/**
 * 编辑滚动广告
 */
export const patchSlider = createAction(
  actionTypes.PATCH_SLIDER,
  (options = {}) => {
    return new Model()
      .addPath('{slider_id}')
      .replace({
        'slider_id': options['slider_id']
      })
      .PUT({
        data: options.data
      })
  }
)

/**
 * 删除滚动广告
 */
export const deleteSlider = createAction(
  actionTypes.DELETE_SLIDER,
  (options = {}) => {
    return new Model()
      .DELETE({
        params: options.params
      })
  }
)
