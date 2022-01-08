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


// const history = this.state.
//     const current = history[history.length -1];
    


function Game(){
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ isXNext, setIsXNext ] = useState(true);
  const [ history, setHistory ] = useState(); //useState( history.slice(0, this.state.stepNumber + 1));
  const [ stepNumber, setStepNumber ] = useState(0);
  const [ current, setCurrent ] = useState();
  
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move)=> {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => this.To(move)}>{desc}</button>
      </li>
    );
  });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }



  function renderSquare(i) {
    return <Square 
      value={squares[i]}
      onClick={() => {
        const nextSquares = squares.slice();
        nextSquares[i] = isXNext ? "X" : "O";
        setSquares(nextSquares);
        setStepNumber(stepNumber + 1);
        setHistory(history.slice(0, stepNumber + 1));
        setIsXNext(!isXNext);
        setCurrent(history[history.length -1]);
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

      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
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
