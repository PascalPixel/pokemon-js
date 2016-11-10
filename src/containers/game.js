import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { attackFoe } from '../actions'

require('../../style/main.sass')

class Game extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.attackFoe(7)}>Attack 7</button>
        <br/>
        <br/>
        <p>Foe health: {this.props.foeDamage}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    foeDamage: state.foeDamage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ attackFoe }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
