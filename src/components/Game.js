import Cell from "./Cell";
import "./Game.css";

const Game = ({ cells, onClick, turn, winningCells }) => {
  const renderCellsPerRow = (items) =>
    items.map((item) => (
      <Cell
        winner={winningCells.includes(item)}
        turn={turn}
        onClick={() => onClick(item)}
        value={cells[item]}
        key={`cell_${item}`}
      />
    ));
  return (
    <div className="game">
      <div className="row">{renderCellsPerRow([0, 1, 2])}</div>
      <div className="row">{renderCellsPerRow([3, 4, 5])}</div>
      <div className="row">{renderCellsPerRow([6, 7, 8])}</div>
    </div>
  );
};

export default Game;
