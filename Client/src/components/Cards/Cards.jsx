import Card from "../Card/Card";
import style from "./Cards.module.css";

export default function Cards({ characters, onClose }) {
  return (
    <div className={style.contenedor}>
      {characters?.map((character, index) => {
        return <Card key={index} character={character} onClose={onClose} />;
      })}
    </div>
  );
}
