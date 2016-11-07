import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { selectMove } from '../actions/index'

class MoveWindow extends Component {
  renderMoves() {
    return this.props.red.pokemon[0].moves.map((move) => {
      return (
        <div
          key={move.name}
          className='button'
          onClick={() => this.props.selectMove(move)}>
          {move.title}
        </div>
      )
    })
  }

  render() {
    return (
      <div className='window fight'>
        {this.renderMoves()}
        <div className='button back'>cancel</div>
        <div className='window fight-details'>
          <span className='type-header'>TYPE/</span>
          <span className='type'>NORMAL</span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    moves: state.moves
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectMove }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveWindow)
