import React, { Component }   from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { selectMove }         from '../actions/index'

class MoveList extends Component {
  renderMoves(moves) {
    return this.props.moves.map((move) => {
      return (
        <li
          key={move.name}
          className='button'
          onClick={() => this.props.selectMove(move)}>{move.name}
        </li>
      )
    })
  }

  render() {
    return (
      <div className='window fight'>
        <ul>
          {this.renderMoves()}
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(MoveList)
