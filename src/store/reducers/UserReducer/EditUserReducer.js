import { actionTypes } from "../../actionTypes";

const initialState = {
    currentUserInfo: null,
};

const EditUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return { ...state, currentUserInfo: action.payload };
        default:
            return state;
    }
};

export default EditUserReducer;
