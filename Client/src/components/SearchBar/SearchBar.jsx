import style from "./SearchBar.module.css";
import { useState } from "react";

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
      <input
        value={id}
        className={style.input}
        onChange={handleChange}
        type="number"
      />
      <button className={style.button} onClick={handleSubmit}>
        Agregar
      </button>
      <button className={style.button} onClick={handleRandom}>
        Agregar aleatorio
      </button>
    </div>
  );
}
