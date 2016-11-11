export default (state = null, action) => {
  switch(action.type) {
    case 'PICK_CHARACTER':
      return action.payload
  }

  return state
}
