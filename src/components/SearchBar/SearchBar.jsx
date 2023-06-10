import style from "./SearchBar.module.css";
import { useState } from "react";
export default function SearchBar({onSearch}) {
  const [id, setId] = useState("");

  function handleChange(event) {
    setId(event.target.value);
  }

  return (
    <div className={style.container}>
      <input
        value={id}
        className={style.input}
        onChange={handleChange}
        type="number"
      />
      <button className={style.button} onClick={() => onSearch(id)}>
        Agregar
      </button>
    </div>
  );
}
