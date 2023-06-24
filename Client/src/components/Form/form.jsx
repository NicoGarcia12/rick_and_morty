import { useState } from "react";
import validation from "../../utils/validation";
import style from "./form.module.css";
import video from "../../images/rm5.mp4";

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

  function handleSubmit(event) {
    event.preventDefault();
    console.log(errors);
    let errores = Object.values(errors);
    if (errores && errores.length > 0) {
      alert("Debe llenar todos los campos de manera correcta");
    } else {
      props.login(userData);
    }
  }

  return (
    <div>
      <div className={style.fondo}>
        <video autoPlay loop muted playbackRate={0.5} id="videoFondo">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className={style.container}>
        <h1>Ingresa a la página!</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style["label-input-container"]}>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={style["input-error"]}>{errors.email}</span>
            )}
          </div>
          <div className={style["label-input-container"]}>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={style["input-error"]}>{errors.password}</span>
            )}
          </div>
          <div className={style["button-container"]}>
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
