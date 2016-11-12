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
            onClick={() => this.props.attack(move)}>
          {move.name.toUpperCase()}
        </li>
      )
    })
  }

  renderPokemons(pokemons) {
    return pokemons.map((pokemon) => {
      return (
        <div key={`pokemon-${pokemon.name}`}>
          <img src={`../img/${pokemon.name}_front.svg`} />
          <br/>
          <br/>
          {pokemon.name.toUpperCase()}
          <br/>
          HP: {pokemon.hp_current}
          <br/>
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
    if (trainer.name == 'green') {
      return (
        <div key={`trainer-${trainer.name}`}
             className='row'>
          <div className='col-xs-6'>
            {this.renderPokemons(trainer.pokemons)}
          </div>
          <div className='col-xs-6'>
            <img src={`../img/${trainer.name}_front.svg`} />
            {trainer.name.toUpperCase()}
          </div>
        </div>
      )
    }

    return (
      <div key={`trainer-${trainer.name}`}
           className='row'>
        <div className='col-xs-6'>
          {trainer.name.toUpperCase()}
          <img src={`../img/${trainer.name}_front.svg`} />
        </div>
        <div className='col-xs-6'>
          {this.renderPokemons(trainer.pokemons)}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className='col-xs-6'>
          {this.renderTrainer(this.props.trainers.player)}
        </div>
        <div className='col-xs-6'>
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
