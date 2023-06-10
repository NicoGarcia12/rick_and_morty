import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Card({ character, onClose, addFav, removeFav, myFavorites }) {
  const [isFav, setIsFav] = useState(false);
  const location = useLocation();

  function handleFavorite() {
    if (isFav) {
      setIsFav(false);
      removeFav(character.id);
    } else {
      setIsFav(true);
      addFav(character);
    }
  }

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === character.id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

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

export function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    addFav: (character) => dispatch(addFav(character)),
    removeFav: (id) => dispatch(removeFav(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
