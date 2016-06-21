import actionTypes from '../consts/article'
import Model from '../models/article'
import { createAction } from 'redux-actions'

export const postArticle = createAction(
  actionTypes.POST_ARTICLE,
  (options) => {
    return new Model().POST({
      data: options.data
    })
  }
)
