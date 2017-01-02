import _ from 'lodash'
import React from 'react'
// import VelocityComponent from 'velocity-react'
import Trainer from '../components/Trainer'
import Windows from '../components/Windows'
import STORE from '../data/store'

export default class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = STORE
  }

  // Functions
  animateArray (array) {
    let offset = 0
    array.map((step) => {
      step[1] ? offset += step[1] : null
      _.delay(() => {
        let trigger = step[0]
        trigger()
      }, offset)
    })
  }

  // Actions
  reframe (update) {
    const frames = Object.assign({}, this.state.frames, update)
    this.setState({frames})
  }
  attack (move) {
    // Hide the Menu and Fight Menu
    this.reframe({
      fight: false,
      menu: false
    })

    // Make State items readable
    const player = this.state.trainers[this.state.allot.left]
    const foe = this.state.trainers[this.state.allot.right]
    const playerPokemonLevel = player.pokemon[player.activePokemon].level
    const foePokemonHpBase = foe.pokemon[foe.activePokemon].hpBase
    const foePokemonHpCurrent = foe.pokemon[foe.activePokemon].hpCurrent

    // Images and Health bars
    const imagePlayer = document.getElementById('player').getElementsByClassName('images')[0]
    const imageFoe = document.getElementById('foe').getElementsByClassName('images')[0]
    const hpBar = document.getElementById('foe').getElementsByClassName('hp-bar-active')[0]

    // New HP
    const foePokemonHpUpdate = foePokemonHpBase - (Math.floor(((2 * playerPokemonLevel / 5 + 2) * move.power) / 50) + 2)

    // Array with all animation steps
    const attackAnimation = [
      [() => { imagePlayer.style.left = '0em' }, 100],
      [() => { imagePlayer.style.left = '1.5em' }, 100],
      [() => { imagePlayer.style.left = '0.8em' }, 100],
      [() => { imageFoe.style.opacity = 0 }, 100],
      [() => { imageFoe.style.opacity = 1 }, 100],
      [() => { imageFoe.style.opacity = 0 }, 100],
      [() => { imageFoe.style.opacity = 1 }, 100],
      [() => { imageFoe.style.opacity = 0 }, 100],
      [() => { imageFoe.style.opacity = 1 }, 100],
      [() => { hpBar.style.width = `${foePokemonHpUpdate * 100 / foePokemonHpBase}%` }, 100]
    ]
    this.animateArray(attackAnimation)

    // Update the State with new HP
    this.setState({
      [foePokemonHpCurrent]: foePokemonHpUpdate
    })

    // Show Menu
    this.reframe({ menu: true })
  }
  change (pokemon) {
    console.log('switch: ' + pokemon.name)
  }
  use (item) {
    console.log('use: ' + item.name)
  }
  run () {
    console.log('run')
  }

  render () {
    const player = this.state.trainers[this.state.allot.left]

    return (
      <div className='depth'>
        <Trainer
          trainer={this.state.trainers[this.state.allot.right]}
          currentTrainer={0} />
        <Trainer
          trainer={player}
          currentTrainer={1} />
        <Windows
          trainer={player}
          frames={this.state.frames}
          lines={this.state.lines}

          // Actions
          reframe={this.reframe.bind(this)}
          attack={this.attack.bind(this)}
          change={this.change.bind(this)}
          use={this.use.bind(this)}
          run={this.run.bind(this)} />
      </div>
    )
  }
}
