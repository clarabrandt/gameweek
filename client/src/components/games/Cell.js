import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

  // renderCel(makeMove, rowIndex, cellIndex, symbol, hasTurn) {
  //   return (
  //     <button
  //       className="board-tile"
  //       disabled={hasTurn}
  //       onClick={() => makeMove(rowIndex, cellIndex)}
  //       key={`${rowIndex}-${cellIndex}`}
  //     >{symbol || '-'}</button>
  //   )
  // }

  render() {
    const {rowIndex, cellIndex} = this.props;
    return (
      
      <button class='button'
        onClick={() => this.props.makeMove(rowIndex, cellIndex)}
      >  </button>
      
    )
  }
}

export default Cell
