import React, {Component} from 'react'
import Trainer from './Trainer'
import Windows from './Windows'
import INITIAL_STATE from './initial-state'

require('../style/main.sass')

export default class Game extends Component {
  constructor (props) {
    super(props)

    this.state = INITIAL_STATE
  }

  // Actions
  reframe = (update) => {
    const newState = Object.assign({}, this.state.frames, update)
    this.setState({ frames: newState })
  }
  attack = (move) => {
    console.log('attack: ' + move.name)
  }
  switch = (pokemon) => {
    console.log('switch: ' + pokemon.name)
  }
  use = (item) => {
    console.log('use: ' + item.name)
  }
  run = () => {
    console.log('run')
  }

  render () {
    const foe = this.state.trainers[this.state.allot.right]
    const player = this.state.trainers[this.state.allot.left]

    return (
      <div className='depth'>
        <Trainer
          trainer={foe}
          currentTrainer={0}
        />
        <Trainer
          trainer={player}
          currentTrainer={1}
        />
        <Windows
          trainer={player}
          frames={this.state.frames}
          lines={this.state.lines}

          // Actions
          reframe={this.reframe}
          attack={this.attack}
          switch={this.switch}
          use={this.use}
          run={this.run}
        />
      </div>
    )
  }
}
