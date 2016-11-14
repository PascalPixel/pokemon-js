// React & Redux
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// Actions
import * as actions from '../actions'

// Windows component
class Windows extends Component {
  constructor(props) {
    super(props)

    this.state = {
      windowMenuVisible: true,
      windowFightVisible: false,
      windowItemsVisible: false,
      windowPokemonVisible: false
    }
  }

  windowMessages() {
    return (
      <div className='window texts'>
        <div className='text text1'></div>
        <div className='text text2'></div>
      </div>
    )
  }

  windowMenu() {
    if (this.state.windowMenuVisible) {
      return (
        <div className='window menu'>
          <span onClick={() => this.setState({windowFightVisible: true})} className='button fight'>
            FIGHT
          </span>
          <span onClick={() => this.setState({windowPokemonVisible: true})} className='button'>
            <sup>P</sup>
            <sub>K</sub>
            <sup>M</sup>
            <sub>N</sub>
          </span>
          <span onClick={() => this.setState({windowItemsVisible: true})} className='button'>
            ITEM
          </span>
          <span className='button'>
            RUN
          </span>
        </div>
      )
    }
  }

  windowFight(player, foe) {
    if (this.state.windowFightVisible) {
      return (
        <div className='window fight'>
          {player.pokemon.map((mon) => {
            if (mon.active) {
              return mon.moves.map((move) => {
                return (
                  <div className='button' key={`move-${move.name}`} onClick={() => {
                    this.setState({windowFightVisible: false}),
                    this.props.attack(move, foe)
                  }}>
                    {move.name.toUpperCase()}
                    <div className='window fight-details'>
                      <span className='type-header'>
                        TYPE/
                      </span><br/> {move.types.map((type) => {
                        return (
                          <span key={type} className='type'>{type}<br/></span>
                        )
                      })}
                    </div>
                    <br/>
                  </div>
                )
              })
            }
          })}
          <div className='button' onClick={() => this.setState({windowFightVisible: false})}>
            cancel
          </div>
        </div>
      )
    }
  }

  windowItems(player) {
    if (this.state.windowItemsVisible) {
      return (
        <div className='window item'>
          {player.items.map((item) => {
            return (
              <div key={item.name} className='button'>
                <span>{item.name}
                  x</span>
                <span className='potionCount'>
                  {item.amount}
                </span>
              </div>
            )
          })}
          <div onClick={() => this.setState({windowItemsVisible: false})} className='button'>
            cancel
          </div>
        </div>
      )
    }
  }

  windowPokemon(player) {
    if (this.state.windowPokemonVisible) {
      return (
        <div className='window pkmn'>
          {player.pokemon.map((mon) => {
            return (
              <div key={mon.name} className='button playerPokemonButton'>
                <span className='playerpokemonname'>
                  {mon.name.toUpperCase()}
                </span>
              </div>
            )
          })}
          <div onClick={() => this.setState({windowPokemonVisible: false})} className='button'>
            cancel
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='layer windows'>
        {this.windowMessages()}
        {this.windowMenu()}
        {this.windowFight(this.props.trainers.player, this.props.trainers.foe)}
        {this.windowItems(this.props.trainers.player)}
        {this.windowPokemon(this.props.trainers.player)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {windows: state.windows}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Windows)
