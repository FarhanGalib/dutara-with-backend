import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Typography,
} from "@mui/material";
import { IconButton } from "@material-ui/core";
import { requestOrderList } from "../../../store/actions/orderActon";
import { requestChangeOrderStatus } from "../../../store/actions/orderActon";
import HelpIcon from "@material-ui/icons/Help";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650 },
    actions: {},
    pending: { backgroundColor: "#f4b328", marginRight: 5, color: "white" },
    delivered: {
        backgroundColor: "#2cea60",
        marginLeft: 5,
        marginRight: 5,
        color: "white",
    },
    canceled: {
        backgroundColor: "#ff1515",
        marginLeft: 5,
        marginRight: 5,
        color: "white",
    },
}));
const Orders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [orders, setOrders] = useState(null);
    const { orderList } = useSelector((state) => state.OrdersReducer);
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );

    useEffect(() => {
        dispatch(requestOrderList(token));
    }, []);

    useEffect(() => {
        setOrders(orderList);
    }, [orderList]);

    const handleStatus = (orderId, status) => {
        dispatch(requestChangeOrderStatus(orderId, status, token));
    };
    return (
        <Container maxWidth="lg" sx={{ my: "50px", mb: "500px" }}>
            <Typography variant="h5" align="center" sx={{ my: "50px" }}>
                Orders
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#BDBDBD" }}>
                        <TableRow>
                            <TableCell>ORDER OF</TableCell>
                            <TableCell>ORDER TIME</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell>SHIPPING ADDRESS</TableCell>
                            <TableCell>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList &&
                            orderList.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        {`${item.userId.firstname} ${item.userId.lastname}`}{" "}
                                        <br />
                                        {`@${item.userId.username}`}{" "}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(item.date).toUTCString()}
                                    </TableCell>
                                    <TableCell>
                                        {item.status === 0
                                            ? "pending"
                                            : item.status === 1
                                            ? "delivered"
                                            : "canceled"}
                                    </TableCell>
                                    <TableCell>
                                        {item.userId.address.geolocation.lat}-
                                        {item.userId.address.geolocation.long}-
                                        {item.userId.address.city}-
                                        {item.userId.address.zipcode}
                                    </TableCell>
                                    <TableCell>
                                        <div className={classes.actions}>
                                            <IconButton
                                                style={{ outline: "none" }}
                                                disabled={
                                                    item?.status === 0
                                                        ? true
                                                        : false
                                                }
                                                variant="contained"
                                                className={classes.pending}
                                                onClick={() =>
                                                    handleStatus(item._id, 0)
                                                }
                                            >
                                                <HelpIcon />
                                            </IconButton>
                                            <IconButton
                                                style={{ outline: "none" }}
                                                disabled={
                                                    item?.status === 1
                                                        ? true
                                                        : false
                                                }
                                                variant="contained"
                                                className={classes.delivered}
                                                onClick={() =>
                                                    handleStatus(item._id, 1)
                                                }
                                            >
                                                <CheckIcon />
                                            </IconButton>
                                            <IconButton
                                                style={{ outline: "none" }}
                                                disabled={
                                                    item?.status === 2
                                                        ? true
                                                        : false
                                                }
                                                variant="contained"
                                                className={classes.canceled}
                                                onClick={() =>
                                                    handleStatus(item._id, 2)
                                                }
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Orders;
