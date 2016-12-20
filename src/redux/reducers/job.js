import actionTypes from '../consts/jobs'
import typeToReducer from 'type-to-reducer'

export default typeToReducer({
  [`${actionTypes.GET_JOB}`]: {
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
