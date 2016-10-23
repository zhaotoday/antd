import actionTypes from '../consts/files'
import Model from '../models/files'
import createAction from 'redux-actions/lib/createAction'

export const postFile = createAction(
  actionTypes.POST_FILE,
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
