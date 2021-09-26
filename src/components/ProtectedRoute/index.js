import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddProduct from "../../pages/admin/Product/AddProduct";
import AddUser from "../../pages/admin/AddUser";
import Category from "../../pages/admin/Category";
import EditCategory from "../../pages/admin/Category/EditCategory";
import EditUserProfile from "../../pages/admin/EditUserProfile";
import Orders from "../../pages/admin/Orders";
import EditProduct from "../../pages/admin/Product/EditProduct";
import Users from "../../pages/admin/User/UserTable";
import Cart from "../../pages/client/Cart";
import UserOrder from "../../pages/client/UserOrder";
import UserProfile from "../../pages/client/UserProfile";

const ProtectedRoute = ({children}) => {
    return (
        <>
            <Route exact path="/cart">
                <Cart />
            </Route>
            <Route exact path="/my-order">
                <UserOrder />
            </Route>
            <Route exact path="/my-profile">
                <UserProfile />
            </Route>


            <Route exact path="/orders">
                <Orders />
            </Route>
            <Route exact path="/users">
                <Users />
            </Route>
            <Route exact path="/add-user">
                <AddUser />
            </Route>
            <Route exact path="/add-product">
                <AddProduct />
            </Route>
            <Route exact path="/product/edit/:id">
                <EditProduct />
            </Route>
            <Route exact path="/edit-profile/:id">
                <EditUserProfile />
            </Route>
            <Route exact path="/category">
                <Category />
            </Route>
            <Route exact path="/category/edit/:id">
                <EditCategory />
            </Route>
        </>
    );
};

export default ProtectedRoute;
