export default (state = 187, action) => {
  if (state - action.payload <= 0) {
      return 0
  } else {
    switch(action.type) {
      case 'ATTACK_FOE':
        return state - action.payload
    }
  }

  return state
}
