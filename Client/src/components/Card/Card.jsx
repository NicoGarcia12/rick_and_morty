import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import style from "./Card.module.css";
import { AiFillStar, AiOutlineCloseCircle } from "react-icons/ai";

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

  useEffect(() => {
    setIsFav(allFavorites.some((fav) => fav.id === character.id));
  }, [allFavorites, character]);

  function handleFavorite() {
    if (isFav) {
      setIsFav(false);
      dispatch(removeFav(character.id));
    } else {
      setIsFav(true);
      dispatch(addFav(character));
    }
  }

  return (
    <div className={`${style.contenedor} ${style["scale-and-shadow"]}`}>
      <Link to={`/detail/${character.id}`}>
        <img
          className={style.imagen}
          src={character.image}
          alt={character.name}
        />
      </Link>
      <AiFillStar
        className={`${style.estrella} ${
          isFav ? style["icon-yellow"] : style["icon-white"]
        }`}
        onClick={handleFavorite}
      />
      <AiOutlineCloseCircle
        className={`${style.cruz} ${style["icon-close"]}`}
        onClick={() => onClose(character.id)}
      />
    </div>
  );
}
