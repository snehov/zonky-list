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
      /* { key: 'id', name: 'ID', width: 50 }, */
      { key: 'image', name: 'Obrázek', width: 60 },
      { key: 'name', name: 'Projekt', width: 300, sortable: true },
      { key: 'story', name: 'Příběh' },

      { key: 'amount', name: 'Potřeba peněz', width: 150, sortable: true },
      { key: 'duration', name: 'Trvání (měsíce)', width: 150, sortable: true },
      { key: 'rating', name: 'Rating', width: 60, sortable: true, sortType: 'rating' },
      { key: 'actions', name: '', width: 200 },
    ]
    this.tableRows = []
  }

  componentDidMount() {
    this.props.fetchLoans().then(
      res => {
        console.log('feč', res)
        this.genRows()
        this.forceUpdate()
      },
      err => {
        console.log('feč error', err)
      },
    )
    setInterval(this.props.fetchLoans, 1000 * 60 * 5)
  }
  shorten(str, maxLenChars, maxLenWords = 0, separator = ' ') {
    //first reduce to amout of words
    if (maxLenWords > 0) {
      str = str
        .split(/\s+/)
        .slice(0, maxLenWords)
        .join(separator)
    }
    //then cut to max length in charactes
    if (str.length <= maxLenChars) {
      return str
    } else {
      return str.substr(0, str.lastIndexOf(separator, maxLenChars)) + '...'
    }
  }
  genRows() {
    console.log('generuju radky')
    const { loans } = this.props
    let rows = []
    loans.map(loan => {
      let shortStory = this.shorten(loan.story, 200, 20)
        .split(/\s+/)
        .slice(0, 20)
        .join(' ')
      rows.push({
        id: loan.id,
        image: (
          <img
            src={`https://api.zonky.cz${loan.photos[0].url} `}
            alt="fotka proj"
            style={{ width: 40 + 'px' }}
          />
        ),
        name: loan.name,
        story: shortStory, //+ shortStory.length
        rating: loan.rating,
        duration: loan.termInMonths,
        amount: loan.amount,

        actions: <Link to={`loan/${loan.id}`}>uka</Link>,
      })
    })
    //this._rows = rows
    this.setState({ originalRows: rows, rows: rows.slice(0) })
  }

  rowGetter = i => {
    //return this._rows[i]
    return this.state.rows[i]
  }
  ratingSort(a, b) {
    //console.log('rating sort A: ', a)
    console.log('rating sort B: ', b)

    if (b.rating.toString().length === 1) {
      console.log('charcode ' + b.rating, b.rating.charCodeAt(0))

      /*    if (b.rating.toString().length == 1 && a.rating.toString().length == 1) {
        if (b.rating.charCodeAt(0) > a.rating.charCodeAt(0)) {
          return 1
        }
      } */
      let sortValue = 1000 - b.rating.charCodeAt(0)
      console.log('sortvalue ', sortValue)
      return sortValue
    } else {
      console.log('sortvalue ', b.rating.toString().length - a.rating.toString().length)
      return b.rating.toString().length - a.rating.toString().length
    }
  }
  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1
      } else if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1
      }
    }
    //console.log('sortTyp', this._columns[sortColumn].sortType)
    let cols = this._columns

    const sortType = this._columns.filter(function(arr) {
      return arr.key == sortColumn
    })[0].sortType
    let rows = []
    switch (sortType) {
      case 'rating':
        console.log('rating sort')
        //rows = this.state.rows
        rows =
          sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(this.ratingSort)
        break
      default:
        console.log('default sort')
        rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer)
    }

    this.setState({ rows })
  }

  render() {
    const { loans } = this.props
    if (isEmpty(loans) || isEmpty(this.state.rows)) {
      return <div>loading</div>
    } else {
      return (
        <div>
          <h1>loans list from zonky</h1>
          {console.log('vykresluji DG')}
          <ReactDataGrid
            onGridSort={this.handleGridSort}
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
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
