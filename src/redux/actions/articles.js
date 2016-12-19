import actionTypes from '../consts/articles'
import Model from '../models/articles'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取文章列表
 */
export const getArticle = createAction(
  actionTypes.GET_ARTICLE,
  (options = {}) => {
    return new Model()
      .addPath('{article_id}')
      .replace({
        'article_id': options['article_id']
      })
      .GET()
  }
)

/**
 * 获取文章列表
 */
export const getArticles = createAction(
  actionTypes.GET_ARTICLES,
  (options = {}) => {
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
  (options = {}) => {
    return new Model()
      .POST({
        data: options.data
      })
  }
)

/**
 * 编辑文章
 */
export const patchArticle = createAction(
  actionTypes.PATCH_ARTICLE,
  (options = {}) => {
    return new Model()
      .addPath('{article_id}')
      .replace({
        'article_id': options['article_id']
      })
      .PATCH({
        data: options.data
      })
  }
)

/**
 * 删除文章
 */
export const deleteArticle = createAction(
  actionTypes.DELETE_ARTICLE,
  (options = {}) => {
    return new Model()
      .DELETE({
        params: options.params
      })
  }
)
