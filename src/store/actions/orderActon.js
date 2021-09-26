import axios from "axios";
import { actionTypes } from "../actionTypes";
import { setLoader } from "./loaderAction";

export const setOrderList = (orderList) => {
    return {
        type: actionTypes.SET_ORDER_LIST,
        payload: orderList,
    };
};

export const requestOrderList = (token) => {
    return async (dispatch) => {
        dispatch(setLoader(true));

        const { data } = await axios.get("http://localhost:8080/order", {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(setOrderList(data));
        dispatch(setLoader(false));

    };
};

export const requestChangeOrderStatus = (orderId, status, token) => {
    return async (dispatch) => {
        const { data } = await axios.patch(
            `http://localhost:8080/order/${orderId}`,
            {
                status: status
            },
            {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }
        );
       dispatch(requestOrderList(token));

    };
};


//set my (user) orders

export const setUserOrders = (userOrderList) => {
    return {
        type: actionTypes.SET_USER_ORDER_LIST,
        payload: userOrderList,
    };
};


//Get my (user) orders
export const requestOrdersByUser=(token)=>{
    return async (dispatch) => {
        dispatch(setLoader(true));
        const { data } = await axios.get(
            `http://localhost:8080/order/my-order`,
            {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }
        );
       dispatch(setLoader(false));
       dispatch(setUserOrders(data));

    };
}