import React from "react";
import { Square } from "./Square";

  export const Board = (props) => {

    function renderSquare(i) {
      const isSelectedSqr = props.selectedSqr === i;

      let colorWinner = null;
      if (props.winner) {
        if (props.winningSequence.includes(i)) {
          colorWinner = '#00FFF3';
        }
      }

      return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
          isSelectedSqr={isSelectedSqr}
          colorWinner={colorWinner}
          winner={props.winner}
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