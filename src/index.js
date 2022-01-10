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



function RenderSquare({squareIndex, setSquares, setStepNumber, setIsXNext, setCurrent, setHistory, squares, history, isXNext, stepNumber}) {
  console.log(JSON.stringify(squares));
  return <Square 
    value={squares[squareIndex]}
    onClick={() => {
      const nextSquares = squares.slice();
      nextSquares[squareIndex] = isXNext ? "X" : "O";
      setSquares(nextSquares);
      setStepNumber(stepNumber + 1);
      const addHistory = [...history, nextSquares];
      setHistory( addHistory);
      setIsXNext(!isXNext);
      // setCurrent(history[history.length -1]);
    }}
  />;
}



function Moves ( props ) {
  const {history, jumpTo } = props;
  console.log('props',props);
  return <ol>{
    history.map((step, move)=> {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
    
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  })}
  </ol>;
}



// const history = this.state.
//     const current = history[history.length -1];
    


function Game(){
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ isXNext, setIsXNext ] = useState(true);
  const [ history, setHistory ] = useState([squares]);
  const [ stepNumber, setStepNumber ] = useState(0);
  const [ current, setCurrent ] = useState();
  
  const winner = calculateWinner(squares);
  const status = getStatus();
  //debugger;


  function getStatus(){
    if (winner) {
      return 'Winner: ' + winner;
    } else {
      return 'Next player: ' + isXNext ? 'X' : 'O';
    }
  }


  function jumpTo(step) {
    setStepNumber(step);
    setSquares(history[step]);
    setHistory(history.slice(0,step+1));
    
    //setIsXNext(step % 2) === 0;
  }

  const squareProps = {setSquares, setStepNumber, setIsXNext, setCurrent, setHistory, squares, history, isXNext, stepNumber};
  console.log('squareProps: ',squareProps )
  console.log('history',history)
  return (
    <div className="game">
      <div className="game-board">
        <div>
          <div className="board-row">
            <RenderSquare { ...{...squareProps, ...{ squareIndex:0 } } } />
            <RenderSquare { ...{...squareProps, ...{ squareIndex:1 } } } />
            <RenderSquare { ...{...squareProps, ...{ squareIndex:2 } } } />
          </div>

          <div className="board-row">
            <RenderSquare { ...{...squareProps, ...{ squareIndex:3 } } } />
            <RenderSquare { ...{...squareProps, ...{ squareIndex:4 } } } />
            <RenderSquare { ...{...squareProps, ...{ squareIndex:5 } } } />
          </div>

          <div className="board-row">
            <RenderSquare { ...{...squareProps, ...{ squareIndex:6 } } } />
            <RenderSquare { ...{...squareProps, ...{ squareIndex:7 } } } />
            <RenderSquare { ...{...squareProps, ...{ squareIndex:8 } } } />
          </div>
        </div>
      </div>

      <div className="game-info">
        <div>{status}</div>
        <Moves {... {history, jumpTo  } } />
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
