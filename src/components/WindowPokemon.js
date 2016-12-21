import React from 'react'

const WindowPokemon = (props) => {
  if (props.visibility) {
    return (
      <div className='window pkmn'>
        {props.pokemon.map((mon) => {
          return (
            <div
              key={mon.name}
              className='button playerPokemonButton'
              onClick={() => {
                props.change(mon)
                props.reframe({ pokemon: false })
              }}>
              <span className='playerpokemonname'>
                {mon.name.toUpperCase()}
              </span>
            </div>
          )
        })}
        <div
          className='button'
          onClick={() => props.reframe({ pokemon: false })}>
          cancel
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default WindowPokemon
