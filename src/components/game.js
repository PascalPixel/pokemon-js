import React, { Component } from 'react'
import Player               from './player'

require('../../style/main.sass')

export default class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: {
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
              hpCurrent: 15,
              hpBase: 15,
              moves: [
                {
                  name: 'Tackle',
                  category: 'offensive',
                  types: [
                    'Normal'
                  ],
                  baseDamage: 40,
                  pp: 5,
                  ppCurrent: 5
                },
                {
                  name: 'Growl',
                  category: 'defensive',
                  types: [
                    'Normal'
                  ],
                  baseDamage: 0,
                  pp: 5,
                  ppCurrent: 5
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
              hpCurrent: 13,
              hpBase: 13,
              moves: [
                {
                  name: 'Thundershock',
                  category: 'offensive',
                  types: [
                    'Electric'
                  ],
                  baseDamage: 50,
                  pp: 5,
                  ppCurrent: 5
                },
                {
                  name: 'Tail Whip',
                  category: 'defensive',
                  types: [
                    'Normal'
                  ],
                  baseDamage: 0,
                  pp: 5,
                  ppCurrent: 5
                }
              ]
            }
          ]
        }
      }
    }
  }

  render() {
    return (
      <div id='pokemon'>
        <div className='depth'>
          <div className='row'>
            <Player player={this.state.players.red} />
            <Player player={this.state.players.blue} />
          </div>
        </div>
      </div>
    )
  }
}
