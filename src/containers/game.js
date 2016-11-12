// React & Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Styling
require('../../style/main.sass')

// Main Game component
class Game extends Component {
  renderTrainers(trainers) {
    return trainers.map((trainer) => {
      return (
        <div className='col-xs-4 text-xs-center'
             key={`trainer-${trainer.name}`}>
          <img src={`../img/${trainer.name}_front.svg`} />
          <br/>
          <br/>
          {trainer.name.toUpperCase()}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderTrainers(this.props.trainers)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    trainers: state.trainers
  }
}

export default connect(mapStateToProps)(Game)
