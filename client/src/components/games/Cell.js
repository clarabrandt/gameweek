import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    const { rowIndex, cellIndex } = this.props;
    
    const arrow = this.props.createArrow(5, 8, 5, 6)

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
        <div
        className='arrow' style={arrow}>
        console.table(arrow)
        </div>
        </div>
        
      );
    return <div className="button">  </div>;
  }
}

export default Cell;
