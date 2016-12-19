export function attack (move, foe) {
  let newHp = 0
  foe.pokemon.map((mon) => {
    if (mon.active) {
      newHp = mon.hp_current -= move.damage
      if (newHp <= 0) {
        newHp = 0
      }
    }
  })

  return {type: 'ATTACK', payload: newHp}
}
