import React, { useEffect, useState } from "react";
import validation from "../../utils/validation";
import style from "./form.module.css";
import titulo from "../../images/titulo.png";

export default function Form(props) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );
  }

  useEffect(() => {
    localStorage.setItem("access", false);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    let errores = Object.values(errors);
    if (errores && errores.length > 0) {
      alert("Debe llenar todos los campos de manera correcta");
    } else {
      props.login(userData);
    }
  }

  return (
    <div>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <img src={titulo} alt="Rick y Morty" className={style.titleImage} />
          <div className={style["label-input-container"]}>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <p className={style.errorContainer}>
              {errors.email && <>{errors.email}</>}
            </p>
          </div>
          <div className={style["label-input-container"]}>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <p className={style.errorContainer}>
              {errors.password && <>{errors.password}</>}
            </p>
          </div>
          <div className={style["button-container"]}>
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
