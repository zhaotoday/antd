import actionTypes from '../consts/articles'
import Model from '../models/articles'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取文章列表
 */
export const getArticles = createAction(
  actionTypes.GET_ARTICLES,
  (options) => {
    return new Model().GET({
      params: options.params
    })
  }
)

/**
 * 新增文章
 */
export const postArticle = createAction(
  actionTypes.POST_ARTICLE,
  (options) => {
    return new Model()
      .addPaths(['{category}', 'news'])
      .replace({
        category: 123
      })
      .POST({
        data: options.data
      })
  }
)
