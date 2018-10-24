import { MOVE_PLAYER } from "../actions/games";
import { OPPONENT_MOVE } from "../actions/games";

const initialState = {
  allowedMoves: [],
  pastMovesPlayer: [
    {
      position: { x: 5, y: 5 },
      vector: { x: 0, y: 0 }
    }
  ],
  pastMovesOpponent: [
    {
      position: { x: 6, y: 5 },
      vector: { x: 0, y: 0 }
    }
  ]
};

const moves = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPPONENT_MOVE:
      const vectorOpponent = {
        x:
          action.payload.position.x -
          state.pastMovesOpponent[state.pastMovesOpponent.length - 1].position
            .x,
        y:
          action.payload.position.y -
          state.pastMovesOpponent[state.pastMovesOpponent.length - 1].position.y
      };

      return {
        ...state,
        pastMovesOpponent: [
          ...state.pastMovesOpponent,
          {
            position: { ...action.payload.position },
            vector: vectorOpponent
          }
        ],
        allowedMoves: [...action.payload.allowedMoves]
      };

    case MOVE_PLAYER:
      const vectorPlayer = {
        x:
          action.payload.x -
          state.pastMovesPlayer[state.pastMovesPlayer.length - 1].position.x,
        y:
          action.payload.y -
          state.pastMovesPlayer[state.pastMovesPlayer.length - 1].position.y
      };

      return {
        ...state,
        pastMovesPlayer: [
          ...state.pastMovesPlayer,
          {
            position: action.payload,
            vector: {
              vectorPlayer
            }
          }
        ]
      };
    default:
      return state;
  }
};

export default moves;
