import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    requestSingleUserInfo,
    requestUserUpdate,
} from "../../../../store/actions/userAction";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({}));

const EditUserProfile = () => {
    const { id } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [toggle, setToggle] = useState(true);
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { currentUserInfo } = useSelector((state) => state.EditUserReducer);
    const [userUpdateForm, setUserUpdateForm] = useState({
        lat: "",
        long: "",

        city: "",
        number: 0,
        zipcode: "",

        role: "",

        email: "",
        username: "",
        firstname: "",
        lastname: "",
        phone: "",
    });

    useEffect(() => {
        dispatch(requestSingleUserInfo(id, token));
    }, []);
    useEffect(() => {
        setUserUpdateForm({
            ...userUpdateForm,
            lat: currentUserInfo?.address.geolocation.lat,
            long: currentUserInfo?.address.geolocation.long,

            city: currentUserInfo?.address.city,
            number: currentUserInfo?.address.number,
            zipcode: currentUserInfo?.address.zipcode,

            role: currentUserInfo?.role,

            email: currentUserInfo?.email,
            username: currentUserInfo?.username,
            firstname: currentUserInfo?.firstname,
            lastname: currentUserInfo?.lastname,
            phone: currentUserInfo?.phone,
        });
    }, [currentUserInfo]);

    const setForm = (key, e) => {
        setUserUpdateForm({ ...userUpdateForm, [key]: e.target.value });
    };
    const handleUserUpdateForm = (e) => {
        e.preventDefault();
        dispatch(requestUserUpdate(id, token, userUpdateForm));
        history.push("/users");
    };

    return (
        <Container maxWidth="sm" sx={{ my: "50px" }}>
            <Typography variant="h5" align="center" sx={{ my: "50px" }}>
                Edit User
            </Typography>
            <form onSubmit={handleUserUpdateForm}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            type="email"
                            variant="outlined"
                            label="Email"
                            value={userUpdateForm.email}
                            onChange={(e) => setForm("email", e)}
                            id="email"
                            name="email"
                            className=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="Username"
                            value={userUpdateForm.username}
                            onChange={(e) => setForm("username", e)}
                            id="username"
                            name="username"
                            className=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="First name"
                            value={userUpdateForm.firstname}
                            onChange={(e) => setForm("firstname", e)}
                            id="firstname"
                            name="firstname"
                            className=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="Last Name"
                            value={userUpdateForm.lastname}
                            onChange={(e) => setForm("lastname", e)}
                            id="lastname"
                            name="lastname"
                            className=""
                            required
                        />
                    </Grid>
                    {/* <TextField
                        type="text"
                        variant="outlined"
                        label="Role"
                        value={userUpdateForm.role}
                        onChange={(e) => setForm("role", e)}
                        id="role"
                        name="role"
                        className=""
                        required
                    /> */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            select
                            value={userUpdateForm.role}
                            className={classes.sortByCategory}
                            onChange={(e) =>
                                setUserUpdateForm({
                                    ...userUpdateForm,
                                    role: e.target.value,
                                })
                            }
                            SelectProps={{
                                native: true,
                            }}
                            label="select role"
                            variant="outlined"
                        >
                            {["user", "admin"].map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="Phone Number"
                            value={userUpdateForm.phone}
                            onChange={(e) => setForm("phone", e)}
                            id="phone"
                            name="phone"
                            className=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="Latitude"
                            value={userUpdateForm.lat}
                            onChange={(e) => setForm("lat", e)}
                            id="lat"
                            name="lat"
                            className=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="Longitude"
                            value={userUpdateForm.long}
                            onChange={(e) => setForm("long", e)}
                            id="long"
                            name="long"
                            className=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="Zip Code"
                            value={userUpdateForm.zipcode}
                            onChange={(e) => setForm("zipcode", e)}
                            id="zipcode"
                            name="zipcode"
                            className=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="House no."
                            value={userUpdateForm.number}
                            onChange={(e) => setForm("number", e)}
                            id="number"
                            name="number"
                            className=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="City"
                            value={userUpdateForm.city}
                            onChange={(e) => setForm("city", e)}
                            id="city"
                            name="city"
                            className=""
                            required
                        />
                    </Grid>
                    {/* <Grid item xs={12} sm={12}></Grid>
                    <Grid item xs={12} sm={12}></Grid> */}
                    <Grid item xs={12} sm={12}>
                        <Button
                            style={{ outline: "none" }}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            UPDATE
                        </Button>
                    </Grid>{" "}
                </Grid>
            </form>
        </Container>
    );
};

export default EditUserProfile;
