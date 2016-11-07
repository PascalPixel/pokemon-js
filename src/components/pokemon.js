import React, { Component } from 'react'
import MoveList from './move-list'

export default class Pokemon extends Component {
  render() {
    return (
      <div key={this.props.pokemon.name}>
        <div className='row'>
          <div className='col-xs-4'>
            <img src={`img/${this.props.pokemon.image}_front.svg`}/>
          </div>
          <div className='col-xs-8'>
            <h5>{this.props.pokemon.name}</h5>
            <p>Level: {this.props.pokemon.level}</p>
            <p>Pokedex: {this.props.pokemon.pokedex}</p>
            <p>Moves:</p>
            <ul>
              <MoveList moves={this.props.pokemon.moves}/>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
