import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './../assets/styles/App.css'

import GameContainer from './game/GameContainer'
import StatisticsContainer from './statistics/StatisticsContainer'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Game</Link>
              </li>
              <li>
                <Link to='/statistics/'>Statistics</Link>
              </li>
            </ul>
          </nav>

          <Route path='/' exact component={GameContainer} />
          <Route path='/statistics/' component={StatisticsContainer} />
        </div>
      </Router>
    )
  }
}

export default App
