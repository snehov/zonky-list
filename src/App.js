import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, IndexLink, Switch } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import LoansList from 'pages/LoansList'
import LoanDetail from 'pages/LoanDetail'
import './App.css'

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={LoansList} />
          <Route path="/loan/:id_loan" component={LoanDetail} />
        </div>
      </Router>
    )
  }
}

export default App
