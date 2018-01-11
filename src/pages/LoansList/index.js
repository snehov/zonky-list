import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import { fetchLoans } from './LoansActions'

class LoansList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.fetchLoans()
  }
  render() {
    return <div>loans list</div>
  }
}
LoansList.propTypes = {
  loans: PropTypes.array.isRequired,
  fetchLoans: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    loans: state.listOfLoans.loans,
  }
}
export default connect(mapStateToProps, { fetchLoans })(LoansList)
