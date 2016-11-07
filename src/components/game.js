import React, { Component } from 'react'
import Blue                 from './blue'
import Red                  from './red'
import MoveWindow           from '../containers/move-window'
// import Disclaimer           from './disclaimer'
// import Backup               from './backup'

require('../../style/main.sass')

export default class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blue: {
        name: 'Blue',
        image: 'blue',
        pokemon: [
          {
            name: 'Eevee',
            pokedex: 133,
            level: 5,
            baseHp: 15,
            moves: [
              {
                name: 'Tackle',
                category: 'offensive',
                types: ['Normal'],
                baseDamage: 40
              },
              {
                name: 'Tail Whip',
                category: 'defensive',
                types: ['Normal'],
                baseDamage: 0
              }
            ]
          }
        ]
      },
      red: {
        name: 'Red',
        image: 'red',
        pokemon: [
          {
            name: 'Pikachu',
            pokedex: 25,
            level: 4,
            baseHp: 13,
            moves: [
              {
                name: 'Tackle',
                category: 'offensive',
                types: ['Normal'],
                baseDamage: 40
              },
              {
                name: 'Tail Whip',
                category: 'defensive',
                types: ['Normal'],
                baseDamage: 0
              }
            ]
          }
        ]
      }
    }
  }

  renderPlayer(player) {
    return (
      <div key={player.name}>
        <h3>{player.name}</h3>
        <ul>
          {this.renderPokemon(player)}
        </ul>
      </div>
    )
  }

  renderPokemon(player) {
    return player.pokemon.map((pokemon) => {
      return (
        <div key={pokemon.name}>
          <h4>{pokemon.name}</h4>
          <ul>
            {this.renderMoves(pokemon)}
          </ul>
        </div>
      )
    })
  }

  renderMoves(pokemon) {
    return pokemon.moves.map((move) => {
      return (
        <li key={move.name}>
          {move.name}
        </li>
      )
    })
  }

  render() {
    return (
      <div id='pokemon'>
        <div className='depth'>
          {this.renderPlayer(this.state.red)}
          {this.renderPlayer(this.state.blue)}
          {/* <MoveWindow /> */}
        </div>
      </div>
    )
  }
}
