import Layout from "./components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Loader from "./components/Loader";
import Home from "./pages/shared/Home";
import SignIn from "./pages/shared/SignIn";
import SignUP from "./pages/shared/SignUp";
import Page404 from "./pages/shared/404";
import About from "./pages/shared/About";
import Products from "./pages/shared/Products";
import ProductDetails from "./pages/shared/ProductDetails";

import UserTable from "./pages/admin/User/UserTable";
import AddUser from "./pages/admin/User/AddUser";
import EditUserProfile from "./pages/admin/User/EditUserProfile";

import ProductTable from "./pages/admin/Product/ProductTable";
import AddProduct from "./pages/admin/Product/AddProduct";
import EditProduct from "./pages/admin/Product/EditProduct";

import CategoryTable from "./pages/admin/Category/CategoryTable";
import EditCategory from "./pages/admin/Category/EditCategory";

import Orders from "./pages/admin/Orders";
import UserOrder from "./pages/client/UserOrder";
import Cart from "./pages/client/Cart";
import UserProfile from "./pages/client/UserProfile";

function App() {
    const { role } = useSelector((state) => state.persistedStorage.currentUser);

    return (
        <div>
            <Router>
                <Loader />
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route exact path="/signin">
                            <SignIn />
                        </Route>
                        <Route exact path="/signup">
                            <SignUP />
                        </Route>
                        
                        <Route exact path="/product/:id">
                            <ProductDetails />
                        </Route>

                        {role === "user" && (
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
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <Route exact path="/orders">
                                    <Orders />
                                </Route>
                                <Route exact path="/users">
                                    <UserTable />
                                </Route>
                                <Route exact path="/add-user">
                                    <AddUser />
                                </Route>
                                <Route exact path="/edit-profile/:id">
                                    <EditUserProfile />
                                </Route>
                                <Route exact path="/products">
                                    <ProductTable />
                                </Route>
                                <Route exact path="/add-product">
                                    <AddProduct />
                                </Route>
                                <Route exact path="/product/edit/:id">
                                    <EditProduct />
                                </Route>
                                <Route exact path="/category">
                                    <CategoryTable />
                                </Route>
                                <Route exact path="/category/edit/:id">
                                    <EditCategory />
                                </Route>
                            </>
                        )}

                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route path="*">
                            <Page404 />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
