import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import style from "./Card.module.css";

export default function Card({ character, onClose }) {
  const location = useLocation();
  const allFavorites = useSelector((state) => {
    if (location.pathname === "/favorites") {
      return state.filteredFavorites;
    } else {
      return state.allFavorites;
    }
  });
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);

  function handleFavorite() {
    if (isFav) {
      setIsFav(false);
      dispatch(removeFav(character.id));
    } else {
      setIsFav(true);
      dispatch(addFav(character));
    }
  }

  useEffect(() => {
    allFavorites.forEach((fav) => {
      if (fav.id === character.id) {
        setIsFav(true);
      }
    });
  }, [allFavorites, character]);

  return (
    <div className={`${style.contenedor} ${style["shadow-drop-center"]}`}>
      <Link to={`/detail/${character.id}`}>
        <img
          className={style.imagen}
          src={character.image}
          alt={character.name}
        />
      </Link>
      <button className={style.corazon} onClick={handleFavorite}>
        {isFav ? "❤️" : "🤍"}
      </button>
      <button className={style.cruz} onClick={() => onClose(character.id)}>
        X
      </button>
    </div>
  );
}
