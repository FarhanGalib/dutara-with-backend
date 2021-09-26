import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Container,
    FormControl,
    Grid,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector } from "react-redux";
import { requestCategoryList } from "../../../../store/actions/categoryAction";
import {
    requestSingleProduct,
    requestUpdateProduct,
} from "../../../../store/actions/productAction";

const useStyles = makeStyles({});

const EditProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [baseImage, setBaseImage] = useState("");
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
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
    const { singleProductForEdit } = useSelector((state) => state);


    useEffect(() => {
        dispatch(requestCategoryList());
        dispatch(requestSingleProduct(id, token));
    }, []);

 

    useEffect(() => {
        setCurrentProduct({
            ...currentProduct,
            title: singleProductForEdit?.title,
            categoryId: singleProductForEdit?.category._id,
            description: singleProductForEdit?.description,
            price: singleProductForEdit?.price,
            stock: singleProductForEdit?.stock,
            image: singleProductForEdit?.image,
        });
    }, [singleProductForEdit, categoryList]);

    const uploadProductImage = async (e) => {
        setIsImageChanged(true);
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        setCurrentProduct({ ...currentProduct, image: base64 });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const setEditedCurrentProduct = (e, key) => {
        setCurrentProduct({ ...currentProduct, [key]: e.target.value });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        dispatch(
            requestUpdateProduct(id, currentProduct, isImageChanged, token)
        );
        history.push("/products");
    };

    return (
        <Container maxWidth="sm" sx={{my:"50px"}}>
            <Typography variant="h4" className={classes.heading} align="center" sx={{my:"50px"}}>
                Edit <span className={classes.headingStyle2}>Pro</span>
                duct
            </Typography>
            <form type="submit" onSubmit={handleUpdateProduct}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={12} sx={{display:"flex", justifyContent: "center"}}>
                        <img
                            height="400px"
                            src={
                                isImageChanged
                                    ? baseImage
                                    : `http://localhost:8080/files/${currentProduct?.image}`
                            }
                            alt=""
                            style={{objectFit: "contain", height:"400px"}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Title"
                            type="text"
                            value={currentProduct.title}
                            onChange={(e) =>
                                setEditedCurrentProduct(e, "title")
                            }
                            className={classes.txtField}
                        />
                    </Grid>
                   
                    <Grid item xs={12} sm={6}>
                        <input
                            type="file"
                            onChange={(e) => uploadProductImage(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                            required
                            select
                            size="small"
                            label="select category"
                            value={currentProduct.categoryId}
                            className={classes.Category}
                            onChange={(e) =>
                                setCurrentProduct({
                                    ...currentProduct,
                                    categoryId: e.target.value,
                                })
                            }
                            SelectProps={{
                                native: true,
                            }}
                            // helperText="select category"
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
                            value={currentProduct.price}
                            onChange={(e) =>
                                setEditedCurrentProduct(e, "price")
                            }
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
                            value={currentProduct.stock}
                            onChange={(e) =>
                                setEditedCurrentProduct(e, "stock")
                            }
                            className={classes.txtField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Description"
                            type="text"
                            multiline
                            rows={4}
                            value={currentProduct.description}
                            onChange={(e) =>
                                setEditedCurrentProduct(e, "description")
                            }
                            className={classes.txtField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            type="submit"
                            fullWidth
                            startIcon={<SaveIcon />}
                            variant="contained"
                            color="primary"
                            className={classes.btn}
                            style={{outline:"none"}}
                        >
                            Update Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default EditProduct;
