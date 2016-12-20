import actionTypes from '../consts/commodities'
import typeToReducer from 'type-to-reducer'

export default typeToReducer({
  [`${actionTypes.GET_COMMODITY}`]: {
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
