import React, { Component } from 'react'
import './../assets/styles/App.css'

import GameContainer from './game/GameContainer'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <GameContainer />
      </div>
    )
  }
}

export default App
