import { useDispatch, useSelector } from "react-redux";
import style from "./error.module.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { setError } from "../../redux/actions";
import { AiOutlineHome } from "react-icons/ai";

export default function Error() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setError(true));
    return () => {
      dispatch(setError(false));
    };
  }, []);
  return (
    <div className={style.error}>
      <div className={style.posicion}>
        <h1>¡Error 404!</h1>
        <h3>Has caído en la dimensión equivocada</h3>
        <NavLink to="/home" className={style.link}>
          <p>
            Volver a home <AiOutlineHome className={style.icono} />
          </p>
        </NavLink>
      </div>
    </div>
  );
}
