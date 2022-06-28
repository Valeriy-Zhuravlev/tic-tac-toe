import React from "react";
import { Square } from "./Square";

  export const Board = (props) => {

    function renderSquare(i) {
      return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
        />
      );
    }

    function renderBoard(rows, cells) {
      return [...Array(rows).keys()].map(row => (
        <div className="board-row" key={row}>
            {[...Array(cells).keys()].map(cell => renderSquare(row * cells + cell))}
        </div>
      ))
    }
  
    return (
      <div>
        {renderBoard(3, 3)}
      </div>
    );
  }