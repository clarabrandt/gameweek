import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css'

class Board extends Component {
  render() {
    return (
      this.props.board.map((row, rowIndex) =>
        <div className= 'row' key={rowIndex}>
          { row.map((cell, cellIndex) => 
            <Cell key={`${rowIndex}-${cellIndex}`} rowIndex={rowIndex} cellIndex={cellIndex} makeMove={this.props.makeMove}/>
          )}
        </div>
      )
    )
  }
}

export default Board


//<img src="https://harmmade.com/vectorracer/tracks/oval.png"></img>