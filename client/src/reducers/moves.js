import {MOVE_PLAYER} from '../actions/games'

const initialState = [{
  position: {x : 5, y: 5},
  vector: {x: 0, y: 0},
}];


const moves = (state=initialState, action={}) => {
  switch (action.type) {
    case MOVE_PLAYER:
    return [...state, {
      position: action.payload,
      vector: {x: action.payload.x - state.x,
      y: action.payload.y - state.y}
    }]
    default:
      return state
  }
}

export default moves