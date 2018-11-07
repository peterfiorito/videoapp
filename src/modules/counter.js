export const HAS_ERROR = 'counter/HAS_ERROR'
export const HAS_ERROR_SET = 'counter/HAS_ERROR_SET'

const initialState = {
  hasError: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HAS_ERROR:
      return {
        ...state,
        hasError: true
      }
    default:
      return state
  }
}

export const hasError = () => {
  return dispatch => {
    dispatch({
      type: HAS_ERROR_SET
    })

    dispatch({
      type: HAS_ERROR
    })
  }
}