import React, { Component }   from 'react'

export default class MoveList extends Component {
  renderMoves() {
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
