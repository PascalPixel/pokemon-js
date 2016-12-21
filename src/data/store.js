const STORE = {
  // Visibility of frames
  frames: {
    menu: true,
    fight: false,
    items: false,
    pokemon: false,
    messages: true
  },

  // Text output
  lines: {
    top: null,
    bottom: null
  },

  // Get trainer from database based on id
  allot: {
    left: 1, // Left trainer is...
    right: 0 // Right trainer is...
  },

  // Trainers
  trainers: [
    {
      name: 'blue',
      activePokemon: 0,
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
        }, {
          name: 'Super Potion',
          type: 'healing',
          amount: 50
        }
      ]
    },
    {
      name: 'red',
      activePokemon: 0,
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
        }, {
          name: 'Super Potion',
          type: 'healing',
          amount: 50
        }
      ]
    }
  ]
}

export default STORE
