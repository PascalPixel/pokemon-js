// React & Redux
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as actions from '../actions'

// Windows component
class Windows extends Component {
  windowMessages() {
    return (
      <div className='window texts'>
        <div className='text text1'></div>
        <div className='text text2'></div>
      </div>
    )
  }

  windowMenu() {
    return (
      <div className='window menu'>
        <span
          onClick={null}
          className='button fight'>
          FIGHT
        </span>
        <span className='button pkmn'>
          <sup>P</sup>
          <sub>K</sub>
          <sup>M</sup>
          <sub>N</sub>
        </span>
        <span className='button item'>ITEM</span>
        <span className='button run'>RUN</span>
      </div>
    )
  }

  windowFight(player) {
    return (
      <div className='window fight'>
        {
          player.pokemon.map((mon) => {
            if (mon.active) {
              return mon.moves.map((move) => {
                return (
                  <div
                    className='button'
                    key={`move-${move.name}`}
                    onClick={() => this.props.attack(move)}>
                    {move.name.toUpperCase()}
                    <div className='window fight-details'>
                      <span className='type-header'>TYPE/</span>
                      <br/>
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
                    <br/>
                  </div>
                )
              })
            }
          })
        }
        <div className='button back'>cancel</div>
      </div>
    )
  }

  windowItems(player) {
    return (
      <div className='window item'>
        {player.items.map((item) => {
          return (
            <div
              key={item.name}
              className='button'>
              <span>{item.name} x</span>
              <span className='potionCount'>{item.amount}</span>
            </div>
          )
        })}
        <div className='button back'>cancel</div>
      </div>
    )
  }

  windowPokemon(player) {
    return (
      <div className='window pkmn'>
        {player.pokemon.map((mon) => {
          return (
            <div
              key={mon.name}
              className='button playerPokemonButton'>
              <span className='playerpokemonname'>{mon.name}</span>
            </div>
          )
        })}
        <div className='button back'>cancel</div>
      </div>
    )
  }

  render() {
    return (
      <div className='layer windows'>
        {this.windowMessages()}
        {this.windowMenu()}
        {this.windowFight(this.props.player)}
        {this.windowItems(this.props.player)}
        {this.windowPokemon(this.props.player)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    windows: state.windows
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Windows)
