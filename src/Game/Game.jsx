import React from "react";
import { Board } from "./Board";
import Sorter from "./Sorter";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          currentPosition: {col: 0, row: 0,},
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      sortBy: 'ascending',
    }
    this.sort = this.sort.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    //
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

    // 

    this.setState({
      history: history.concat([{
        squares: squares,
        currentPosition: {col: col, row: row,},
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  sort(newSortBy) {
    // console.log(newSortBy);
    // console.log(this);
    this.setState({
      sortBy: newSortBy,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const sortBy = this.state.sortBy;

    const moves = history.map((step, move) => {
      const {col, row} = step.currentPosition;

      const desc = move ? 
        'Go to move #' + move + ` (col:${col}, row:${row})` :
        'Go to game start';      
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    if (sortBy === 'descending') {
      moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Winner is: ' + winner;
    } else if (isDraw(current.squares)) {
      status = 'In a draw';
    } else {
      status = 'Next step: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className='status'>
            {status}
          </div>
          <Sorter
            value={this.state.sortBy}
            onChange={this.sort}
            options={[
              {value: 'ascending', name: 'Ascending'},
              {value: 'descending', name: 'Descending'},
            ]}
          ></Sorter>
          <ul style={{listStyleType: 'none'}}>{moves}</ul>
        </div>
      </div>
    );
  }
}

function isDraw(table) {
  return !table.includes(null);
}

function calculateWinner(squares) {
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
          return squares[a];
    }
  }
  return null;
}