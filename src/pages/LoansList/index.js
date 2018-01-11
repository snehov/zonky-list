import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import { fetchLoans } from './LoansActions'
import { Link } from 'react-router-dom'
import ReactDataGrid from 'react-data-grid'
//import ReactDataGridPlugins from 'react-data-grid/addons';

class LoansList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rows: [], originalRows: [] }

    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'name', name: 'Projekt', sortable: true },
      { key: 'amount', name: 'Potřeba peněz' },
      { key: 'actions', name: '' },
    ]
    this.tableRows = []
  }
  componentDidMount() {
    this.props.fetchLoans()
    setInterval(this.props.fetchLoans, 1000 * 60 * 5)
  }

  genRows() {
    const { loans } = this.props
    let rows = []
    loans.map(loan => {
      rows.push({
        id: loan.id,
        name: loan.name,
        amount: loan.amount,
        actions: <Link to={`loan/${loan.id}`}>uka</Link>,
      })
    })
    this._rows = rows
    //let originalRows = rows
    //this.setState({ originalRows, rows: originalRows.slice(0) })
  }

  rowGetter = i => {
    return this._rows[i]
    //return this.state.rows[i]
  }
  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1
      } else if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1
      }
    }

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer)

    this.setState({ rows })
  }

  render() {
    const { loans } = this.props
    if (isEmpty(loans)) {
      return <div>loading</div>
    } else {
      return (
        <div>
          <h1>loans list from zonky</h1>
          {/* loans.map((loan, index) => {
            return (
              <div key={index}>
                Loan:{loan.name}
                <Link to={`loan/${loan.id}`}>uka</Link>
              </div>
            )
          }) */}
          {this.genRows()}
          <ReactDataGrid
            onGridSort={this.handleGridSort}
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this._rows.length}
            minHeight={500}
          />
        </div>
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
