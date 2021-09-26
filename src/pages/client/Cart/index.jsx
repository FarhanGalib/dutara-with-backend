import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    deleteProductFromCart,
    requestAddCartItem,
    requestCartList,
    requestCheckOut,
} from "../../../store/actions/cartAction";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { setCartProductQuantity } from "../../../store/actions/cartAction";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Container,
    Button,
    Grid,
} from "@mui/material";

import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 250 },
    quantity: { display: "flex", flexDirection: "row", itemsAlign: "center" },
    cartContainer: {
        width: "100%",
        marginTop: 30,
        marginBottom: 20,
    },
    tableContainer: { marginBottom: 20, marginRight: 20 },
    cartDetails: { marginBottom: 20 },
    marginLeft: 20,
}));

const Cart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { cartList } = useSelector((state) => state.CartReducer);
    const [reload, setReload] = useState(true);
    const [cart, setCart] = useState();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );

    useEffect(() => {
        dispatch(requestCartList(token));
    }, [reload]);

    // useEffect(() => {
    //     setReload(!reload);
    //     setCart(cartList);
    // }, [cartList]);

    const handleQuantity = (type, productId, quantity) => {
        dispatch(setCartProductQuantity(type, productId, quantity, token));
        setReload(!reload);
    };

    const checkOut = () => {
        dispatch(requestCheckOut(token));
        history.push("/my-order");
    };
    const handleDeleteCartItem = (id) => {
        dispatch(deleteProductFromCart(id, token));
        setReload(!reload);
    };
    return (
        <Container maxWidth="lg" className={classes.cartContainer}>
            <Grid
                container
                spacing={4}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={7}
                    className={classes.tableContainer}
                >
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="cart table"
                        >
                            <TableHead sx={{ backgroundColor: "#cfcfcf" }}>
                                <TableRow>
                                    <TableCell>IMAGE</TableCell>
                                    <TableCell>TITLE</TableCell>
                                    <TableCell>PRICE</TableCell>
                                    <TableCell>QUANTITY</TableCell>
                                    <TableCell>TOTAL PRICE</TableCell>
                                    <TableCell>DELETE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartList && cartList.status !== "error"
                                    ? cartList.products.map((item, index) => (
                                          <TableRow key={item._id}>
                                              <TableCell>
                                                  {" "}
                                                  <img
                                                      style={{
                                                          height: "150px",
                                                          objectFit: "contain",
                                                      }}
                                                      src={`http://localhost:8080/files/${item.productId.image}`}
                                                      alt=""
                                                  />
                                              </TableCell>
                                              <TableCell>
                                                  {item.productId.title}
                                              </TableCell>
                                              <TableCell>
                                                  {item.productId.price} TK
                                              </TableCell>
                                              <TableCell>
                                                  <div
                                                      className={
                                                          classes.quantity
                                                      }
                                                  >
                                                      <IconButton
                                                          style={{
                                                              outline: "none",
                                                          }}
                                                          onClick={() =>
                                                              handleQuantity(
                                                                  "decrement",

                                                                  item.productId
                                                                      ._id,
                                                                  item.quantity
                                                              )
                                                          }
                                                          variant="contained"
                                                          color="secondary"
                                                      >
                                                          <RemoveCircleOutlineIcon />
                                                      </IconButton>
                                                      <p> {item.quantity}</p>

                                                      <IconButton
                                                          style={{
                                                              outline: "none",
                                                          }}
                                                          onClick={() =>
                                                              handleQuantity(
                                                                  "increment",

                                                                  item.productId
                                                                      ._id,
                                                                  item.quantity
                                                              )
                                                          }
                                                          variant="contained"
                                                          color="primary"
                                                      >
                                                          <AddCircleOutlineIcon />
                                                      </IconButton>
                                                  </div>
                                              </TableCell>

                                              <TableCell>
                                                  {item.productId.price *
                                                      item.quantity}{" "}
                                                  TK
                                              </TableCell>
                                              <TableCell>
                                                  <IconButton
                                                      style={{
                                                          outline: "none",
                                                      }}
                                                      onClick={() =>
                                                          handleDeleteCartItem(
                                                              item._id
                                                          )
                                                      }
                                                  >
                                                      <DeleteIcon />
                                                  </IconButton>
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : "Your cart is empty"}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12} md={4} className={classes.cartDetails}>
                    <h3>Cart Details</h3>
                    <br />
                    <p>
                        Total Products: &nbsp;&nbsp;&nbsp;&nbsp;
                        {`${
                            cartList && cartList?.status !== "error"
                                ? cartList?.products.reduce(
                                      (total, item) => total + item.quantity,
                                      0
                                  )
                                : 0
                        }`}
                    </p>

                    <p>
                        Total Price:&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {` ${
                            cartList && cartList?.status !== "error"
                                ? cartList?.products.reduce(
                                      (total, item) =>
                                          total +
                                          item.productId.price * item.quantity,
                                      0
                                  )
                                : 0
                        } TK`}
                    </p>
                    <br />

                    {cartList?.status !== "error" && (
                        <Button
                            style={{ outline: "none" }}
                            variant="contained"
                            color="primary"
                            onClick={() => checkOut()}
                        >
                            Proceed to Checkout
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
