import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import { fetchLoans } from './LoansActions'
import ReactDataGrid from 'react-data-grid'
import { LinkAsButton, Title } from 'components/Elements'
import { ContainerFluid } from 'components/Layout'
import { formatNumber, shorten, replaceStrings, myDateFormat } from 'utils/functions'

class LoansList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rows: [], originalRows: [] }
    this._columns = [
      { key: 'image', name: 'Obrázek', width: 80 },
      { key: 'name', name: 'Projekt', width: 300, sortable: true },
      { key: 'story', name: 'Příběh' },
      { key: 'amount', name: 'Potřeba peněz', width: 150, sortable: true },
      { key: 'duration', name: 'Trvání (měsíce)', width: 150, sortable: true },
      { key: 'deadline', name: 'Deadline', width: 150, sortable: true },
      { key: 'rating', name: 'Rating', width: 65, sortable: true },

      { key: 'rating_num', name: '', width: 0.01, sortable: true },
      { key: 'amount_num', name: '', width: 0.01, sortable: true },
      { key: 'deadline_num', name: '', width: 0.01, sortable: true },
      { key: 'actions', name: '', width: 160 },
    ]
    this.tableRows = []
  }

  componentDidMount() {
    this.props.fetchLoans().then(
      res => {
        this.genRows()
        this.forceUpdate()
      },
      err => {
        console.log('fetch error', err)
      },
    )
    setInterval(this.props.fetchLoans, 1000 * 60 * 5)
  }

  genRows() {
    const { loans } = this.props
    let rows = []

    loans.map(loan => {
      let numberRating = loan.rating
      var find = ['AAAAA', 'AAAA', 'AAA', 'AA', 'A', 'B', 'C', 'D']
      var replace = [9, 8, 7, 6, 5, 4, 3, 2]
      numberRating = replaceStrings(loan.rating, find, replace) //numberRating.replaceArray(find, replace)

      rows.push({
        id: loan.id,
        image: (
          <img
            src={`https://api.zonky.cz${loan.photos[0].url} `}
            alt="fotka proj"
            style={{ width: 50 + 'px' }}
          />
        ),
        name: loan.name,
        story: shorten(loan.story, 200, 20),
        rating: loan.rating,
        rating_num: numberRating,
        duration: loan.termInMonths,
        deadline: myDateFormat(loan.deadline),
        deadline_num: Date.parse(loan.deadline) / 1000,
        amount: formatNumber(loan.amount, ' Kč'),
        amount_num: loan.amount,
        actions: <LinkAsButton to={`loan/${loan.id}`}>Ukaž</LinkAsButton>,
      })
    })
    this.setState({ originalRows: rows, rows: rows.slice(0) })
  }

  rowGetter = i => {
    return this.state.rows[i]
  }

  handleGridSort = (sortColumn, sortDirection) => {
    if (sortColumn === 'rating') {
      sortColumn = 'rating_num'
    }
    if (sortColumn === 'amount') {
      sortColumn = 'amount_num'
    }
    if (sortColumn === 'deadline') {
      sortColumn = 'deadline_num'
    }
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1
      } else if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1
      }
    }

    let rows = []
    rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer)
    this.setState({ rows })
  }

  render() {
    const { loans } = this.props
    if (isEmpty(loans) || isEmpty(this.state.rows)) {
      return <div>loading</div>
    } else {
      return (
        <ContainerFluid>
          <Title>Půjčky na zonky</Title>
          <ReactDataGrid
            onGridSort={this.handleGridSort}
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={800}
          />
        </ContainerFluid>
      )
    }
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
