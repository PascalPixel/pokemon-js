// React & Redux
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { pickPokemon } from '../actions'

// Main Game component
class PokemonPicker extends Component {
  renderPokedex() {
    return this.props.pokedex.map((pokemon) => {
      return (
        <div
          className='col-sm-2'
          key={`pokemon-${pokemon.key}`}
          onClick={() => this.props.pickPokemon(pokemon)}>
          <img src={`../img/${pokemon.name}_front.svg`} />
          <br/>
          <br/>
          {pokemon.name}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="text-xs-center">
        <p>Pick your Pokemon</p>
        <div className='row'>
          <div className='col-sm-3'></div>
          {this.renderPokedex()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pokedex: state.pokedex
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pickPokemon }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonPicker)
