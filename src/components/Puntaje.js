import "./Puntaje.css";
const Puntaje = ({ player1, player2, nombre1, nombre2 }) => {
  return (
    <div className="puntaje">
      <div>{nombre1 + " " + player1}</div>
      <div>{nombre2 + " " + player2}</div>
    </div>
  );
};
export default Puntaje;
