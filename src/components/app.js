import React, { Component } from 'react'

import Game from '../containers/game'
import MoveList from '../containers/move-list'

require('../../style/main.sass')

class App extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-sm-6'>
          <MoveList />
        </div>
        <Game />
      </div>
    )
  }
}

export default App
