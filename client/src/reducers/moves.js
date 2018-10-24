import { MOVE_PLAYER1, MOVE_PLAYER2 } from "../actions/games";
import { PLAYER1MOVE, PLAYER2MOVE } from "../actions/games";

const initialState = {
  allowedMoves: [],
  pastMovesPlayer1: [
    {
      position: { x: 5, y: 5 },
      vector: { x: 0, y: 0 }
    }
  ],
  pastMovesPlayer2: [
    {
      position: { x: 5, y: 5 },
      vector: { x: 0, y: 0 }
    }
  ]
};

const moves = (state = initialState, action = {}) => {
  switch (action.type) {
    case PLAYER1MOVE:
      const vector1 = {
        x:
          action.payload.position.x -
          state.pastMovesPlayer1[state.pastMovesPlayer1.length - 1].position.x,
        y:
          action.payload.position.y -
          state.pastMovesPlayer1[state.pastMovesPlayer1.length - 1].position.y
      };
      return {
        ...state,
        pastMovesPlayer1: [
          ...state.pastMovesPlayer1,
          {
            position: { ...action.payload.position },
            vector: vector1
          }
        ],
        allowedMoves: [...action.payload.allowedMoves]
      };

    case PLAYER2MOVE:
      const vector2 = {
        x:
          action.payload.position.x -
          state.pastMovesPlayer2[state.pastMovesPlayer2.length - 1].position.x,
        y:
          action.payload.position.y -
          state.pastMovesPlayer2[state.pastMovesPlayer2.length - 1].position.y
      };

      return {
        ...state,
        pastMovesPlayer2: [
          ...state.pastMovesPlayer2,
          {
            position: { ...action.payload.position },
            vector: vector2
          }
        ],
        allowedMoves: [...action.payload.allowedMoves]
      };

    case MOVE_PLAYER1:
      const vectorMovePLayer1 = {
        x:
          action.payload.x -
          state.pastMovesPlayer1[state.pastMovesPlayer1.length - 1].position.x,
        y:
          action.payload.y -
          state.pastMovesPlayer1[state.pastMovesPlayer1.length - 1].position.y
      };

      return {
        ...state,
        pastMovesPlayer1: [
          ...state.pastMovesPlayer1,
          {
            position: action.payload,
            vector: vectorMovePLayer1
          }
        ]
      };

    case MOVE_PLAYER2:
      const vectorMovePlayer2 = {
        x:
          action.payload.x -
          state.pastMovesPlayer2[state.pastMovesPlayer2.length - 1].position.x,
        y:
          action.payload.y -
          state.pastMovesPlayer2[state.pastMovesPlayer2.length - 1].position.y
      };

      return {
        ...state,
        pastMovesPlayer2: [
          ...state.pastMovesPlayer2,
          {
            position: action.payload,
            vector: vectorMovePlayer2
          }
        ]
      };

    default:
      return state;
  }
};

export default moves;
