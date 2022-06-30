import React from 'react';
import Sorter from './Sorter';

const GameInfo = ({history, current, winner, 
  jumpTo, sortBy, xIsNext, children}) => {

  const moves = history.map((step, move) => {
    const {col, row} = step.currentPosition;

    const desc = move ? 
      'Go to move #' + move + ` (col:${col}, row:${row})` :
      'Go to game start';      
    return (
      <li key={move} className='moves__item'>
        <button 
          onClick={() => jumpTo(move)}
          className='moves__btn'
        >
          {desc}
        </button>
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
    status = 'Next step: ' + (xIsNext ? 'X' : 'O');
  }

  function isDraw(squares) {
    return !squares.includes(null);
  }

  return (
    <div className="game-info">
      <div className='status'>
        {status}
      </div>
      {children}
      <ul className='moves' style={{listStyleType: 'none'}}>{moves}</ul>
    </div>
  )
}

export default GameInfo;