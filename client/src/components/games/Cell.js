import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    const { rowIndex, cellIndex } = this.props;

    if (
      this.props.game.allowedMoves.find(
        move => move.x === rowIndex && move.y === cellIndex
      )
    )
      return (
        <button
          class="button"
          onClick={() => this.props.makeMove(rowIndex, cellIndex)}
        >
          X
        </button>
      );
    return <button class="button"> O </button>;
  }
}

export default Cell;
