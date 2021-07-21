import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Hidden } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import Puntaje from "./components/Puntaje";
//import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
const axios = require("axios");
const urlBackend =
  "https://7306113ugf.execute-api.us-east-1.amazonaws.com/dev/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: 3,
};

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
  //Modal

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    resetGame();
    setPlayers({
      X: 0,
      O: 0,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [nombrePlayer1, setNombrePlayer1] = useState("");
  const [nombrePlayer2, setNombrePlayer2] = useState("");
  // if (nombrePlayer1 === "" && nombrePlayer2 === "") {
  //   handleOpen();
  // }
  const handleChangeNombre1 = (e) => {
    setNombrePlayer1(e.target.value);
  };
  const handleChangeNombre2 = (e) => {
    setNombrePlayer2(e.target.value);
  };

  //Logica
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winningCells, setWinningCells] = useState([]);
  const [players, setPlayers] = useState({
    X: 0,
    O: 0,
  });
  const savePlayers = () => {
    if (nombrePlayer1 !== "" && nombrePlayer2 !== "") {
      localStorage.setItem("player1", JSON.stringify(nombrePlayer1));
      localStorage.setItem("player2", JSON.stringify(nombrePlayer2));
      console.log(players);
      handleClose();
    }
  };

  const resetGame = () => {
    setTurn("X");
    setCells(Array(9).fill(null));
    setWinningCells([]);
  };

  const checkForWinner = (newCells) => {
    const info = {
      newCells: newCells,
      turn: turn,
      nombrePlayer1: nombrePlayer1,
      nombrePlayer2: nombrePlayer2,
    };
    console.log(info);
    const urlTurno = urlBackend + "turnoo";
    axios.post(urlTurno, info).then((res) => {
      console.log(res.data.body);
      if (!res.data.body.next) {
        if (res.data.body.winner !== null) {
          setPlayers({
            ...players,
            [res.data.body.winner]: players[res.data.body.winner] + 1,
          });
        }
        setWinningCells(res.data.body.victoryMove);
        setTimeout(resetGame, 3000);
      } else {
        setTurn(turn === "X" ? "O" : "X");
      }
    });
  };

  const handleClick = (cell) => {
    let newCells = [...cells];
    newCells.splice(cell, 1, turn);
    setCells(newCells);
    checkForWinner(newCells);
  };
  return (
    <div className="container">
      <Puntaje
        player1={players.X}
        player2={players.O}
        nombre1={nombrePlayer1}
        nombre2={nombrePlayer2}
      />
      <Game
        winningCells={winningCells}
        turn={turn}
        cells={cells}
        onClick={handleClick}
      />
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Salir
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ingrese los nombres de los jugadores.
          </Typography>
          <TextField
            style={{ margin: 10 }}
            id="outlined-basic"
            label="Jugador 1"
            variant="outlined"
            value={nombrePlayer1}
            onChange={handleChangeNombre1}
          />
          <TextField
            style={{ margin: 10 }}
            id="outlined-basic"
            label="Jugador 2"
            variant="outlined"
            value={nombrePlayer2}
            onChange={handleChangeNombre2}
          />
          <Button variant="outlined" onClick={savePlayers}>
            Aceptar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
