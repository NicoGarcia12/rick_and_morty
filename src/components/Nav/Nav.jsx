import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css";
import { NavLink } from "react-router-dom";
export default function Nav({ onSearch, random, logOut }) {
  return (
    <div>
      <NavLink to="/about">
        <button>About</button>
      </NavLink>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>
      <NavLink to="/favorites">
        <button>Favorites</button>
      </NavLink>
      <SearchBar onSearch={onSearch} />
      <button className={style.botonAleatorio} onClick={random}>
        Agregar aleatorio
      </button>
      <button className={style.botonAleatorio} onClick={logOut}>
        Cerrar sesion
      </button>
    </div>
  );
}
