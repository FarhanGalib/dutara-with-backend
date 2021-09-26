import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector } from "react-redux";
import { requestCategoryList } from "../../../../store/actions/categoryAction";
import { requestAddNewProduct } from "../../../../store/actions/productAction";

const useStyles = makeStyles({});

const AddProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [baseImage, setBaseImage] = useState("");
    const [isImageChanged, setIsImageChanged] = useState(false);

    const [newProduct, setNewProduct] = useState({
        title: "",
        categoryId: "",
        description: "",
        price: "",
        stock: "",
        image: "",
    });
    const { categoryList } = useSelector((state) => state.categoryStore);

    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );

    useEffect(() => {
        dispatch(requestCategoryList());
    }, []);

    useEffect(() => {
        setNewProduct({
            ...newProduct,
            categoryId: categoryList[0]?._id,
        });
    }, [categoryList]);

    const uploadProductImage = async (e) => {
        setIsImageChanged(true);
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        setNewProduct({ ...newProduct, image: base64 });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const setAddProduct = (e, key) => {
        setNewProduct({ ...newProduct, [key]: e.target.value });
    };

    const requestAddProduct = (e) => {
        e.preventDefault();
        dispatch(requestAddNewProduct(newProduct, token));
        history.push("/products");
    };

    return (
        <Container maxWidth="sm" sx={{ mb: "100px" }}>
            <Typography
                variant="h4"
                align="center"
                className={classes.heading}
                sx={{ my: "50px" }}
            >
                Add Product
            </Typography>
            <form type="submit" onSubmit={requestAddProduct}>
                <Grid container spacing={2}>
                    {isImageChanged && (
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <img
                                style={{
                                    height: "300px",
                                    objectFit: "contain",
                                }}
                                src={isImageChanged ? baseImage : null}
                                alt=""
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Title"
                            type="text"
                            value={newProduct.title}
                            onChange={(e) => setAddProduct(e, "title")}
                            className={classes.txtField}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <input
                            type="file"
                            onChange={(e) => uploadProductImage(e)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            select
                            value={newProduct._id}
                            className={classes.sortByCategory}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    categoryId: e.target.value,
                                })
                            }
                            SelectProps={{
                                native: true,
                            }}
                            helperText="select category"
                        >
                            {categoryList.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setAddProduct(e, "price")}
                            className={classes.txtField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setAddProduct(e, "stock")}
                            className={classes.txtField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Description"
                            type="text"
                            multiline
                            rows={4}
                            value={newProduct.description}
                            onChange={(e) => setAddProduct(e, "description")}
                            className={classes.txtField}
                        />
                    </Grid>
                    <Grid item xm={12} sm={12}>
                        <Button
                            style={{ outline: "none" }}
                            fullWidth
                            type="submit"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            color="primary"
                            className={classes.btn}
                        >
                            Add Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddProduct;
