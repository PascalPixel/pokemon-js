// React & Redux
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import Windows from './windows'

// Actions
import * as actions from '../actions'

// Styling
require('../../style/main.sass')

// Main Game component
class Game extends Component {
  hpBar(current, total) {
    return (
      <div className='hp-bar'>
        <div
          className='hp-bar-active'
          style={{width: current * 100 / total}}></div>
      </div>
    )
  }

  hpCounters(current, total) {
    return (
      <div className='health'>
        <span className='hp'>{current}</span>
        <span>/</span>
        <span className='hpTotal'>{total}</span>
      </div>
    )
  }

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
              {this.hpBar(mon.hp_current, mon.hp_base)}
            </div>
            {player ? this.hpCounters(mon.hp_current, mon.hp_base) : null}
          </div>
        )
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

  render() {
    return (
      <div id='pokemon'>
        <div className='depth'>
          {this.foe(this.props.trainers.foe, 'front')}
          {this.player(this.props.trainers.player, 'back')}
          <Windows player={this.props.trainers.player}/>
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
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
