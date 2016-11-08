import React, { Component } from 'react'

export default class Move extends Component {
  render() {
    return (
      <div>
        {this.props.move.name}
        <br/>
        PP: {this.props.move.ppCurrent} / {this.props.move.pp}
        <br/>
        Type:
        {this.props.move.types.map((type) => {
          return (
            <div key={type}>{type}</div>
          )})}
        <br/>
      </div>
    )
  }
}
