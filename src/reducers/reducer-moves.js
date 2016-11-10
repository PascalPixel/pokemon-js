export default (state, action) => {
  return [
    {
      key: 1,
      name: 'Tackle',
      effect: 'damage',
      damage: 20,
      types: [1],
      pp: 5
    },
    {
      key: 2,
      name: 'Thundershock',
      effect: 'damage',
      damage: 20,
      types: [2],
      pp: 5
    },
    {
      key: 3,
      name: 'Growl',
      effect: 'lower_attack',
      damage: 1,
      types: [1],
      pp: 5
    },
    {
      key: 4,
      name: 'Tail Whip',
      effect: 'lower_defense',
      damage: 1,
      types: [1],
      pp: 5
    }
  ]
}
