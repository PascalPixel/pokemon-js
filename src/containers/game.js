import React, { Component } from 'react'
import { connect } from 'react-redux'

class Game extends Component {
  render() {
    if (!this.props.move) {
      return (
        <div className='col-sm-6'>
          <p>Select Move</p>
        </div>
      )
    }

    return (
      <div className='col-sm-6'>
        <p>Move: {this.props.move.name}</p>
        <p>Damage: {this.props.move.damage}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    move: state.game
  }
}

export default connect(mapStateToProps)(Game)
