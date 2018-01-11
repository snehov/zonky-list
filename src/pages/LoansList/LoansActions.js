import axios from 'axios'
import apiSettings from 'utils/apiSettings'
import { REQUEST_LOANS, RECEIVE_LOANS } from 'utils/types'

function requestLoans() {
  return {
    type: REQUEST_LOANS,
  }
}

function receiveLoans(loans) {
  //console.log('actions/receiveLoans from ACTIONS', sales)
  return {
    type: RECEIVE_LOANS,
    loans,
    receivedAt: Date.now(),
  }
}
export function fetchLoans() {
  return dispatch => {
    axios({
      method: apiSettings.getLoans.method,
      url: apiSettings.getLoans.url,
      /* headers: apiSettings.getLoans.headers, */
    }).then(res => {
      localStorage.setItem('loans', JSON.stringify(res.data))
      dispatch(receiveLoans(res.data))
      //console.log('actions/fetchLoans res=>', res.data)
      //return res.data
    })
    // catch any error in the network call.
  }
}
