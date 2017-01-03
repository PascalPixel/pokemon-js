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
  lines: null,

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
          hpCurrent: 15,
          hpBase: 15,
          weight: 60,
          height: 4,
          fainted: false,
          active: true,
          moves: [
            {
              name: 'tackle',
              category: 'offensive',
              types: ['normal'],
              id: 88,
              pp: 30,
              accuracy: 100,
              power: 40
            },
            {
              name: 'tail whip',
              category: 'defensive',
              types: ['normal'],
              id: 87,
              pp: 30,
              accuracy: 100,
              power: 0
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
          hpCurrent: 13,
          hpBase: 13,
          weight: 60,
          height: 4,
          fainted: false,
          active: true,
          moves: [
            {
              name: 'thundershock',
              category: 'offensive',
              types: ['electric'],
              id: 84,
              pp: 30,
              accuracy: 100,
              power: 40
            },
            {
              name: 'tail whip',
              category: 'defensive',
              types: ['normal'],
              id: 85,
              pp: 30,
              accuracy: 100,
              power: 0
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
  ]
}

export default STORE
