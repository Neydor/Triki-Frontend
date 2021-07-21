import classNames from "classnames";
import "./Cell.css";
//import classNames from "classnames";

const Cell = ({ value, onClick, turn, winner }) => {
  const handleClick = () => {
    turn !== null && value === null && onClick();
  };
  let cellClass = classNames({
    cell: true,
    [`cell-player-${value}`]: value !== null,
    winner: winner,
  });
  return <div className={cellClass} onClick={() => handleClick()}></div>;
};

export default Cell;
