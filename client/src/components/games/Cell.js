import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

  render() {
    const {rowIndex, cellIndex} = this.props;
    return (
      <button
        onClick={() => this.props.makeMove(rowIndex, cellIndex)}
      > {`-`} </button>
    )
  }
}

export default Cell
