import {PLAYER_MOVE} from '../actions/games'
import {OPPONTENT_MOVE} from '../actions/games'


const initialState = {
  allowedMoves: [],
  pastMovesPlayer: [{position: {x : 5, y: 5},
    vector: {x: 0, y: 0}}],
  pastMovesOpponent: [{position: {x : 6, y: 5},
    vector: {x: 0, y: 0}}],
  
};


const moves = (state=initialState, action={}) => {
  switch (action.type) {
    case OPPONTENT_MOVE:
    return {...state,
      pastMovesOpponent: [...state.pastMovesOpponent, {...payload.move}] ,
      allowedMoves: [...payload.allowedMoves] 
    }

    case PLAYER_MOVE:
    return {...state, pastMovesPlayer: {
      position: action.payload,
      vector: {x: action.payload.x - state.x,
      y: action.payload.y - state.y}
    }}
    default:
      return state
  }
}

export default moves