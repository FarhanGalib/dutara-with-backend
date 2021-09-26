import { Container, TextField, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    requestSingleCategory,
    requestUpdateCategory,
} from "../../../../store/actions/categoryAction";

const useStyles = makeStyles((theme) => ({}));

const EditCategory = () => {
    const classes = useStyles();
    const [category, setCategory] = useState({
        name: "",
        description: "",
    });

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { name, description } = useSelector(
        (state) => state.EditCategoryReducer.categoryForEdit
    );
    

    useEffect(() => {
        dispatch(requestSingleCategory(id, token));
        setCategory({ ...category, name: name, description: description });
    }, []);

    useEffect(() => {
        setCategory({ ...category, name: name, description: description });
    }, [name, description]);

    const handleUpdateCategory = (e) => {
        e.preventDefault();
        dispatch(requestUpdateCategory(id, category, token));
        setCategory({ name: "", description: "" });
        history.push("/category");
    };

    return (
        <Container maxWidth="sm" sx={{ my: "80px", mb:"500px" }}>
            <Typography variant="h5" align="center" sx={{ my: "50px" }}>
                Edit Category
            </Typography>
            <form onSubmit={handleUpdateCategory}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="category name"
                            variant="outlined"
                            className={classes.input}
                            onChange={(e) =>
                                setCategory({
                                    ...category,
                                    name: e.target.value,
                                })
                            }
                            value={category.name}
                            placeholder="Category Name"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="category description"
                            variant="outlined"
                            className={classes.input}
                            onChange={(e) =>
                                setCategory({
                                    ...category,
                                    description: e.target.value,
                                })
                            }
                            value={category.description}
                            placeholder="Category description"
                            required
                            multiline
                            rows={4}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="submit"
                            className={classes.updateBtn}
                            variant="contained"
                            style={{outline:"none"}}
                        >
                            update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default EditCategory;
