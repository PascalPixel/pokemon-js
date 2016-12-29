import React from 'react'

const WindowMenu = (props) => {
  if (props.visibility) {
    return (
      <div className='window menu'>
        <span
          className='button'
          onClick={() => props.reframe({ fight: true })}>
          FIGHT
        </span>
        <span
          className='button'
          onClick={() => props.reframe({ pokemon: true })}>
          PKMN
        </span>
        <br />
        <span
          className='button'
          onClick={() => props.reframe({ items: true })}>
          ITEM
        </span>
        <span
          className='button'
          onClick={() => props.run()}>
          RUN
        </span>
      </div>
    )
  } else {
    return null
  }
}

export default WindowMenu
