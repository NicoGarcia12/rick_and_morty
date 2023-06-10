import { useState } from "react";
import validation from "../../utils/validation";
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
        let errores = Object.values(errors);
    if (errores.length === 0) {
      setUserData({ email: "", password: "" });
      setErrors({ email: "", password: "" });
      alert("Ingreso Exitoso");
    } else {
      alert("Debe llenar todos los campos de manera correcta");
    }
    props.login(userData)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Ingresa a la página!</h1>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <span>{errors.email}</span>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <span>{errors.password}</span>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
