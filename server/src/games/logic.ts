import { Position } from "./entities";

export const getAllowedMoves = (positionLast: Position, positionLastMinusOne: Position) => {
  const vector = {
    x: positionLast.x - positionLastMinusOne.x,
    y: positionLast.y - positionLastMinusOne.y,
  }

  const noDelta: Position = {
    x: positionLast.x + vector.x,
    y: positionLast.y + vector.y
  };

  const allowedMoves: Position[] = [
    {
      x: noDelta.x - 1,
      y: noDelta.y - 1
    },
    {
      x: noDelta.x,
      y: noDelta.y - 1
    },
    {
      x: noDelta.x + 1,
      y: noDelta.y - 1
    },
    {
      x: noDelta.x - 1,
      y: noDelta.y
    },
    noDelta,
    {
      x: noDelta.x + 1,
      y: noDelta.y
    },
    {
      x: noDelta.x - 1,
      y: noDelta.y + 1
    },
    {
      x: noDelta.x,
      y: noDelta.y + 1
    },
    {
      x: noDelta.x + 1,
      y: noDelta.y + 1
    }
  ];
  console.log(allowedMoves)
  return allowedMoves;
};

export const calculateWinner = (board, allowedMoves, turn, pastPositions1, pastPositions2) => {

    let countAllowedMoves = 0;

  for(let i=0;i<allowedMoves.length;i++) { 
    if(board[allowedMoves[i].x][allowedMoves[i].y].isOnTrack) countAllowedMoves++
  }
  if(countAllowedMoves === 0) return  (turn);

  if(pastPositions1.find(position => position.y > 63) && pastPositions1[pastPositions1.length-1].y < 10 && pastPositions1[pastPositions1.length-1].x >= 6) return "x"

  if(pastPositions2.find(position => position.y > 63) && pastPositions2[pastPositions2.length-1].y < 10 && pastPositions2[pastPositions2.length-1].x >= 6) return "o"


  return null;
}