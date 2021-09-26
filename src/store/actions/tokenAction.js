import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { actionTypes } from "../actionTypes";

export const setToken = (currentUser) => {
    return {
        type: actionTypes.SET_TOKEN,
        payload: currentUser,
    };
};
export const setError = (error) => {
    return {
        type: actionTypes.SET_ERROR,
        payload: error,
    };
};
export const requestSignIn = (signInInfo) => {
    return async (dispatch) => {
        const { data } = await axios.post(`${BASE_URL}signin`, {
            email: signInInfo.email,
            password: signInInfo.password,
        });
        if (data.message === "Logged in Successfully") dispatch(setToken(data));
        else  dispatch(setError(data.message));
    };
};
