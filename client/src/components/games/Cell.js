import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    const { rowIndex, cellIndex } = this.props;
    
    if(!this.props.game.board[rowIndex][cellIndex].isOnTrack)
    return <div className="button off-track">  </div>;

    if (
      this.props.game.allowedMoves.find(
        move => move.x === rowIndex && move.y === cellIndex
      )
    )
      return (
        <div 
          className= "button button-active"
          onClick={() => this.props.makeMove(rowIndex, cellIndex)}
        >
       
        </div>
        
      );
    return <div className="button">  </div>;
  }
}

export default Cell;
