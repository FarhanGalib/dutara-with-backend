import { Container } from "@mui/material";

import React from "react";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { requestAddCartItemSignin } from "../../../store/actions/cartAction";
import { requestCategoryList } from "../../../store/actions/categoryAction";

import Products from "../Products";

const Home = () => {
    const dispatch = useDispatch();
    const { productId } = useSelector((state) => state.PersistedCartStorage);
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );

    useEffect(() => {
        dispatch(requestCategoryList());
    }, []);

    useEffect(() => {
        if (productId && token) {
            dispatch(requestAddCartItemSignin(productId, token));
        }
    }, [productId, token]);

    return (
        <Container maxWidth="lg">
            {/* PRODUCT LIST */}
            <Products></Products>
        </Container>
    );
};

export default Home;
