import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { selectMove } from '../actions'

class MoveList extends Component {
  renderMoves() {
    return this.props.moves.map((move) => {
      return (
        <li
          key={`move-${move.key}`}
          className='list-group-item'
          onClick={() => this.props.selectMove(move)}>
          {move.name}
        </li>
      )
    })
  }

  render() {
    return (
      <ul className='list-group'>
        {this.renderMoves()}
      </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(MoveList)
