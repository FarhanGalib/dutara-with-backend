import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Grid,
    Typography,
    TextField,
    InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { requestProductList } from "../../../store/actions/productAction";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import {
    requestAddCartItem,
    setPersistedCart,
} from "../../../store/actions/cartAction";

//////////////////////////////////////
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import { setSearchText } from "../../../store/actions/searchAction";
import { requestCategoryList } from "../../../store/actions/categoryAction";
import Pagination1 from "../../../components/Pagination";
const theme = createTheme();

///////////////////////////////////////////////
const useStyles = makeStyles((theme) => ({}));

const Products = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { productList } = useSelector((state) => state);
    const searchText = useSelector((state) => state.SearchText);
    const categoryList = useSelector(
        (state) => state.CategoryListForFilterReducer
    );
    const [category, setCategory] = useState("All");
    const { role, token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    useEffect(() => {
        dispatch(requestProductList(token));
        dispatch(requestCategoryList());
    }, []);

    const handleAddToCart = (productId) => {
        if (token === "") {
            dispatch(setPersistedCart(productId));
            history.push("/signin");
        } else if (role === "user") {
            dispatch(requestAddCartItem(productId, token));
        }
    };
    const handleProductDetails = (id) => {
        history.push(`/product/${id}`);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = productList
        ? productList.slice(indexOfFirstPost, indexOfLastPost)
        : null;
    return (
        <>
            <Container maxWidth="lg">
                <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.title}
                    sx={{ my: "50px" }}
                >
                    Product-List
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        {/* CATEGORY */}

                        <TextField
                            select
                            size="small"
                            label="filter by category"
                            sx={{ backgroundColor: "white" }}
                            value={category}
                            className={classes.sortByCategory}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                dispatch(setSearchText(""));
                            }}
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                                native: true,
                            }}
                            InputLabelProps={{ shrink: true }}
                            // helperText="filter product by category"
                        >
                            {categoryList?.map((c) => (
                                <option key={c._id} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* SEARCH BAR */}
                        <div>
                            <TextField
                                value={searchText}
                                size="small"
                                //className={classes.searchTxt}
                                sx={{ backgroundColor: "white" }}
                                fullWidth
                                type="text"
                                label="Search products"
                                placeholder="Search..."
                                onChange={(e) => {
                                    dispatch(setSearchText(e.target.value));
                                    setCategory("All");
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container>
            {(searchText !== "" || category !== "All") && (
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Container sx={{ py: 8 }} maxWidth="lg">
                        <Grid container spacing={3}>
                            {productList &&
                                productList
                                    .filter((product) => {
                                        if (category === "All") return product;
                                        else
                                            return category ===
                                                product?.category.name
                                                ? product
                                                : null;
                                    })
                                    .filter((product) => {
                                        if (searchText === "") return product;
                                        else if (
                                            product.title
                                                .toLowerCase()
                                                .includes(
                                                    searchText.toLowerCase()
                                                )
                                        )
                                            return product;
                                    })
                                    .map((product) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            md={3}
                                            key={product._id}
                                        >
                                            <Card
                                                sx={{
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <CardHeader
                                                    subheader={
                                                        product.category.name
                                                    }
                                                />

                                                <img
                                                    src={`http://localhost:8080/files/${product.image}`}
                                                    style={{
                                                        height: "200px",
                                                        margin: "auto",
                                                        width: "100%",
                                                        objectFit: "contain",
                                                    }}
                                                    alt={product.title}
                                                />
                                                <CardContent
                                                    sx={{ flexGrow: 1 }}
                                                >
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="h2"
                                                    >
                                                        {product.title}
                                                    </Typography>
                                                    <Typography variant="small">
                                                        {`${product.price} TK`}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: `${
                                                            role !== "admin"
                                                                ? "space-between"
                                                                : "right"
                                                        }`,
                                                    }}
                                                >
                                                    {role !== "admin" && (
                                                        <Button
                                                            style={{
                                                                outline: "none",
                                                            }}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{
                                                                "&:hover": {
                                                                    backgroundColor:
                                                                        "#306ddf",
                                                                    color: "white",
                                                                },
                                                            }}
                                                            onClick={() =>
                                                                handleAddToCart(
                                                                    product._id
                                                                )
                                                            }
                                                        >
                                                            add to cart
                                                        </Button>
                                                    )}
                                                    <Button
                                                        style={{
                                                            outline: "none",
                                                        }}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            "&:hover": {
                                                                backgroundColor:
                                                                    "#306ddf",
                                                                color: "white",
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            handleProductDetails(
                                                                product._id
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                        </Grid>
                    </Container>
                </ThemeProvider>
            )}
            {searchText === "" && category === "All" && (
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Container sx={{ py: 8 }} maxWidth="lg">
                        <Grid container spacing={3}>
                            {productList &&
                                currentPosts
                                    .filter((product) => {
                                        if (category === "All") return product;
                                        else
                                            return category ===
                                                product?.category.name
                                                ? product
                                                : null;
                                    })
                                    .filter((product) => {
                                        if (searchText === "") return product;
                                        else if (
                                            product.title
                                                .toLowerCase()
                                                .includes(
                                                    searchText.toLowerCase()
                                                )
                                        )
                                            return product;
                                    })
                                    .map((product) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            md={3}
                                            key={product._id}
                                        >
                                            <Card
                                                sx={{
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <CardHeader
                                                    subheader={
                                                        product.category.name
                                                    }
                                                />

                                                <img
                                                    src={`http://localhost:8080/files/${product.image}`}
                                                    style={{
                                                        height: "200px",
                                                        margin: "auto",
                                                        width: "100%",
                                                        objectFit: "contain",
                                                    }}
                                                    alt={product.title}
                                                />
                                                <CardContent
                                                    sx={{ flexGrow: 1 }}
                                                >
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="h2"
                                                    >
                                                        {product.title}
                                                    </Typography>
                                                    <Typography variant="small">
                                                        {`${product.price} TK`}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: `${
                                                            role !== "admin"
                                                                ? "space-between"
                                                                : "right"
                                                        }`,
                                                    }}
                                                >
                                                    {role !== "admin" && (
                                                        <Button
                                                            style={{
                                                                outline: "none",
                                                            }}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{
                                                                "&:hover": {
                                                                    backgroundColor:
                                                                        "#306ddf",
                                                                    color: "white",
                                                                },
                                                            }}
                                                            onClick={() =>
                                                                handleAddToCart(
                                                                    product._id
                                                                )
                                                            }
                                                        >
                                                            add to cart
                                                        </Button>
                                                    )}
                                                    <Button
                                                        style={{
                                                            outline: "none",
                                                        }}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            "&:hover": {
                                                                backgroundColor:
                                                                    "#306ddf",
                                                                color: "white",
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            handleProductDetails(
                                                                product._id
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                        </Grid>
                    </Container>
                </ThemeProvider>
            )}
            {category === "All" && searchText === "" && (
                <Pagination1
                    style={{ outline: "none" }}
                    postsPerPage={postsPerPage}
                    totalPosts={productList?.length}
                    paginate={paginate}
                />
            )}
        </>
    );
};

export default Products;
