import { ADD_FAV, REMOVE_FAV, ORDER, FILTER } from "./actions";

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: [...state.myFavorites, action.payload],
        allCharacters: [...state.myFavorites, action.payload],
      };
    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: state.myFavorites.filter(
          (favorite) => favorite.id !== parseInt(action.payload)
        ),
      };
    case FILTER:
      if (action.type==="All") {
        return {
          ...state,
          myFavorites: state.myFavorites
        }
      } else {
        return {
          ...state,
          myFavorites: state.allCharacters.filter(
            (character) => character.gender === action.payload
          ),
        };
      }
    case ORDER:
      let orden;
      if (action.payload === "A") {
        orden = state.myFavorites.sort((a, b) => (a.id > b.id ? 1 : -1));
      } else {
        orden = state.myFavorites.sort((a, b) => (b.id > a.id ? 1 : -1));
      }
      return {
        ...state,
        myFavorites: [...orden],
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
