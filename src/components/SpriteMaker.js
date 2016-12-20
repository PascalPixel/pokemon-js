import React from 'react'
import images from '../data/images'

const colors = ['#242803', '#4D5607', '#7A8718']

const SpriteMaker = (props) => {
  return (
    <svg
      viewBox={props.currentTrainer ? '0 0 28 28' : '0 0 56 56'}
      xmlns='http://www.w3.org/2000/svg'>
      <title>{props.name}_{props.currentTrainer}</title>
      <g
        fill='none'
        fillRule='evenodd'>
        {colors.map((color, index) => {
          return (
            <path
              d={images[props.name][props.currentTrainer][index]}
              fill={color} />
          )
        })}
      </g>
    </svg>
  )
}

export default SpriteMaker
