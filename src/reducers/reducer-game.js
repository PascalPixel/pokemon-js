export default (state = null, action) => {
  switch(action.type) {
    case 'MOVE_SELECTED':
      return action.payload
  }

  return state
}
