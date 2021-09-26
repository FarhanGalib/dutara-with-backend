import React, {useEffect} from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography
} from "@mui/material";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { setToken } from "../../store/actions/tokenAction";
import CategoryIcon from '@material-ui/icons/Category';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {useSelector} from "react-redux";
import { requestUserInfoByUser } from '../../store/actions/userAction';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        
        width: drawerWidth,
        
        
    },
    active: {
        backgroundColor: "#f1f1f1",
    },
    item: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#f8f8f8",
        },
    },
    logo: {
        
        paddingLeft: theme.spacing(5),
    },
    logo1: {
        color: "#D44D12",
        fontSize: "45px",
        fontWeight: 600,
        "&:hover": {
            cursor: "pointer",}
    },
    logo2: {
        color: "#91CA55",
        fontSize: "35px",
        fontWeight: 900,
        "&:hover": {
            cursor: "pointer",}
    },
}));

const Sidebar = () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUserInfo = useSelector((state) => state.CurrentUserInfoReducer)
    const {  token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const navlinks = [
        {
            text: "Home",
            icon: <HomeIcon color="primary" />,
            path: "/",
        },
        {
            text: "Products",
            icon: <LocalMallIcon color="primary" />,
            path: "/products",
        },
        {
            text: "Add Product",
            icon: <AddCircleOutlineIcon color="primary" />,
            path: "/add-product",
        },
        {
            text: "Orders",
            icon: <ShoppingCartIcon color="primary" />,
            path: "/orders",
        },
        {
            text: "Add User",
            icon: <PersonAddIcon color="primary" />,
            path: "/add-user",
        },
        {
            text: "Users",
            icon: <PeopleAltIcon color="primary" />,
            path: "/users",
        },
        {
            text: "Categories",
            icon: <CategoryIcon color="primary" />,
            path: "/category",
        },
        
    ];

    useEffect(()=>{
        if(token!=="")
            dispatch(requestUserInfoByUser(token));
    },[token]);

    const signOut = () => {
        dispatch(setToken({userInfo:{user:"", role:"", token:""}}));
        history.push("/signin");
    };
    return (
        <div>
            <Drawer
                className={classes.drawer}
                anchor="left"
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.logo}>
                    <span className={classes.logo1} onClick={() => history.push('/')} >দো</span>
                    <span className={classes.logo2} onClick={() => history.push('/')} >তারা</span>
                    
                </div>
                <Typography variant="h6" align="center" color="primary">Hello Admin,</Typography>
                <Typography variant="p" align="center" color="secondary"><b>@{currentUserInfo && currentUserInfo?.username}</b></Typography>
                <div style={{marginTop:"50px"}}></div>
                <List>
                    {navlinks.map((item) => (
                        <ListItem
                            className={`${classes.item} ${
                                (location.pathname === item.path)
                                    ? classes.active
                                    : null
                            }`}
                            key={item.text}
                            onClick={() => history.push(item.path)}
                        >
                            <ListItemIcon> {item.icon} </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                    <ListItem className={classes.item} onClick={signOut}>
                        <ListItemIcon>
                            {" "}
                            <ExitToAppIcon color="primary" />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default Sidebar;
