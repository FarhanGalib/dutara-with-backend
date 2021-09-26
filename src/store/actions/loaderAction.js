import { actionTypes } from "../actionTypes"

export const setLoader=(value)=> {
    return {
        type: actionTypes.SET_LOADER,
        payload: value,
    }
}