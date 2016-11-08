import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectMove }         from '../actions/index'
import Move                   from '../components/move'

class MoveList extends Component {
  renderMoves() {
    return this.props.moves.map((move) => {
      return (
        <div key={move.name}
             onClick={() => this.props.selectMove(move)}>
          <Move move={move} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className='window fight'>
        {this.renderMoves()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectMove }, dispatch)
}

export default connect(null, mapDispatchToProps)(MoveList)
