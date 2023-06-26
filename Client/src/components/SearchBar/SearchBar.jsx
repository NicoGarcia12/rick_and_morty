import style from "./SearchBar.module.css";
import { useState } from "react";
import { FaSearch, FaDice } from "react-icons/fa";

export default function SearchBar({ onSearch, onRandom }) {
  const [id, setId] = useState("");

  function handleChange(event) {
    setId(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setId("");
    onSearch(id);
  }

  function handleRandom() {
    onRandom();
  }

  return (
    <div className={style.container}>
      <div className={style.searchWrapper}>
        <FaSearch className={style.searchIcon} />
        <input
          value={id}
          className={style.input}
          onChange={handleChange}
          type="number"
          placeholder="Buscar por ID"
        />
      </div>
      <div className={style.buttonWrapper}>
        <button className={style.button} onClick={handleSubmit}>
          Agregar
        </button>
        <button className={style.button} onClick={handleRandom}>
          <FaDice className={style.diceIcon} /> Agregar aleatorio
        </button>
      </div>
    </div>
  );
}
