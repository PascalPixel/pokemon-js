// React & Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import CharacterPicker from './character-picker'
import PokemonPicker from './pokemon-picker'

// Styling
require('../../style/main.sass')

// Main Game component
class Game extends Component {
  render() {
    if (this.props.player_pokemon && this.props.foe_pokemon) {
      return (
        <div className='text-xs-center'>
          <p>Battle start</p>
        </div>
      )
    }

    if (this.props.player && this.props.foe) {
      return (
        <div>
          <PokemonPicker />
        </div>
      )
    }

    return (
      <div>
        <CharacterPicker />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    foe: state.foe,
    player_pokemon: state.player_pokemon,
    foe_pokemon: state.foe_pokemon
  }
}

export default connect(mapStateToProps)(Game)
