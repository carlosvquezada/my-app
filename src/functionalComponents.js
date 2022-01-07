import { render } from '@testing-library/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square({value, onClick}) {
  return (
    <button className='square'  onClick={onClick}>
      {value}
    </button>
  );
}


function Game(){
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ isXNext, setIsXNext ] = useState(true);
  const winner = calculateWinner(squares);
  const [ history, setHistory ] = useState();
  const [ current, setCurrent ] = useState();





  function renderSquare(i) {
    return <Square 
      value={squares[i]}
      onClick={() => {
        const nextSquares = squares.slice();
        nextSquares[i] = isXNext ? "X" : "O";
        setSquares(nextSquares);
        setIsXNext(!isXNext);
      }}
    />;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>

          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>

          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </div>
    </div>
    );
}



ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}