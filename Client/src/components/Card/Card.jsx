import style from "./Card.module.css";
import { addFav, removeFav } from "../../redux/actions";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
      dispatch(removeFav(character));
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
    <div className={style.contenedor}>
      <button className={style.cruz} onClick={() => onClose(character.id)}>
        X
      </button>
      {isFav ? (
        <button onClick={handleFavorite}>❤️</button>
      ) : (
        <button onClick={handleFavorite}>🤍</button>
      )}
      <br />
      <br />
      <Link to={`/detail/${character.id}`}>
        <img
          className={style.imagen}
          src={character.image}
          alt={character.name}
        />
      </Link>
    </div>
  );
}
