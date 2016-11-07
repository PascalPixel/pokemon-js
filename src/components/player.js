import React, { Component } from 'react'
import Pokemon              from './pokemon'

export default class Player extends Component {
  renderPokemon(pokemon) {
    return pokemon.map((pokemon) => {
      return (
        <Pokemon key={pokemon.name} pokemon={pokemon}/>
      )
    })
  }

  render() {
    return (
      <div key={this.props.player.name}>
        <div className='row'>
          <div className='col-xs-4'>
            <img src={`img/${this.props.player.image}_front.svg`}/>
          </div>
          <div className='col-xs-8'>
            <h3>{this.props.player.name}</h3>
          </div>
        </div>
        <br/>
        <h5>Team</h5>
        {this.renderPokemon(this.props.player.pokemon)}
      </div>
    )
  }
}
