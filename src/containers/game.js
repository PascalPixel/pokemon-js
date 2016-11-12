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

  renderPokemon(pokemon) {
    return pokemon.map((mon) => {
      return (
        <div key={`pokemon-${mon.name}`}>
          <img src={`../img/${mon.name}_front.svg`} />
          <br/>
          <br/>
          {mon.name.toUpperCase()}
          <br/>
          HP: {mon.hp_current}
          <br/>
          <br/>
          Moves:
          <ul className='list-unstyled'>
            {this.renderMoves(mon.moves)}
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
            {this.renderPokemon(trainer.pokemon)}
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
          {this.renderPokemon(trainer.pokemon)}
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
