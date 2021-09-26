import React, { useEffect, useState } from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { requestCartList } from "../../../store/actions/cartAction";

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))(Badge);

export default function CartBadge() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cartList } = useSelector((state) => state.CartReducer);
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
   
    useEffect(() => {
        dispatch(requestCartList(token));
    }, []);

    return (
        <IconButton onClick={() => history.push("/cart")} aria-label="cart" style={{outline:"none"}}>
            <StyledBadge
                badgeContent={cartList?.status!=="error"?cartList?.products.reduce(
                    (total, item) => total + item.quantity,
                    0
                ):0}
                color="secondary"
                
            >
                <ShoppingCartIcon style={{color: "white"}}/>
            </StyledBadge>
        </IconButton>
    );
}
