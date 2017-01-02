import React from 'react'

const WindowFight = (props) => {
  if (props.visibility) {
    return (
      <div className='window fight'>
        {props.moves.map((move) => {
          return (
            <div
              className='button'
              key={`move-${move.name}`}
              onClick={() => { props.attack(move) }}>
              {move.name.toUpperCase()}
              <div className='window fight-details'>
                <span className='type-header'>
                  TYPE/
                </span>
                <br />
                {move.types.map((type) => {
                  return (
                    <span
                      key={type}
                      className='type'>
                      {type}
                      <br />
                    </span>
                  )
                })}
              </div>
              <br />
            </div>
          )
        })}
        <div
          className='button'
          onClick={() => props.reframe({ fight: false })}>
          cancel
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default WindowFight
