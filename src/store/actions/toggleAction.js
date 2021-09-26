import { actionTypes } from "../actionTypes"

export const setToggle = (toggle) =>{
    return {
        type: actionTypes.SET_TOGGLE,
        payload:  toggle,
    }
}