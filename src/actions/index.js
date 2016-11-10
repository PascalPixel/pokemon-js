export function attackFoe(damage) {
  return {
    type: 'ATTACK_FOE',
    payload: damage
  }
}
