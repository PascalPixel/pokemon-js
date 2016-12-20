import React from 'react'

const Sprite = (props) => {
  const name = props.name
  const currentTrainer = props.currentTrainer

  let side
  if (currentTrainer) {
    side = 'back'
  } else {
    side = 'front'
  }

  return <img src={`../img/${name}_${side}.svg`} />
}

export default Sprite
