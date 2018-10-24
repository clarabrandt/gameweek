import {MOVE_PLAYER} from '../actions/games'
import {OPPONENT_MOVE} from '../actions/games'


const initialState = {
  allowedMoves: [],
  pastMovesPlayer: [{
    position: {x : 5, y: 5},
    vector: {x: 0, y: 0}
  }],
  pastMovesOpponent: [{
    position: {x : 6, y: 5},
    vector: {x: 0, y: 0}
  }],
};


const moves = (state=initialState, action={}) => {
  switch (action.type) {
    case OPPONENT_MOVE:
    return {...state,
      pastMovesOpponent: [...state.pastMovesOpponent, {...action.payload.move}] ,
      allowedMoves: [...action.payload.allowedMoves] 
    }

    case MOVE_PLAYER:
    return {
      ...state, 
      pastMovesPlayer: [
        ...state.pastMovesPlayer,
        {
          position: action.payload,
          vector: {
            x: action.payload.x - state.pastMovesPlayer[state.pastMovesPlayer.length-1].position.x,
            y: action.payload.y - state.pastMovesPlayer[state.pastMovesPlayer.length-1].position.y
          }
        }
      ]
    }
    default:
      return state
  }
}

export default moves