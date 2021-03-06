import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { actionTypes } from "../actionTypes";
import { setLoader } from "./loaderAction";

export const requestAddNewCategory = (newCategory, token) => {
    return async (dispatch) => {
        const {data} =await axios.post(
            `${BASE_URL}category`,

            {
                name: newCategory.name,
                description: newCategory.description,
            },
            {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }
        );
        dispatch(requestCategoryList());
    };
};



export const setFilterByCategory= (data)=>{
    const categoryList = [...data];
    categoryList.unshift({_id:"0", name:"All"});
    return {
        type: actionTypes.SET_CATEGORY_FOR_FILTER,
        payload: categoryList,
    };
};

export const setCategoryList = (categoryList) => {
    return {
        type: actionTypes.SET_CATEGORY_LIST,
        payload: categoryList,
    };
};

export const requestCategoryList = () => {
    return async (dispatch) => {
       dispatch(setLoader(true));
        const { data } = await axios.get(`${BASE_URL}category`);
        dispatch(setLoader(false));
        dispatch(setCategoryList(data));
        dispatch(setFilterByCategory(data));

    };
};

export const requestDeleteCategory = (id, token) => {
    return async (dispatch) => {
       await axios.delete(`${BASE_URL}category/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(requestCategoryList());
    };
};

export const requestUpdateCategory = (id, category, token) => {
    return async (dispatch) => {
        await axios.patch(`${BASE_URL}category/${id}`, category, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(requestCategoryList());

    };
};




export const setSingleCategoryForEdit = (singleCategory) => {
    return {
        type: actionTypes.SET_SINGLE_CATEGORY_FOR_EDIT,
        payload: singleCategory
    }
}
export const requestSingleCategory = (id, token) => {
    return async (dispatch) => {
        const {data} = await axios.get(`${BASE_URL}category/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        })
        dispatch(setSingleCategoryForEdit(data));
      
    };
};
