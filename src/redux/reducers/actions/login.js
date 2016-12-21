import actionTypes from '../../consts/actions/login'
import typeToReducer from 'type-to-reducer'

export default typeToReducer({
  [`${actionTypes.POST_LOGIN}`]: {
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
