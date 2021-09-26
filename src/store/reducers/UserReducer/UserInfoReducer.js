import { actionTypes } from "../../actionTypes";

const initialState = null;

const CurrentUserInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_PROFILE:
            return action.payload ;
        default:
            return state;
    }
};

export default CurrentUserInfoReducer;
