import {ALLOWED_MOVES} from '../actions/games'


const allowedMoves = (state=state, action={}) => {
  switch (action.type) {
    case ALLOWED_MOVES:
    return {allowedmoves: action.payload}
    default:
      return state
  }
}

export default allowedMoves