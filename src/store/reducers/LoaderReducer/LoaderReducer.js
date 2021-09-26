import { actionTypes } from "../../actionTypes";

const initialState = false;

const LoaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADER:
            return action.payload;
        default:
            return state;
    }
};

export default LoaderReducer;
