import { connect } from "react-redux";
import { orderCards, filterCards } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Cards from "../Cards/Cards";
import { useState } from "react";
export function Favorites({ myFavorites, onClose }) {
  const [aux, setAux] = useState(false);

  const dispatch = useDispatch();

  function handleOrder(event) {
    dispatch(orderCards(event.target.value));
    setAux(true);
  }

  function handleFilter(event) {
    dispatch(filterCards(event.target.value));
  }

  return (
    <div className="favorites">
      <select onChange={handleOrder}>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <select onChange={handleFilter}>
        <option value="All">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
      <Cards characters={myFavorites} onClose={onClose} />
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}

export default connect(mapStateToProps, null)(Favorites);
