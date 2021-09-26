import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { requestOrdersByUser } from '../../../store/actions/orderActon';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Container, Paper, Typography } from '@mui/material';




const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650 },
}));

const UserOrder = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const userOrderList = useSelector((state) =>state.UserOrderListReducer.userOrderList)
    const [orderList, setOrderList] = useState({
        status: "",
        time:"",
        shippingAddress: "",
    });
    useEffect(() =>{
        dispatch(requestOrdersByUser(token));
    },[])
    return (
        <Container maxWidth="lg" >

            <Typography sx={{mt:"50px"}} variant="h5"  align="center">My Orders</Typography>
            <TableContainer component={Paper} sx={{mb:"100px"}}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead sx={{backgroundColor:"#bdbdbd"}}>
                                <TableRow>
                                    <TableCell>STATUS</TableCell>
                                    <TableCell>DATE</TableCell>
                                    <TableCell>ADDRESS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userOrderList && userOrderList.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.status===0? "pending": item.status===1? "delivered": "canceled"}</TableCell>
                                        <TableCell>
                                            {new Date(item.date).toUTCString()}
                                        </TableCell>
                                        <TableCell>
                                            {item.userId.address.geolocation.lat}-{item.userId.address.city}- {item.userId.address.zipcode}
                                        </TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
        </Container>
    );
};

export default UserOrder;