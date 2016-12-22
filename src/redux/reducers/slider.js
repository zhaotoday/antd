import actionTypes from '../consts/sliders'
import typeToReducer from 'type-to-reducer'

export default typeToReducer({
  [`${actionTypes.GET_SLIDER}`]: {
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
