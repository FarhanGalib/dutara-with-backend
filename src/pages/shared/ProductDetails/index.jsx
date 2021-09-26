// import { Button, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { requestSingleProduct } from "../../../store/actions/productDetailsAction";
import { makeStyles } from "@material-ui/core/styles";
import { requestAddToCart } from "../../../store/actions/cartAction";
/////////////////////////////////////
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Card,
    CardContent,
    Button,
    Container,
    Grid,
    Typography,
    CardActions,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { requestDeleteProduct } from "../../../store/actions/productAction";
const customGridBreakpoints = createTheme({
    breakpoints: {
        values: {
            xm: 0,
            sm: 600,
            md: 1000,
            lg: 1280,
            xl: 1920,
        },
    },
});
////////////////////////////////////
const useStyles = makeStyles((theme) => ({
    quantity: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        marginBottom: 15,
    },
    pieces: {
        marginLeft: 5,
        marginRight: 5,
    },
    root: {
        minWidth: 500,
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: "#f5f5f5f5",
    },
    media: {
        height: 400,
        width: 400,
        padding: 30,
        objectFit: "contain",
    },
}));
const ProductDetails = () => {
    const classes = useStyles();
    const [pieces, setPieces] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { token, role } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const currentProduct = useSelector((state) => state.productDetailsReducer);

    useEffect(() => {
        dispatch(requestSingleProduct(id, token));
    }, []);

    const handleNumberOfPieces = (type) => {
        if (type === "increment") {
            setPieces(pieces + 1);
        } else {
            if (pieces > 1) {
                setPieces(pieces - 1);
            }
        }
    };
    const handleAddToCart = () => {
        if (token !== "") {
            dispatch(requestAddToCart(id, pieces, token));
            history.push("/cart");
        } else {
            history.push("/signin");
        }
    };

    const handleDeleteProduct = () => {
        dispatch(requestDeleteProduct(id, token));
        history.push("/");
    };

    const handleEditProduct = () => {
        history.push(`/product/edit/${id}`);
    };

    return (
        <>
            {currentProduct && (
                <Container className={classes.root} sx={{ my: "150px" }}>
                    <ThemeProvider theme={customGridBreakpoints}>
                        <Card className={classes.card}>
                            <Grid container spacing={4}>
                                <Grid item sm={12} md={6}>
                                    <img
                                        src={`http://localhost:8080/files/${currentProduct.image}`}
                                        className={classes.media}
                                        alt=""
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <CardContent>
                                        <Typography variant="h4" gutterBottom>
                                            {currentProduct?.title}{" "}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            Category:{" "}
                                            {currentProduct?.category.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            <small>
                                                {currentProduct?.description}
                                            </small>
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            {currentProduct?.price}tk
                                        </Typography>
                                    </CardContent>
                                    <CardActions
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start",
                                        }}
                                        className={classes.action}
                                    >
                                        {role !== "admin" && (
                                            <div className={classes.quantity}>
                                                <Button
                                                    style={{ outline: "none" }}
                                                    size="big"
                                                    onClick={() =>
                                                        handleNumberOfPieces(
                                                            "decrement"
                                                        )
                                                    }
                                                >
                                                    <RemoveCircleOutlineIcon />
                                                </Button>
                                                <p className={classes.pieces}>
                                                    {pieces}
                                                </p>
                                                <Button
                                                    style={{ outline: "none" }}
                                                    size="big"
                                                    onClick={() =>
                                                        handleNumberOfPieces(
                                                            "increment"
                                                        )
                                                    }
                                                >
                                                    <ControlPointIcon />
                                                </Button>
                                            </div>
                                        )}

                                        {role !== "admin" && (
                                            <Button
                                                style={{ outline: "none" }}
                                                startIcon={
                                                    <AddShoppingCartIcon />
                                                }
                                                variant="contained"
                                                color="primary"
                                                onClick={handleAddToCart}
                                            >
                                                add to cart
                                            </Button>
                                        )}
                                        {role === "admin" && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <Button
                                                    style={{ outline: "none" }}
                                                    sx={{ mr: "20px" }}
                                                    startIcon={<EditIcon />}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleEditProduct}
                                                >
                                                    edit
                                                </Button>
                                                <Button
                                                    style={{ outline: "none" }}
                                                    startIcon={<DeleteIcon />}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={
                                                        handleDeleteProduct
                                                    }
                                                >
                                                    delete
                                                </Button>
                                            </div>
                                        )}
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </Card>
                    </ThemeProvider>
                </Container>
            )}
        </>
    );
};

export default ProductDetails;
