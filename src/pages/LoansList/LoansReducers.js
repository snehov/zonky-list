import { REQUEST_LOANS, RECEIVE_LOANS } from 'utils/types'

const initialState = {
  isFetching: false,
  didInvalidate: false,
  loans: [],
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_LOANS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      })
    case RECEIVE_LOANS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        loans: action.loans,
        lastUpdated: action.receivedAt,
      })

    default:
      return state
  }
}
