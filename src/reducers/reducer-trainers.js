export default (state, action) => {
  return [
    {
      name: 'green',
      pokemon: [
        {
          name: 'eevee',
          pokedex: 133,
          level: 5,
          basehp: 15,
          moves: [
            {
              name: 'tackle',
              category: 'offensive',
              types: ['normal'],
              basedamage: 40
            },
            {
              name: 'tail whip',
              category: 'defensive',
              types: ['normal'],
              basedamage: 0
            }
          ]
        }
      ]
    },
    {
      name: 'red',
      pokemon: [
        {
          name: 'pikachu',
          pokedex: 25,
          level: 4,
          basehp: 13,
          moves: [
            {
              name: 'tackle',
              category: 'offensive',
              types: ['normal'],
              basedamage: 40
            },
            {
              name: 'tail whip',
              category: 'defensive',
              types: ['normal'],
              basedamage: 0
            }
          ]
        }
      ]
    }
  ]
}
