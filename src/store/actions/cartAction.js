import axios from "axios";
import { actionTypes } from "../actionTypes";
import { setLoader } from "./loaderAction";
import { requestOrdersByUser } from './orderActon';

export const setPersistedCart = (productId) => {
    return {
        type: actionTypes.SET_PERSISTED_CART,
        payload: productId,
    };
};



export const setCartList = (cartList) => {
    return {
        type: actionTypes.SET_CART_LIST,
        payload: cartList,
    };
};
export const requestCartList = (token) => {
    return async (dispatch) => {
        dispatch(setLoader(true));

        const { data } = await axios.get("http://localhost:8080/cart", {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(setLoader(false));
        dispatch(setCartList(data));
    };
};


export const requestAddCartItem = (productId, token) => {
    return async (dispatch) => {
        const { data } = await axios.post("http://localhost:8080/cart",{
            product:{
                id: productId,
                quantity : 1
            }
        } ,
        {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(setPersistedCart(null));
        dispatch(setCartList(data));

    };
};

export const requestAddCartItemSignin = (productId, token) => {
    return async (dispatch) => {
        const { data } = await axios.post("http://localhost:8080/cart",{
            product:{
                id: productId,
                quantity : 1
            }
        } ,
        {
            headers: {
                authorization: `bearer ${token}`,
            },
        });

        dispatch(setPersistedCart(null));
        dispatch(requestCartList(token));
    };
};
export const setCartProductQuantity=(type, productId, quantity, token)=>{
   
    return async (dispatch) => {
        const {data} = await axios.post("http://localhost:8080/cart",{
            product:{
                id: productId,
                quantity : type==="increment"? quantity+1: quantity>1?quantity-1:1,
            },
        },
        {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
      
    }
}


//product Details
export const requestAddToCart = (productId,quantity,token)=>{
    return async (dispatch) => {
        const {data} = await axios.post("http://localhost:8080/cart",{
            product:{
                id: productId,
                quantity : quantity,
            },
        },
        {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(requestCartList(token));
    }
}

export const deleteProductFromCart =(productId,token)=>{
    return async (dispatch) => {
        const {data} = await axios.post("http://localhost:8080/cart",{
            product:{
                id: productId,
                quantity : 0,
            },
        },
        {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
      
    }
}

export const requestCheckOut = (token) => {
    return async (dispatch) => {
        const { data } = await axios.get("http://localhost:8080/order/checkout", {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(requestCartList(token));
        dispatch(requestOrdersByUser(token));
    };
};



