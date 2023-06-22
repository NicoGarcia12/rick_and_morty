import { ADD_FAV, REMOVE_FAV, ORDER, FILTER } from "./actions";

const initialState = {
  filteredFavorites: [],
  allFavorites: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      return {
        ...state,
        filteredFavorites: action.payload,
        allFavorites: action.payload,
      };
    case REMOVE_FAV:
      return {
        ...state,
        allFavorites: action.payload,
        filteredFavorites: action.payload,
      };
    case FILTER:
      if (action.payload === "All") {
        return {
          ...state,
          filteredFavorites: state.allFavorites,
        };
      } else {
        return {
          ...state,
          filteredFavorites: state.allFavorites.filter(
            (character) => character.gender === action.payload
          ),
        };
      }
    case ORDER:
      let orden;
      if (action.payload === "A") {
        orden = state.filteredFavorites.sort((a, b) => (a.id > b.id ? 1 : -1));
      } else {
        orden = state.filteredFavorites.sort((a, b) => (b.id > a.id ? 1 : -1));
      }
      return {
        ...state,
        filteredFavorites: [...orden],
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
