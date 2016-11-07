import React, { Component } from 'react'

export default class Blue extends Component {
  render() {
    return (
      <div className='layer foe'>
        <div className='info'>
          <div className='balls'>
            <img src='img/blue_balls.svg'/>
          </div>
          <div className='stats'>
            <div className='name'></div>
            <div className='level-wrap'>
              <img src='img/level.svg'/>
              <span className='level'></span>
            </div>
            <div className='hp-wrap'>
              <img src='img/hp.svg'/>
              <div className='hp-bar'>
                <div className='hp-bar-active'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='images'>
          <div className='trainer'>
            <img src='img/blue_front.svg'/>
          </div>
          <div className='pokemon'>
            <img src='img/eevee_front.svg'/>
          </div>
        </div>
      </div>
    )
  }
}
