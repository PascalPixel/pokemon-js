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
    ],
    items: [
      {
        name: 'Potion',
        type: 'healing',
        amount: 20
      },
      {
        name: 'Super Potion',
        type: 'healing',
        amount: 50
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
    ],
    items: [
      {
        name: 'Potion',
        type: 'healing',
        amount: 20
      },
      {
        name: 'Super Potion',
        type: 'healing',
        amount: 50
      }
    ]
  }
}

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ATTACK': return {
      damageCalc(mon, damage) {
        if (mon.active) {
          let newHp = mon.hp_current -= damage
          if (newHp <= 0) {
            newHp = 0
          }
          return {
            ...mon, hp_current: newHp
          }
        }
        return mon
      },

      // Attack on foe
      ...state, foe: {
        ...state.foe, pokemon: state.foe.pokemon.map((mon) => {
          damageCalc(mon, action.payload)
        })
      },

      // Return attack
      ...state, player: {
        ...state.player, pokemon: state.player.pokemon.map((mon) => {
          damageCalc(mon, action.payload)
        })
      }
    }
    default: return state
  }
}
