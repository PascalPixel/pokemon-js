export function pickCharacter(character) {
  return {
    type: 'PICK_CHARACTER',
    payload: character
  }
}

export function pickPokemon(pokemon) {
  return {
    type: 'PICK_POKEMON',
    payload: pokemon
  }
}
