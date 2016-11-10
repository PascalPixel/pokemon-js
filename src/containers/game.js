import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { attack } from '../actions'

require('../../style/main.sass')

class Game extends Component {
  render() {
    if (!this.props.game) {
      return (
        <button onClick={() => this.props.attack(20)}>Attack</button>
      )
    }
    return (
      <div>
        <button onClick={() => this.props.attack(20)}>Attack</button>
        <br/>
        <br/>
        <p>Attacked! {this.props.game} damage!</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ attack }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
