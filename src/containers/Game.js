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

  // Calculate damage
  calculateDamage (level, power) {
    return Math.floor((2 * level / 5 + 2) * power / 50 + 2)
  }

  // Update HP
  updateHp (side, hp) {
    let newState = this.state
    newState.trainers[side].pokemon[newState.trainers[side].activePokemon].hpCurrent = hp
    this.setState(newState)
  }

  // Function that loops over array of functions with timeouts.
  animateArray (array) {
    let offset = 0
    array.map((step) => {
      let delay = step[0] * 1000
      delay ? offset += delay : null
      _.delay(() => {
        let trigger = step[1]
        trigger()
      }, offset)
    })
  }

  // Changes that Windows are visible.
  reframe (update) {
    console.log('Change visible windows: ' + Object.keys(update))

    const frames = Object.assign({}, this.state.frames, update)
    this.setState({frames})
  }

  // Perform a move.
  attack (movePlayer) {
    // Get all elements for animation; images and HP bars.
    const imagePlayer = document.getElementById('player').getElementsByClassName('images')[0]
    const imageFoe = document.getElementById('foe').getElementsByClassName('images')[0]

    // Get the players.
    const player = this.state.allot.left
    const foe = this.state.allot.right

    // Get details about the current Pokemon on both sides.
    const pokemonPlayer = this.state.trainers[player].pokemon[this.state.trainers[player].activePokemon]
    const pokemonFoe = this.state.trainers[foe].pokemon[this.state.trainers[foe].activePokemon]

    // CPU pick foe move
    const moveFoe = pokemonFoe.moves[Math.floor(Math.random() * pokemonFoe.moves.length)]

    // New HP foePokemon
    const hpNewPokemonFoe = pokemonFoe.hpCurrent - this.calculateDamage(pokemonPlayer.level, movePlayer.power)

    // New HP playerPokemon
    const hpNewPokemonPlayer = pokemonPlayer.hpCurrent - this.calculateDamage(pokemonFoe.level, moveFoe.power)

    // Array with all steps of the attack, including start and end functions, second argument is delay before running.
    this.animateArray([
      // Start turns.
      [ 0.0, () => { this.reframe({ fight: false, menu: false }) } ],

      // Player turn.
      [ 1.0, () => { this.setState({ lines: 'Pikachu used THUNDERSHOCK!' }) } ],
      [ 1.0, () => { imagePlayer.style.left = '0em' } ],
      [ 0.1, () => { imagePlayer.style.left = '1.5em' } ],
      [ 0.1, () => { imagePlayer.style.left = '0.8em' } ],
      [ 0.1, () => { imageFoe.style.opacity = 0 } ],
      [ 0.1, () => { imageFoe.style.opacity = 1 } ],
      [ 0.1, () => { imageFoe.style.opacity = 0 } ],
      [ 0.1, () => { imageFoe.style.opacity = 1 } ],
      [ 0.1, () => { imageFoe.style.opacity = 0 } ],
      [ 0.1, () => { imageFoe.style.opacity = 1 } ],
      [ 0.0, () => { this.updateHp(foe, hpNewPokemonFoe) } ],
      [ 0.0, () => { this.setState({ lines: null }) } ],

      // Foe turn.
      [ 1.0, () => { this.setState({ lines: 'Eeevee used TACKLE!' }) } ],
      [ 1.0, () => { imageFoe.style.right = '0em' } ],
      [ 0.1, () => { imageFoe.style.right = '1.5em' } ],
      [ 0.1, () => { imageFoe.style.right = '0.8em' } ],
      [ 0.1, () => { imagePlayer.style.opacity = 0 } ],
      [ 0.1, () => { imagePlayer.style.opacity = 1 } ],
      [ 0.1, () => { imagePlayer.style.opacity = 0 } ],
      [ 0.1, () => { imagePlayer.style.opacity = 1 } ],
      [ 0.1, () => { imagePlayer.style.opacity = 0 } ],
      [ 0.1, () => { imagePlayer.style.opacity = 1 } ],
      [ 0.0, () => { this.updateHp(player, hpNewPokemonPlayer) } ],
      [ 0.0, () => { this.setState({ lines: null }) } ],

      // End turns.
      [ 1.0, () => { this.reframe({ menu: true }) } ]
    ])
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
