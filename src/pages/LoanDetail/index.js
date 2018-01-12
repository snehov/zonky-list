import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchLoans } from '../LoansList/LoansActions'
import isEmpty from 'lodash/isEmpty'
import { twoDigits, formatNumber } from 'utils/functions'
import { Container } from 'components/Layout'
import { ButtonA, LinkAsButton, Title } from 'components/Elements'
import { DetailCard, Story } from './style'

class LoanDetail extends React.Component {
  constructor(props) {
    super(props)
    this.id_loan = this.props.match.params.id_loan
    this.loanInfo = {}
  }

  componentDidMount() {
    this.props.fetchLoans().then(
      res => {
        console.log('feč', res)
        this.getAcutalLoan()
        this.forceUpdate()
      },
      err => {
        console.log('feč error', err)
      },
    )
    setInterval(this.props.fetchLoans, 1000 * 60 * 5)
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
    const loan = this.loanInfo

    console.log('loan storage z renderu', this.props.loans)
    console.log('props', this.props.match.params)
    if (isEmpty(loan)) {
      return <div>loading</div>
    } else {
      const finishDate = new Date(loan.deadline)
      const deadlineDateFormated =
        finishDate.getDate() +
        '.' +
        (finishDate.getMonth() + 1) +
        '.' +
        finishDate.getFullYear() +
        '  ' +
        finishDate.getHours() +
        ':' +
        twoDigits(finishDate.getMinutes())
      return (
        <Container>
          <DetailCard>
            <Title>{loan.name}</Title>

            <p>
              <img
                src={`https://api.zonky.cz${loan.photos[0].url}`}
                alt="fotka proj"
                style={{ width: 300 + 'px' }}
              />
            </p>
            <div>
              <span>Uživatel:</span>
              <span> {loan.nickName}</span>
            </div>
            <Story>{loan.story}</Story>
            <div>
              <span>Investováno: </span>
              <span>
                {formatNumber(loan.amount - loan.remainingInvestment, ' Kč')} z{' '}
                {formatNumber(loan.amount, ' Kč')}
              </span>
            </div>
            <div>
              <span>Investovalo lidí:</span>
              <span> {formatNumber(loan.investmentsCount)}</span>
            </div>
            <div>
              <span>Úroková sazba:</span>
              <span> {(loan.interestRate * 100).toFixed(2)} %</span>
            </div>
            <div>
              <span>Doba splatnosti:</span>
              <span> {loan.termInMonths}</span>
            </div>
            <div>
              <span>Rating:</span>
              <span> {loan.rating}</span>
            </div>
            <div>
              <span>Deadline:</span>
              <span> {deadlineDateFormated}</span>
            </div>
            <div>
              <ButtonA href={loan.url} target="_blank" rel="noopener noreferrer">
                Otevřít na webu
              </ButtonA>
            </div>
          </DetailCard>
          <LinkAsButton to="/">Zpět</LinkAsButton>
        </Container>
      )
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
