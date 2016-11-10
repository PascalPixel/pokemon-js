export function attack(damage) {
  return {
    type: 'ATTACK',
    payload: damage
  }
}
