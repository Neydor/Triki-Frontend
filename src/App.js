import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
//import ScoreBoard from "./components/ScoreBoard/ScoreBoard";

const urlBackend =
  "https://kt3kt2kzi7.execute-api.us-west-1.amazonaws.com/dev/turnoo";

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winningCells, setWinningCells] = useState([]);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });

  const resetGame = () => {
    setTurn("X");
    setCells(Array(9).fill(null));
    setWinningCells([]);
  };

  const checkForWinner = (newCells) => {
    const listaprueba = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];
    const info = { newCells: listaprueba, turn: turn };
    const urlTurno = urlBackend;
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Api-Key": "pepe",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: info,
      // mode: "no-cors",
    };
    fetch(urlTurno, requestOptions)
      .then((res) => res.json())
      .then(
        (response) => {
          console.log(response);
          if (!response.next) {
            if (response.winner !== null) {
              setScore({
                ...score,
                [response.winner]: score[response.winner] + 1,
              });
            }
            setWinningCells(response.victoryMove);
            setTimeout(resetGame, 3000);
          }
        },
        (error) => {
          console.log(error);
        }
      );

    setTurn(turn === "X" ? "O" : "X");
  };

  const handleClick = (cell) => {
    let newCells = [...cells];
    newCells.splice(cell, 1, turn);
    setCells(newCells);
    checkForWinner(newCells);
  };
  return (
    <div className="container">
      <Game
        winningCells={winningCells}
        turn={turn}
        cells={cells}
        onClick={handleClick}
      />
    </div>
  );
};

export default App;
