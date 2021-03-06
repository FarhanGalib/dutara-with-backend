import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { actionTypes } from "../actionTypes";
import { setLoader } from "./loaderAction";

//add new product
export const requestAddNewProduct = (newProduct, token) => {
    return async (dispatch) => {
        const pro = await axios.post(
            `${BASE_URL}products`,
            {
                title: newProduct.title,
                price: parseInt(newProduct.price),
                description: newProduct.description,
                image: newProduct.image,
                stock: parseInt(newProduct.stock),
                category: {
                    _id: newProduct.categoryId,
                },
            },
            {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }
        );
        dispatch(requestProductList(token));
    };
};

//set Products product list
export const setProductList = (productList) => {
    return {
        type: actionTypes.SET_PRODUCT_LIST,
        payload: productList,
    };
};

//Get ALL Products
export const requestProductList = (token) => {
    return async (dispatch, store) => {
        dispatch(setLoader(true));
        const { data } = await axios.get(`${BASE_URL}products`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(setProductList(data));
        dispatch(setLoader(false));
        
    };
};

//Delete Product
export const requestDeleteProduct = (id, token) => {
    return async (dispatch) => {
        await axios.delete(`${BASE_URL}products/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(requestProductList(token));
    };
};

//Set Single Product For Update
export const setCurrentProduct = (currentProduct) => {
    return {
        type: actionTypes.SET_SINGLE_PRODUCT_FOR_EDIT,
        payload: currentProduct,
    };
};
export const requestSingleProduct = (id, token) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        const { data } = await axios.get(
            `${BASE_URL}products/${id}`,
            {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }
        );
        dispatch(setCurrentProduct(data));
        dispatch(setLoader(false));

    };
};

//Product Update
export const requestUpdateProduct = (
    id,
    currentProduct,
    isImageChanged,
    token
) => {
    return async (dispatch) => {
        if (isImageChanged) {
            const { data } = await axios.patch(
                `${BASE_URL}products/${id}`,
                {
                    title: currentProduct.title,
                    price: parseInt(currentProduct.price),
                    description: currentProduct.description,
                    image: currentProduct.image,
                    stock: parseInt(currentProduct.stock),
                    category_id: currentProduct.categoryId,
                },
                {
                    headers: {
                        authorization: `bearer ${token}`,
                    },
                }
            );
        dispatch(requestProductList(token));
        }
        else{
            const { data } = await axios.patch(
                `${BASE_URL}products/${id}`,
                {
                    title: currentProduct.title,
                    price: parseInt(currentProduct.price),
                    description: currentProduct.description,
                    
                    stock: parseInt(currentProduct.stock),
                    category_id: currentProduct.categoryId,
                },
                {
                    headers: {
                        authorization: `bearer ${token}`,
                    },
                }
            );
        dispatch(requestProductList(token));

        }
    };
};
