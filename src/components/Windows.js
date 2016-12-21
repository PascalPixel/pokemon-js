import React from 'react'
import WindowMessages from './WindowMessages'
import WindowMenu from './WindowMenu'
import WindowFight from './WindowFight'
import WindowItems from './WindowItems'
import WindowPokemon from './WindowPokemon'

const Windows = (props) => {
  const moves = props.trainer.pokemon[props.trainer.activePokemon].moves

  return (
    <div className='layer windows'>
      <WindowMessages
        visibility={props.frames.messages}
        lines={props.lines} />
      <WindowMenu
        visibility={props.frames.menu}

        // Actions
        reframe={props.reframe}
        run={props.run} />
      <WindowFight
        visibility={props.frames.fight}
        moves={moves}

        // Actions
        reframe={props.reframe}
        attack={props.attack} />
      <WindowItems
        visibility={props.frames.items}
        items={props.trainer.items}

        // Actions
        reframe={props.reframe}
        use={props.use} />
      <WindowPokemon
        visibility={props.frames.pokemon}
        pokemon={props.trainer.pokemon}

        // Actions
        reframe={props.reframe}
        change={props.change} />
    </div>
  )
}

export default Windows
