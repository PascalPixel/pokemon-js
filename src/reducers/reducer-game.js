export default (state = null, action) => {
  switch(action.type) {
    case 'ATTACK':
      return state + action.payload
  }

  return state
}
