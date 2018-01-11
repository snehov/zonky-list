import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, IndexLink } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import LoansList from 'pages/LoansList'
import './App.css'

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={LoansList} />
        {/* <Route path="/:id_loan" component={LoanDetail /> */}
      </Router>
    )
    /*   <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Login/>
      </div> */
  }
}

export default App
