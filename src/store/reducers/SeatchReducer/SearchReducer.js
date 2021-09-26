import { actionTypes } from "../../actionTypes";

const initialState = "";

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_TEXT:
            return action.payload;
        default:
            return state;
    }
};

export default SearchReducer;
