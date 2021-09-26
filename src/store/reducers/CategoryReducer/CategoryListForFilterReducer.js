import { actionTypes } from "../../actionTypes";

const initialState = [];

const CategoryListForFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CATEGORY_FOR_FILTER:
            return action.payload;
        default:
            return state;
    }
};

export default CategoryListForFilterReducer;
