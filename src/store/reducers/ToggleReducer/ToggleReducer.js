import { actionTypes } from "../../actionTypes";

const initialState = false;

const ToggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOGGLE:
            return !action.payload;
        default:
            return state;
    }
};

export default ToggleReducer;
