import axios from 'axios'
import apiSettings from 'utils/apiSettings'
import { REQUEST_LOANS, RECEIVE_LOANS } from 'utils/types'

function requestLoans() {
  return {
    type: REQUEST_LOANS,
  }
}
function receiveLoans(loans) {
  return {
    type: RECEIVE_LOANS,
    loans,
    receivedAt: Date.now(),
  }
}
export function fetchLoans() {
  return dispatch => {
    return axios({
      method: apiSettings.getLoans.method,
      url: apiSettings.getLoans.url,
    }).then(res => {
      localStorage.setItem('loans', JSON.stringify(res.data))
      dispatch(receiveLoans(res.data))
      return res.data
    })
    // catch any error in the network call.
  }
}
