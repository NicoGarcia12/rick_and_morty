import "./App.css";
import Cards from "./components/Cards/Cards.jsx";
import { useEffect, useState } from "react";
import titulo from "./images/titulo.png";
import NavBar from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import About from "./components/About/about.jsx";
import Detail from "./components/Detail/detail";
import Error from "./components/Error/error";
import Form from "./components/Form/form";
import Favorites from "./components/Favorites/Favorites";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeFav } from "./redux/actions";
import { connect } from "react-redux";

function App({ removeFav }) {
  let [characters, setCharacters] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
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
      alert("¡Ya están cargados todos los personajes disponibles!");
      return null;
    }
    let buscar = characters.some((character) => character.id === Number(id));
    if (buscar) {
      alert("Ese personaje ya existe!");
    } else {
      id = parseInt(id);
      fetch(`http://localhost:3001/rickandmorty/character/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            window.alert("¡No hay personajes con este ID!");
          }
        });
    }
  }

  function onClose(id) {
    setCharacters(characters.filter((char) => char.id !== id));
    removeFav(id);
  }

  function verificarCartas(id) {
    let buscar = characters.some((character) => character.id === Number(id));
    return buscar;
  }

  function randomHandler() {
    if (characters.length >= 826) {
      alert("¡Ya están cargados todos los personajes disponibles!");
      return;
    }

    let randomId;
    let buscados = new Set(characters.map((character) => character.id));
    let cartaCorrecta = false;

    do {
      randomId = Math.floor(Math.random() * 826) + 1;
      console.log(randomId);
      if (!buscados.has(randomId)) {
        cartaCorrecta = true;
        break;
      }
    } while (buscados.size < 826);

    if (cartaCorrecta) {
      onSearch(randomId.toString());
    } else {
      alert("¡Ya están cargados todos los personajes disponibles!");
    }
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

export function mapDispatchToProps(dispatch) {
  return {
    removeFav: (id) => dispatch(removeFav(id)),
  };
}

export default connect(null, mapDispatchToProps)(App);
