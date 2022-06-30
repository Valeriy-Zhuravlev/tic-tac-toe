import React from "react";
import { Board } from "./Board";
import Sorter from "./Sorter";
import GameInfo from "./GameInfo";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          currentPosition: {col: 0, row: 0, sqrPos: null},
          winningSequence: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      sortBy: 'ascending',
      selectedSqr: null,
    }
    this.sort = this.sort.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const {winner, winningSequence} = this.calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    const colRow = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    let col;
    let row;

    for (let rowIndex = 0; rowIndex < colRow.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < colRow[rowIndex].length; columnIndex++) {
        if (i === colRow[rowIndex][columnIndex]) {
          col = columnIndex + 1;
          row = rowIndex + 1;
        }
      }
    }

    this.setState({
      history: history.concat([{
        squares: squares,
        currentPosition: {
          col: col, 
          row: row,
          sqrPos: i,
        },
        winningSequence: winningSequence,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      selectedSqr: null,
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === 
          squares[c]) {
            return {
              winner: squares[a],
              winningSequence: [a, b, c],
            }
            
      }
    }
    return {
      winner: null,
      winningSequence: null,
    };
  }

  jumpTo(step) {
    const history = this.state.history;
    const current = history[step];
    const currentSqrPos = current.currentPosition.sqrPos;

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      selectedSqr: currentSqrPos,
    });
  }

  sort(newSortBy) {
    this.setState({
      sortBy: newSortBy,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const {winner, winningSequence} = this.calculateWinner(current.squares);
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            selectedSqr={this.state.selectedSqr}
            winningSequence={winningSequence}
            winner={winner}
          />
        </div>
        <GameInfo
          history={history}
          current={current}
          winner={winner}
          sortBy={this.state.sortBy}
          xIsNext={this.state.xIsNext}
          jumpTo={this.jumpTo}
        >
          <Sorter
            value={this.state.sortBy}
            onChange={this.sort}
            options={[
              {value: 'ascending', name: 'Ascending'},
              {value: 'descending', name: 'Descending'},
            ]}>
            </Sorter>
        </GameInfo>
      </div>
    );
  }
}