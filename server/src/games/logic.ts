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