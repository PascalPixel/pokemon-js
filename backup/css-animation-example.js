import React, { Component } from 'react'

export default class Red extends Component {
  constructor() {
    super()
    this.state = {attacking: false}

    this.onAttack = this.onAttack.bind(this)
  }

  onAttack() {
    this.setState({attacking: true})
    setTimeout(() => {
      const {playerId, move} = this.props

      this.setState({attacking: false})
      dispatch(attackOpponent(playerId, move))
    }, 1200)
  }

  render() {
    const {attacking} = this.state;

    return (
      <div className='player'>
        <div className={'pokemon ' + (attacking ? 'pokemon--attacking' : '')}>
          test
        </div>
      </div>
    )
  }
}
