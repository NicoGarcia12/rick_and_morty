import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./detail.module.css";

export default function Detail() {
  const [character, setCharacter] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);
  return (
    <div>
      <div className={style.detailContainer}>
        <div
          className={style.leftSection}
          style={{ backgroundImage: `url(${character.image})` }}
        ></div>
        <div className={style.rightSection}>
          <h1>Nombre: {character.name}</h1>
          <h2>Especie: {character.species}</h2>
          <h2>Género: {character.gender}</h2>
          <h2>Origen: {character.origin}</h2>
          <h2>Estado: {character.status}</h2>
          <h2>Id: {character.id}</h2>
        </div>
      </div>
    </div>
  );
}
