export default function validation(inputs) {
  let errors = {};
  if (!inputs.email) {
    errors.email = "El email no puede estar vacío";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
    errors.email = "El email es inválido";
  }
  if (inputs.email.length > 35) {
    errors.email = "El email no puede ser superior a 35 caracteres";
  }
  if (
    !/\d/.test(inputs.password) ||
    (inputs.password.length < 6 || inputs.password.length > 10)
  ) {
    errors.password =
      "La contraseña tiene que tener al menos un número y tener una longitud entre 6 y 10 caracteres";
  }
  return errors;
}
