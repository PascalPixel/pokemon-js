// React & Redux
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { attack } from '../actions'

// Styling
require('../../style/main.sass')

// Main Game component
class Game extends Component {
  renderMoves(moves) {
    return moves.map((move) => {
      return (
        <li key={`move-${move.name}`}
            onClick={() => this.props.attack(move.damage)}>
          {move.name.toUpperCase()}
        </li>
      )
    })
  }

  renderPokemons(pokemons) {
    return pokemons.map((pokemon) => {
      return (
        <div key={`pokemon-${pokemon.name}`}>
          Pokemon: {pokemon.name.toUpperCase()}
          <br/>
          HP: {pokemon.hp_current}
          <br/>
          <img src={`../img/${pokemon.name}_front.svg`} />
          <br/>
          Moves:
          <ul className='list-unstyled'>
            {this.renderMoves(pokemon.moves)}
          </ul>
        </div>
      )
    })
  }

  renderTrainer(trainer) {
    return (
      <div className='col-xs-6'
           key={`trainer-${trainer.name}`}>
        Trainer: {trainer.name.toUpperCase()}
        <br/>
        <img src={`../img/${trainer.name}_front.svg`} />
        <br/>
        {this.renderPokemons(trainer.pokemons)}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className='text-xs-right'>
          {this.renderTrainer(this.props.trainers.player)}
        </div>
        <div className='text-xs-left'>
          {this.renderTrainer(this.props.trainers.foe)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    trainers: state.trainers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ attack }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
