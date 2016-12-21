import React from 'react'
import images from '../data/images'

let Sprite = (props) => {
  let image = images[props.name][props.currentTrainer]
  let width = image[0].length
  let height = image.length

  let pixels = []
  for (let l = 0; l < height; l++) {
    for (let p = 0; p < width; p++) {
      let color
      switch (image[l][p]) {
        case '█':
          color = '#242803'
          break
        case '▓':
          color = '#4D5607'
          break
        case '▒':
          color = '#7A8718'
          break
        case ' ':
          color = null
          break
        default:
          color = '#FF0000'
      }
      color ? pixels.push(<rect key={l + '-' + p} x={p} y={l} width={1} height={1} fill={color} />) : null
    }
  }

  return (
    <svg
      viewBox={`0 0 ${height} ${width}`}
      xmlns='http://www.w3.org/2000/svg'
      className={props.name + '_' + props.currentTrainer}>
      {pixels}
    </svg>
  )
}

export default Sprite
