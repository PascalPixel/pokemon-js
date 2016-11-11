// React & Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import CharacterPicker from './character-picker'

// Styling
require('../../style/main.sass')

// Main Game component
class Game extends Component {
  render() {
    if (this.props.player) {
      return (
        <div className="text-xs-center">
          <p>Pick your Pokémon</p>
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
    player: state.player
  }
}

export default connect(mapStateToProps)(Game)
