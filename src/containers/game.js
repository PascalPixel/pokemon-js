// React & Redux
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { pickCharacter } from '../actions'

// Styling
require('../../style/main.sass')

// Main Game component
class Game extends Component {
  renderCharacters() {
    return this.props.characters.map((character) => {
      return (
        <div
          className='col-sm-2'
          key={`character-${character.key}`}
          onClick={() => this.props.pickCharacter(character)}>
          <img src={`../img/${character.name}_front.svg`} />
          <br/>
          <br/>
          {character.name}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="text-xs-center">
        <p>Pick your character</p>
        <div className='row'>
          <div className='col-sm-3'></div>
          {this.renderCharacters()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    characters: state.characters
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pickCharacter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
