import "./App.css";
import Cards from "./components/Cards/Cards.jsx";
import About from "./components/About/about.jsx";
import Detail from "./components/Detail/detail";
import NavBar from "./components/Nav/Nav";
import Error from "./components/Error/error";
import Form from "./components/Form/form";
import Favorites from "./components/Favorites/Favorites";
import titulo from "./images/titulo.png";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { removeFav } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function App() {
  let [characters, setCharacters] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allFavorites = useSelector((state) => state.allFavorites);
  let [access, setAccess] = useState(false);
  let email = "nicolasgarcia9812@hotmail.com";
  let password = "12345678";

  function login(userData) {
    if (userData.email === email && userData.password === password) {
      setAccess(true);
      navigate("/home");
    }
  }

  function logOut(event) {
    setAccess(false);
    navigate("/");
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);

  function onSearch(id) {
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
      axios
        .get(`http://localhost:3001/rickandmorty/character/${id}`)
        .then((response) => {
          const data = response.data;
          if (data.name) {
            setCharacters([...characters, data]);
          }
        })
        .catch((error) => {
          alert("No hay personajes con ese ID, tiene que estar entre 1 y 826");
        });
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
    const character = allFavorites.find((char) => char.id === id);
    dispatch(removeFav(character));
    setCharacters(characters.filter((char) => char.id !== id));
  }

  return (
    <div>
      <img src={titulo} alt="Rick y Morty" />
      {location.pathname !== "/" && (
        <NavBar logOut={logOut} onSearch={onSearch} random={randomHandler} />
      )}
      <Routes>
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/favorites" element={<Favorites onClose={onClose} />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/" element={<Form login={login} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
