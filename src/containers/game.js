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
  renderStats(pokemonList, player) {
    return pokemonList.map((mon) => {
      if (mon.active) {
        return (
          <div key={mon.name} className='stats'>
            <div className='name'>{mon.name.toUpperCase()}</div>
            <div className='level-wrap'>
              <img src='img/level.svg'/>
              <span className='level'>{mon.level}</span>
            </div>
            <div className='hp-wrap'>
              <img src='img/hp.svg'/>
              <div className='hp-bar'>
                <div className='hp-bar-active'></div>
              </div>
            </div>
            {player?(
              <div className='health'>
                <span className='hp'>{mon.hp_current}</span>
                <span>/</span>
                <span className='hpTotal'>{mon.hp_base}</span>
              </div>
            ):null}
          </div>
        )
      }
    })
  }

  renderMoves(trainer) {
    return trainer.pokemon.map((mon) => {
      if (mon.active) {
        return mon.moves.map((move) => {
          return (
            <li key={`move-${move.name}`}
                onClick={() => this.props.attack(move)}>
              {move.name.toUpperCase()}
              <div className='window fight-details'>
                <span className='type-header'>TYPE/</span>
                {move.types.map((type) => {
                  return (
                    <span
                        key={type}
                        className='type'>
                        {type}
                        <br/>
                    </span>
                  )
                })}
              </div>
            </li>
          )
        })
      }
    })
  }

  spriteRender(object, side, type) {
    if (type == 'trainer') {
      return (
        <img src={`../img/${object.name}_${side}.svg`} />
      )
    } else {
      return object.map((mon) => {
        if (mon.active) {
          return (
            <img key={mon.name} src={`../img/${mon.name}_${side}.svg`} />
          )
        }
      })
    }
  }

  foe(trainer) {
    return (
      <div className='layer foe'>
        <div className='info'>
          <div className='balls'>
            <img src='img/blue_balls.svg'/>
          </div>
          {this.renderStats(trainer.pokemon, false)}
        </div>
        <div className='images'>
          <div className='trainer'>
            {this.spriteRender(trainer, 'front', 'trainer')}
          </div>
          <div className='pokemon'>
            {this.spriteRender(trainer.pokemon, 'front', 'pokemon')}
          </div>
        </div>
      </div>
    )
  }

  player(trainer) {
    return (
      <div className='layer player'>
        <div className='images'>
          <div className='trainer'>
            {this.spriteRender(trainer, 'back', 'trainer')}
          </div>
          <div className='pokemon'>
            {this.spriteRender(trainer.pokemon, 'back', 'pokemon')}
          </div>
        </div>
        <div className='info'>
          <div className='balls'>
            <img src='img/red_balls.svg'/>
          </div>
          {this.renderStats(trainer.pokemon, true)}
        </div>
      </div>
    )
  }

  windows(phase, trainer) {
    return (
      <div className='layer windows'>
        <div className='window texts'>
          <div className='text text1'></div>
          <div className='text text2'></div>
        </div>
        <div className='window menu'>
          <span className='button fight'>FIGHT</span>
          <span className='button pkmn'>
            <sup>P</sup>
            <sub>K</sub>
            <sup>M</sup>
            <sub>N</sub>
          </span>
          <span className='button item'>ITEM</span>
          <span className='button run'>RUN</span>
        </div>
        <div className='window fight'>
          {this.renderMoves(trainer)}
          <div className='button back'>cancel</div>
        </div>
        <div className='window item'>
          <div className='button potion'>
            <span>POTION x</span>
            <span className='potionCount'>1</span>
          </div>
          <div className='button back'>cancel</div>
        </div>
        <div className='window pkmn'>
          <div className='button playerPokemonButton'>
            <span className='playerpokemonname'></span>
          </div>
          <div className='button back'>cancel</div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id='pokemon'>
        <div className='depth'>
          {this.foe(this.props.trainers.foe, 'front')}
          {this.player(this.props.trainers.player, 'back')}
          {this.windows(this.props.phase, this.props.trainers.player)}
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
