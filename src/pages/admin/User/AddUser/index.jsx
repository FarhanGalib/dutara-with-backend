import { Button, Container, TextField, Typography, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { requestAddNewUserByAdmin } from "../../../../store/actions/userAction";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

const AddUser = () => {
    const classes = useStyles();
    const [isLengthOk, setIsLengthOk] = useState(true);
    const [isPassMatched, setIsPassMatched] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const [userAddInfo, setUserAddInfo] = useState({
        lat: "",
        long: "",

        city: "",
        street: "",
        number: 0,
        zipcode: "",

        role: "user",

        email: "",
        username: "",

        phone: "",
        password: "",
        confirmPassword: "",
    });
    const setAddUserForm = (key, e) => {
        setUserAddInfo({ ...userAddInfo, [key]: e.target.value });
    };
    const handleAddUserForm = (e) => {
        e.preventDefault();
        if (
            userAddInfo.password.length > 7 &&
            userAddInfo.password.length < 21
        ) {
            setIsLengthOk(true);
            if (userAddInfo.password === userAddInfo.confirmPassword) {
                setIsPassMatched(true);
                dispatch(requestAddNewUserByAdmin(userAddInfo, token));
                history.push("/users");
            } else {
                setIsPassMatched(false);
            }
        } else {
            setIsLengthOk(false);
        }
    };
    return (
        <Container maxWidth="sm" sx={{ my: "50px" }}>
            <Typography variant="h5" align="center" sx={{ my: "50px" }}>
                Add User
            </Typography>
            <form onSubmit={handleAddUserForm}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            type="email"
                            variant="outlined"
                            label="Email"
                            value={userAddInfo.email}
                            onChange={(e) => setAddUserForm("email", e)}
                            id="email"
                            name="email"
                            className=""
                            required
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label=" Username"
                            value={userAddInfo.username}
                            onChange={(e) => setAddUserForm("username", e)}
                            id="username"
                            name="username"
                            className=""
                            required
                            autoComplete="username"
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            type="password"
                            variant="outlined"
                            label="Password"
                            helperText="password must be 8-20 characters"
                            value={userAddInfo.password}
                            onChange={(e) => setAddUserForm("password", e)}
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            className=""
                            required
                            error={!isLengthOk ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            type="password"
                            variant="outlined"
                            label="Confirm Password"
                            // helperText="password must be 8-20 characters"
                            value={userAddInfo.confirmPassword}
                            onChange={(e) =>
                                setAddUserForm("confirmPassword", e)
                            }
                            id="confirmPassword"
                            name="confirmPassword"
                            className=""
                            required
                            autoComplete="new-password"
                            error={!isPassMatched}
                        />

                        {!isPassMatched && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                password not matched
                            </p>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="Street"
                            value={userAddInfo.street}
                            onChange={(e) => setAddUserForm("street", e)}
                            id="street"
                            name="street"
                            className=""
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            select
                            value={userAddInfo.role}
                            className={classes.sortByCategory}
                            onChange={(e) =>
                                setUserAddInfo({
                                    ...userAddInfo,
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
                            label="Latitude"
                            value={userAddInfo.lat}
                            onChange={(e) => setAddUserForm("lat", e)}
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
                            value={userAddInfo.long}
                            onChange={(e) => setAddUserForm("long", e)}
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
                            label="Phone Number"
                            value={userAddInfo.phone}
                            onChange={(e) => setAddUserForm("phone", e)}
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
                            label="Zip Code"
                            value={userAddInfo.zipcode}
                            onChange={(e) => setAddUserForm("zipcode", e)}
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
                            value={userAddInfo.number}
                            onChange={(e) => setAddUserForm("number", e)}
                            id="number"
                            name="number"
                            className=""
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            label="City"
                            value={userAddInfo.city}
                            onChange={(e) => setAddUserForm("city", e)}
                            id="city"
                            name="city"
                            className=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            style={{ outline: "none" }}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddUser;
