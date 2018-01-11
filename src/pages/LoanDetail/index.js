import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchLoans } from '../LoansList/LoansActions'
import isEmpty from 'lodash/isEmpty'

class LoanDetail extends React.Component {
  constructor(props) {
    super(props)
    this.id_loan = this.props.match.params.id_loan
    this.loanInfo = {}
  }

  componentDidMount() {
    this.props.fetchLoans()
    console.log('loan storage z did mountu', this.props.loans)
  }

  getAcutalLoan() {
    console.log('IIIIDDD', this.props.match.params.id_loan)
    this.props.loans.map(item => {
      if (item.id == this.id_loan) {
        this.loanInfo = item
        console.log('matched item', item)
      }
    })
  }
  render() {
    const { id_loan } = this.props.match.params

    console.log('loan storage z renderu', this.props.loans)
    console.log('props', this.props.match.params)
    if (isEmpty(this.props.loans)) {
      return <div>loading</div>
    } else {
      this.getAcutalLoan()
      return <div>loan detail {JSON.stringify(this.loanInfo, null, 2)}</div>
    }
  }
}
LoanDetail.propTypes = {
  loans: PropTypes.array.isRequired,
  fetchLoans: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    loans: state.listOfLoans.loans,
  }
}
export default connect(mapStateToProps, { fetchLoans })(LoanDetail)
