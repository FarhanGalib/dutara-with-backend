import { actionTypes } from "../actionTypes"

export const setSearchText = (searchText) =>{
    return{
        type: actionTypes.SET_SEARCH_TEXT,
        payload: searchText,
    }
}