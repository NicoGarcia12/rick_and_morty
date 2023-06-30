import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css";
import { filterCards, orderCards } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { AiOutlineArrowDown } from "react-icons/ai";

export default function NavBar({ logOut, onSearch, onRandom }) {
  const location = useLocation();
  const [filter, setFilter] = useState("All");
  const [order, setOrder] = useState("A");
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== "/favorites") {
      setFilter("All");
      setOrder("A");
    } else {
      dispatch(filterCards(filter));
      dispatch(orderCards(order));
    }
  }, [location.pathname, dispatch, filter, order]);

  function handleFilter(event) {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    dispatch(filterCards(selectedFilter));
  }

  function handleOrder(event) {
    const selectedOrder = event.target.value;
    setOrder(selectedOrder);
    dispatch(orderCards(selectedOrder));
  }

  return (
    <div className={style.container}>
      <div className={style.leftSection}>
        {location.pathname === "/home" && (
          <SearchBar onSearch={onSearch} onRandom={onRandom} />
        )}
        {location.pathname === "/about" && <span>Datos del desarrollador</span>}
        {location.pathname === "/favorites" && (
          <div className={`row ${style.navFavorites}`}>
            <span>Ordenar:</span>
            <AiOutlineArrowDown className={style.iconoSelectOrden}/>
            <select
              className={style.select}
              value={order}
              onChange={handleOrder}
            >
              <option value="A">Ascendente</option>
              <option value="D">Descendente</option>
            </select>
            <span>Filtrar por:</span>
            <AiOutlineArrowDown className={style.iconoSelectFiltro}/>
            <select
              className={style.select}
              value={filter}
              onChange={handleFilter}
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        )}
      </div>
      <div className={style.rightSection}>
        <NavLink to="/about" className={style.link}>
          <button className={style.button}>About</button>
        </NavLink>
        <NavLink to="/home" className={style.link}>
          <button className={style.button}>Home</button>
        </NavLink>
        <NavLink to="/favorites" className={style.link}>
          <button className={style.button}>Favorites</button>
        </NavLink>
        <button
          className={`${style.button} ${style.logoutButton}`}
          onClick={logOut}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
