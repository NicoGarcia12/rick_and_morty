import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function Detail () {
  const [character, setCharacter] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(
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
      <h1>{character.name}</h1>
      <h2>{character.species}</h2>
      <h2>{character.gender}</h2>
      {/* <h2>{character.origin.name}</h2> */}
      {/* AGREGAR OTRAS COSAS */}
      <img
        src={character.image}
        alt={character.name}
      />
    </div>
  );
}
