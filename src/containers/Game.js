import React from 'react'
import VelocityComponent from 'velocity-react'
import Trainer from '../components/Trainer'
import Windows from '../components/Windows'
import STORE from '../data/store'

export default class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = STORE
  }

  // Actions
  reframe (update) {
    const frames = Object.assign({}, this.state.frames, update)
    this.setState({ frames })
  }
  attack (move) {
    console.log('attack: ' + move.name)
    let playerLevel = this.state.trainers[this.state.allot.left].pokemon[this.state.trainers[this.state.allot.left].activePokemon].level
    let hpFoe = this.state.trainers[this.state.allot.right].pokemon[this.state.trainers[this.state.allot.right].activePokemon].hp_current
    let hpFoeFull = this.state.trainers[this.state.allot.right].pokemon[this.state.trainers[this.state.allot.right].activePokemon].hp_base
    let playerImage = document.getElementById('player').getElementsByClassName('images')[0]
    let foeImage = document.getElementById('foe').getElementsByClassName('images')[0]
    let foeHpBar = document.getElementById('foe').getElementsByClassName('hp-bar-active')[0]

    playerImage.style.left = '0em'
    window.setTimeout(() => {
      playerImage.style.left = '1.8em'
      window.setTimeout(() => {
        playerImage.style.left = '0.8em'
        window.setTimeout(() => {
          foeImage.style.opacity = 0
          window.setTimeout(() => {
            foeImage.style.opacity = 1
            window.setTimeout(() => {
              foeImage.style.opacity = 0
              window.setTimeout(() => {
                foeImage.style.opacity = 1
                window.setTimeout(() => {
                  foeImage.style.opacity = 0
                  window.setTimeout(() => {
                    foeImage.style.opacity = 1
                    let baseDamage = Math.floor(((2 * playerLevel / 5 + 2) * move.power) / 50) + 2
                    hpFoe = hpFoe - baseDamage
                    foeHpBar.style.width = `${hpFoe * 100 / hpFoeFull}%`
                  }, 100)
                }, 100)
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 100)
    }, 100)
  }
  change (pokemon) {
    console.log('switch: ' + pokemon.name)
  }
  use (item) {
    console.log('use: ' + item.name)
  }
  run () {
    console.log('run')
  }

  render () {
    const player = this.state.trainers[this.state.allot.left]

    return (
      <div className='depth'>
        <Trainer
          trainer={this.state.trainers[this.state.allot.right]}
          currentTrainer={0} />
        <Trainer
          trainer={player}
          currentTrainer={1} />
        <Windows
          trainer={player}
          frames={this.state.frames}
          lines={this.state.lines}

          // Actions
          reframe={this.reframe.bind(this)}
          attack={this.attack.bind(this)}
          change={this.change.bind(this)}
          use={this.use.bind(this)}
          run={this.run.bind(this)} />
      </div>
    )
  }
}
