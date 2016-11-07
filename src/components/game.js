import React, { Component } from 'react'
import Player               from './player'

require('../../style/main.sass')

export default class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blue: {
        name: 'Blue',
        image: 'blue',
        items: [
          {
            name: 'Potion',
            effect: 'Healing',
            amount: 0
          }
        ],
        selectedPokemon: 0,
        pokemon: [
          {
            name: 'Eevee',
            image: 'eevee',
            pokedex: 133,
            level: 5,
            currentHp: 15,
            baseHp: 15,
            moves: [
              {
                name: 'Tackle',
                category: 'offensive',
                types: [
                  'Normal'
                ],
                baseDamage: 40
              },
              {
                name: 'Tail Whip',
                category: 'defensive',
                types: [
                  'Normal'
                ],
                baseDamage: 0
              }
            ]
          }
        ]
      },
      red: {
        name: 'Red',
        image: 'red',
        items: [
          {
            name: 'Potion',
            effect: 'Healing',
            amount: 1
          }
        ],
        selectedPokemon: 0,
        pokemon: [
          {
            name: 'Pikachu',
            image: 'pikachu',
            pokedex: 25,
            level: 4,
            currentHp: 13,
            baseHp: 13,
            moves: [
              {
                name: 'Tackle',
                category: 'offensive',
                types: [
                  'Normal'
                ],
                baseDamage: 40
              },
              {
                name: 'Tail Whip',
                category: 'defensive',
                types: [
                  'Normal'
                ],
                baseDamage: 0
              }
            ]
          }
        ]
      }
    }
  }

  render() {
    return (
      <div id='pokemon'>
        <div className='depth'>
          <div className='row'>
            <div className='col-xs-6'>
              <Player player={this.state.blue}/>
            </div>
            <div className='col-xs-6'>
              <Player player={this.state.red}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
