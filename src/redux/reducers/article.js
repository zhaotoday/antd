import actionTypes from '../consts/articles'
import typeToReducer from 'type-to-reducer'

export default typeToReducer({
  [`${actionTypes.GET_ARTICLE}`]: {
    LOADING: () => ({
      isPending: true
    }),
    ERROR: (state, action) => ({
      isRejected: true,
      error: action.payload
    }),
    SUCCESS: (state, action) => ({
      isFulfilled: true,
      data: action.payload.data
    })
  }
}, {})
