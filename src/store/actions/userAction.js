import axios from "axios";
import { actionTypes } from "../actionTypes";
import { setLoader } from "./loaderAction";

export const addNewUser = (newUser) => {
    return {
        type: actionTypes.ADD_NEW_USER,
        payload: newUser,
    };
};

export const requestAddNewUser = (newUser) => {
    const {
        email,
        username,
        password,
        firstname,
        lastname,
        phone,
        city,
        street,
        number,
        zipcode,
        lat,
        long,
    } = newUser;

    return async (dispatch) => {
        const { data } = await axios.post("http://localhost:8080/signup", {
            email: email,
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            address: {
                city: city,
                street: street,
                number: number,
                zipcode: zipcode,
                geolocation: {
                    lat: lat,
                    long: long,
                },
            },
            phone: phone,
        });

        dispatch(addNewUser(data));
    };
};



export const setUserList = (userList)=>{
    return {
        type: actionTypes.SET_USER_LIST,
        payload: userList,
    };
};

export const requestUserList = (token) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        const { data } = await axios.get("http://localhost:8080/user/", {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(setUserList(data));
        dispatch(setLoader(false));
        
    };
};





export const requestDeleteSingleUser = (id,token) => {
    return async (dispatch) => {
        const { data } = await axios.delete(`http://localhost:8080/user/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(requestUserList(token));
    };
};






export const setSingleUserInfoForEdit = (singleUser)=>{
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: singleUser,
    };
};


export const requestSingleUserInfo = (id,token) => {
    return async (dispatch) => {
        dispatch(setLoader(true));

        const { data } = await axios.get(`http://localhost:8080/user/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(setSingleUserInfoForEdit(data));
        dispatch(setLoader(false));
        
       
    };
};





export const requestUserUpdate = (id,token, currentUserUpdatedInfo) => {
    return async (dispatch) => {
        const { data } = await axios.patch(`http://localhost:8080/user/${id}`,
        {
            address: {
                geolocation: {
                    lat: currentUserUpdatedInfo.lat,
                    long: currentUserUpdatedInfo.long,
                },
                city: currentUserUpdatedInfo.city ,
                number: currentUserUpdatedInfo.number,
                zipcode: currentUserUpdatedInfo.zipcode
            },
            role: currentUserUpdatedInfo.role,
            email: currentUserUpdatedInfo.email, 
            username: currentUserUpdatedInfo.username, 
            
            firstname: currentUserUpdatedInfo.firstname ,
            lastname: currentUserUpdatedInfo.lastname,
            phone: currentUserUpdatedInfo.phone
            
        }, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(requestUserList(token));
    
       
    };
};


export const requestAddNewUserByAdmin =(newUserInfo,token)=>{
    return async (dispatch)=>{
        await axios.post("http://localhost:8080/user",
        {
            address: {
                geolocation: {
                    lat: newUserInfo.lat,
                    long: newUserInfo.long,
                },
                city: newUserInfo.city ,
                street:newUserInfo.street,
                number: newUserInfo.number,
                zipcode: newUserInfo.zipcode
            },
            role: newUserInfo.role,
            email: newUserInfo.email, 
            username: newUserInfo.username, 
            
            
            phone: newUserInfo.phone,
            password: newUserInfo.password
        },
        {
            headers: {
                authorization: `bearer ${token}`,
            },
        }
        );
        dispatch(requestUserList(token));

    }
}


export const setUserProfileInfo = (userInfo)=>{
    return {
        type: actionTypes.SET_USER_PROFILE,
        payload: userInfo,
    };
};
export const requestUserInfoByUser=(token)=>{
    return async (dispatch) => {
        dispatch(setLoader(true));

        const {data} =await axios.get("http://localhost:8080/my-detail",
        {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(setUserProfileInfo(data));
        dispatch(setLoader(false));

    };
}






export const requestUpdateUserInfo=(userInfo, token)=>{
    return async () =>{
        const {data}=await axios.patch(`http://localhost:8080/my-detail`,
        {
            address: {
                geolocation: {
                    lat: userInfo.lat,
                    long: userInfo.long
                },
                city: userInfo.city,
                street: userInfo.street,
                number: parseInt(userInfo.number),
                zipcode: userInfo.zipcode
            },
            role: userInfo.role,
            email: userInfo.email,
            username: userInfo.username,
            phone: userInfo.phone,
            password: userInfo.password 
        },
        {
            headers: {
                authorization: `bearer ${token}`,
            }
        }
        );
    }
}