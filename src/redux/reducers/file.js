import actionTypes from '../consts/files'
import typeToReducer from 'type-to-reducer'

export default typeToReducer({
  [`${actionTypes.GET_FILE}`]: {
    LOADING: () => ({}),
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
