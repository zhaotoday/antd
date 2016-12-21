import actionTypes from '../../consts/actions/login'
import Model from '../../models/actions/login'
import createAction from 'redux-actions/lib/createAction'

/**
 * 登陆
 */
export const postLogin = createAction(
  actionTypes.POST_LOGIN,
  (options = {}) => {
    return new Model()
      .POST({
        data: options.data
      })
  }
)
