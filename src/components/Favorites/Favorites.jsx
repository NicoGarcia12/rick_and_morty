import { connect } from "react-redux";
import Cards from "../Cards/Cards";
export function Favorites({ myFavorites, onClose }) {
  return (
    <div className="favorites">
      <h1>Tus personajes favoritos son:</h1>
      <Cards characters={myFavorites} onClose={onClose}/>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}

export default connect(mapStateToProps, null)(Favorites);
