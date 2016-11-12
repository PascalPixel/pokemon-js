export default (state = null, action) => {
  switch(action.type) {
    case 'PICK_POKEMON':
      return action.payload
  }

  return state
}
