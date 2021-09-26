import React, { useState } from "react";
import Header from "../Header/NavBar";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: "#f5f5f5f5"

    },
    flexSidebarChildren: {
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
    },
    children: {
        flexGrow: 1,
         backgroundColor: "#f5f5f5f5"
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();
    const { role } = useSelector(
        (state) => state.persistedStorage.currentUser
    );

    return (
        <div className={classes.root}>
            {(role === "" || role === "user") && <Header></Header>}
            <div
                className={`${
                    role === "admin" ? classes.flexSidebarChildren : null
                }`}
            >
                {role === "admin" && <Sidebar></Sidebar>}
                <div className={classes.children}>{children}</div>
            </div>

            {(role === "" || role === "user") && <Footer />}
        </div>
    );
};

export default Layout;
