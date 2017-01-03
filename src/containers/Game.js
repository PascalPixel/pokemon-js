import _ from 'lodash'
import React from 'react'
// import VelocityComponent from 'velocity-react'
import Trainer from '../components/Trainer'
import Windows from '../components/Windows'
import STORE from '../data/store'

export default class Game extends React.Component {
  constructor (props) {
    super(props)

    // Load store of info only in main Component.
    this.state = STORE
  }

  // Function that loops over array of functions with timeouts.
  animateArray (array) {
    console.log('Animation started.')

    let offset = 0
    array.map((step) => {
      step[1] ? offset += step[1] : null
      _.delay(() => {
        let trigger = step[0]
        trigger()
      }, offset)
    })

    console.log('Animation finished.')
  }

  // Changes that Windows are visible.
  reframe (update) {
    console.log('Change visible windows: ' + Object.keys(update))

    const frames = Object.assign({}, this.state.frames, update)
    this.setState({frames})
  }

  // Perform a move.
  attack (move) {
    console.log('Move clicked: ' + move.name)

    // Get all elements for animation; images and HP bars.
    const imagePlayer = document.getElementById('player').getElementsByClassName('images')[0]
    const imageFoe = document.getElementById('foe').getElementsByClassName('images')[0]
    const hpBar = document.getElementById('foe').getElementsByClassName('hp-bar-active')[0]

    // Get the players.
    const player = this.state.trainers[this.state.allot.left]
    const foe = this.state.trainers[this.state.allot.right]

    // Get details about the current Pokemon on both sides.
    const playerPokemonLevel = player.pokemon[player.activePokemon].level
    const foePokemonHpBase = foe.pokemon[foe.activePokemon].hpBase
    const foePokemonHpCurrent = foe.pokemon[foe.activePokemon].hpCurrent

    // New HP
    const foePokemonHpUpdate = foePokemonHpBase - Math.floor((2 * playerPokemonLevel / 5 + 2) * move.power / 50 + 2)
    console.log('Move damage: ' + foePokemonHpUpdate)

    // Before Attacking.
    function startAttack () {
      // Hide the Menu and Fight Menu.
      this.reframe({
        fight: false,
        menu: false
      })
    }

    // Array with all steps of the attack, including start and end functions, second argument is delay before running.
    this.animateArray([
      [() => { startAttack() }, 0],
      [() => { imagePlayer.style.left = '0em' }, 100],
      [() => { imagePlayer.style.left = '1.5em' }, 100],
      [() => { imagePlayer.style.left = '0.8em' }, 100],
      [() => { imageFoe.style.opacity = 0 }, 100],
      [() => { imageFoe.style.opacity = 1 }, 100],
      [() => { imageFoe.style.opacity = 0 }, 100],
      [() => { imageFoe.style.opacity = 1 }, 100],
      [() => { imageFoe.style.opacity = 0 }, 100],
      [() => { imageFoe.style.opacity = 1 }, 100],
      [() => { hpBar.style.width = `${foePokemonHpUpdate * 100 / foePokemonHpBase}%` }, 100],
      [() => { endAttack() }, 500]
    ])

    // After Attacking.
    function endAttack () {
      // Update the State with new HP.
      this.setState({
        [foePokemonHpCurrent]: foePokemonHpUpdate
      })

      // Show Menu.
      this.reframe({
        menu: true
      })

      console.log('Move ' + move.name + ' finished.')
    }
  }

  // Switch Pokemon
  change (pokemon) {
    console.log('Switch to: ' + pokemon.name)
  }

  // Use Item
  use (item) {
    console.log('Item used: ' + item.name)
  }

  // Run from encounter/battle.
  run () {
    console.log('Attempted to Run.')
  }

  // Render component.
  render () {
    return (
      <div>
        <Trainer
          trainer={this.state.trainers[this.state.allot.right]}
          currentTrainer={0} />

        <Trainer
          trainer={this.state.trainers[this.state.allot.left]}
          currentTrainer={1} />

        <Windows
          trainer={this.state.trainers[this.state.allot.left]}
          frames={this.state.frames}
          lines={this.state.lines}

          // Actions.
          reframe={this.reframe.bind(this)}
          attack={this.attack.bind(this)}
          change={this.change.bind(this)}
          use={this.use.bind(this)}
          run={this.run.bind(this)} />
      </div>
    )
  }
}
