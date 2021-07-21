import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
//import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
const axios = require("axios");
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

  const checkForWinner = async (newCells) => {
    const info = { newCells: newCells, turn: turn };
    const urlTurno = urlBackend;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(info),
    };
    let response = await axios.post(urlBackend, info);
    var data = response.data.body;
    console.log(data);
    if (!data.next) {
      if (data.winner !== null) {
        setScore({
          ...score,
          [data.winner]: score[data.winner] + 1,
        });
      }
      setWinningCells(data.victoryMove);
      setTimeout(resetGame, 3000);
    }

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
