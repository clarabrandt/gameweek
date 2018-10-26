import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    const { rowIndex, cellIndex } = this.props;

    let playerPresence = "";

    if (
      Object.values(this.props.game.pastPositionsPlayer1).find(
        position => position.x === rowIndex && position.y === cellIndex
      )
    )
      playerPresence = "x";

    if (
      Object.values(this.props.game.pastPositionsPlayer2).find(
        position => position.x === rowIndex && position.y === cellIndex
      )
    )
      playerPresence = "o";

    if (
      Object.values(this.props.game.pastPositionsPlayer1).find(
        position => position.x === rowIndex && position.y === cellIndex
      ) &&
      Object.values(this.props.game.pastPositionsPlayer2).find(
        position => position.x === rowIndex && position.y === cellIndex
      )
    )
      playerPresence = "B";

    if (!this.props.game.board[rowIndex][cellIndex].isOnTrack)
      return <div className="cell off-track"> </div>;

    if (
      this.props.game.allowedMoves.find(
        move => move.x === rowIndex && move.y === cellIndex
      )
    )
      return (
        <div
          className={`cell button-active ${playerPresence}`}
          onClick={() => this.props.makeMove(rowIndex, cellIndex)}
        >
          {playerPresence}
        </div>
      );

    if (
      rowIndex === 6 &&
      (cellIndex === 1 || cellIndex === 2 || cellIndex === 3 || cellIndex === 4)
    )
      return (
        <div className={`cell start-finish ${playerPresence}`}>
          {playerPresence}
        </div>
      );

    return <div className={`cell ${playerPresence}`}>{playerPresence}</div>;
  }
}

export default Cell;
