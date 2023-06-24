import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/Nav/Nav";
import Cards from "./components/Cards/Cards";
import Favorites from "./components/Favorites/Favorites";
import Error from "./components/Error/error";
import Form from "./components/Form/form";
import About from "./components/About/about";
import Detail from "./components/Detail/detail";
import { removeFav, filterCards, orderCards } from "./redux/actions";
import axios from "axios";
import video from "./images/rm5.mp4";
import style from "./App.module.css";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allFavorites = useSelector((state) => state.allFavorites);
  const [access, setAccess] = useState(false);

  async function login(userData) {
    const { email, password } = userData;
    const URL = "http://localhost:3001/rickandmorty/login/";

    try {
      const response = await axios.get(
        `${URL}?email=${email}&password=${password}`
      );
      const { data } = response;
      const { access } = data;
      setAccess(data);
      if (access) {
        alert("Ingreso Exitoso");
        navigate("/home");
      } else {
        alert("No hay un usuario registrado con esos datos");
      }
    } catch (error) {
      alert(
        "Ocurrió un error al realizar el inicio de sesión, Error: " +
          error.message
      );
    }
  }

  function logOut() {
    setAccess(false);
    navigate("/");
  }

  async function onSearch(id) {
    if (characters.length >= 826) {
      return alert("¡Ya están cargados todos los personajes disponibles!");
    }

    if (id < 1 || id > 826) {
      return alert("El ID debe estar entre 1 y 826");
    }

    if (verificarCartas(id)) {
      alert("Ese personaje ya existe!");
    } else {
      id = parseInt(id);
      try {
        const response = await axios.get(
          `http://localhost:3001/rickandmorty/character/${id}`
        );
        const data = response.data;
        if (data.name) {
          setCharacters((oldCharacters) => [...oldCharacters, data]);
        }
      } catch (error) {
        alert("No hay personajes con ese ID, tiene que estar entre 1 y 826");
      }
    }
  }

  function verificarCartas(id) {
    let buscados = characters.map((character) => character.id);
    return buscados.includes(id);
  }

  function randomHandler() {
    if (characters.length === 826) {
      return alert("¡Ya están cargados todos los personajes disponibles!");
    }

    let randomId;
    let cartaExiste;

    do {
      randomId = Math.floor(Math.random() * 826) + 1;
      cartaExiste = verificarCartas(randomId);
    } while (cartaExiste);

    onSearch(randomId);
  }

  function onClose(id) {
    dispatch(removeFav(id));
    setCharacters(characters.filter((char) => char.id !== id));
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);

  useEffect(() => {
    dispatch(filterCards("All"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(orderCards("Ascending"));
  }, [dispatch]);

  return (
    <div>
      <div className={style.fondo}>
        <video autoPlay loop muted playbackRate={0.5} id="videoFondo">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className={style.container}>
        {location.pathname !== "/" && (
          <NavBar
            logOut={logOut}
            onSearch={onSearch}
            onRandom={randomHandler}
            showFilters={location.pathname === "/favorites"}
          />
        )}
        <Routes>
          <Route
            path="/home"
            element={<Cards characters={characters} onClose={onClose} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                onClose={onClose}
                showFilters={location.pathname === "/favorites"}
              />
            }
          />
          <Route path="/" element={<Form login={login} />} />
          <Route path="/detail/:id" element={<Detail login={login} />} />
          <Route path="*" element={<Error />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}
