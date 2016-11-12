const INITIAL_STATE = {
  foe: {
    name: 'green',
    pokemon: [
      {
        name: 'eevee',
        pokedex: 133,
        level: 5,
        hp_current: 15,
        hp_base: 15,
        fainted: false,
        active: true,
        moves: [
          {
            name: 'tackle',
            category: 'offensive',
            types: ['normal'],
            damage: 4
          }, {
            name: 'tail whip',
            category: 'defensive',
            types: ['normal'],
            damage: 1
          }
        ]
      }
    ]
  },
  player: {
    name: 'red',
    pokemon: [
      {
        name: 'pikachu',
        pokedex: 25,
        level: 4,
        hp_current: 13,
        hp_base: 13,
        fainted: false,
        active: true,
        moves: [
          {
            name: 'thundershock',
            category: 'offensive',
            types: ['electric'],
            damage: 4
          }, {
            name: 'tail whip',
            category: 'defensive',
            types: ['normal'],
            damage: 1
          }
        ]
      }
    ]
  }
}

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ATTACK': return {
      ...state, foe: {
        ...state.foe, pokemon: state.foe.pokemon.map((mon) => {
          if (mon.active) {
            return {
              ...mon, hp_current: mon.hp_current -= action.payload
            }
          }
          return mon
        })
      }
    }
    default: return state
  }
}
