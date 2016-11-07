import React, { Component }   from 'react'

export default class MoveList extends Component {
  renderMoves() {
    return this.props.moves.map((move) => {
      return (
        <div
          key={move.name}
          className='button'
          onClick={() => this.props.selectMove(move)}>
            {move.name}
            <br/>
            PP: {move.ppCurrent} / {move.pp}
            <br/>
            Type:
            {move.types.map((type) => {
              return (
                <div key={type}>{type}</div>
              )})}
            <br/>
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
