import React from 'react'
import images from '../data/images'

const colors = [
  [' ', '#242803'],
  ['░', '#4D5607'],
  ['▒', '#7A8718'],
  ['▓', 'transparent']
]

let Sprite = (props) => {
  let image = images[props.name][props.currentTrainer]
  let length = image[0].length

  let lines = []
  for (let l = 0; l < length; l++) {
    let pixels = []
    for (let p = 0; p < length; p++) {
      let color
      switch (image[l][p]) {
        case colors[0][0]:
          color = colors[0][1]
          break
        case colors[1][0]:
          color = colors[1][1]
          break
        case colors[2][0]:
          color = colors[2][1]
          break
        case colors[3][0]:
          color = colors[3][1]
          break
        default:
          color = '#FF0000'
      }
      pixels.push(<rect key={p + l} x={p} y={l} width={1} height={1} fill={color} />)
    }
    lines.push(<g key={l}>{pixels}</g>)
  }

  return (
    <svg
      viewBox={`0 0 ${length} ${length}`}
      xmlns='http://www.w3.org/2000/svg'>
      <title>{props.name}_{props.currentTrainer}</title>
      {lines}
    </svg>
  )
}

export default Sprite
