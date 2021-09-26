import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    requestUpdateUserInfo,
    requestUserInfoByUser,
} from "../../../store/actions/userAction";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    txtField: {
        marginBottom: 15,
    },
}));

const UserProfile = () => {
    const classes = useStyles();
    const [isLengthOk, setIsLengthOk] = useState(true);
    const [isPassMatched, setIsPassMatched] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { CurrentUserInfoReducer: currentUser } = useSelector(
        (state) => state
    );
    const [user, setUser] = useState({
        lat: "",
        long: "",

        city: "",
        street: "",
        number: 0,
        zipcode: "",

        role: "",
        email: "",
        username: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        dispatch(requestUserInfoByUser(token));
    }, []);

    useEffect(() => {
        setUser({
            ...user,
            lat: currentUser?.address.geolocation.lat,
            long: currentUser?.address.geolocation.long,

            city: currentUser?.address.city,
            street: currentUser?.address.street,
            number: currentUser?.address.number,
            zipcode: currentUser?.address.zipcode,

            role: currentUser?.role,
            email: currentUser?.email,
            username: currentUser?.username,
            phone: currentUser?.phone,
        });
    }, [currentUser]);

    const handleChange = (e, key) => {
        setUser({ ...user, [key]: e.target.value });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
      
        if (user.password.length > 7 && user.password.length < 21) {
            setIsLengthOk(true);
            if (user.password === user.confirmPassword) {
                setIsPassMatched(true);
                dispatch(requestUpdateUserInfo(user, token));
                history.push("/home");
            } else {
                setIsPassMatched(false);
            }
        } else {
            setIsLengthOk(false);
        }
    };
    return (
        <Container maxWidth="sm" sx={{ my: "50px" }}>
            <Typography variant="h5" sx={{ mb: "50px" }}>
                Edit <span style={{ color: "orange" }}>Pro</span>file
            </Typography>
            {currentUser && (
                <form type="submit" onSubmit={handleUpdate}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="Email"
                                type="email"
                                value={user?.email}
                                onChange={(e) => handleChange(e, "email")}
                                className={classes.txtField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="username"
                                type="text"
                                value={user?.username}
                                onChange={(e) => handleChange(e, "username")}
                                className={classes.txtField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="password"
                                type="password"
                                value={user?.password}
                                onChange={(e) => handleChange(e, "password")}
                                className={classes.txtField}
                            />
                            {!isLengthOk && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    password must be 8-20 character
                                </p>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                variant="outlined"
                                label="confirm password"
                                value={user?.confirmPassword}
                                onChange={(e) =>
                                    handleChange(e, "confirmPassword")
                                }
                                className={classes.txtField}
                            />

                            {!isPassMatched && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    password not matched
                                </p>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="role"
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={user?.role}
                                //onChange={(e) => handleChange(e, "role")}
                                className={classes.txtField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="Latitude"
                                type="text"
                                value={user?.lat}
                                onChange={(e) => handleChange(e, "lat")}
                                className={classes.txtField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="Longitude"
                                type="text"
                                value={user?.long}
                                onChange={(e) => handleChange(e, "long")}
                                className={classes.txtField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="city"
                                type="text"
                                value={user?.city}
                                onChange={(e) => handleChange(e, "city")}
                                className={classes.txtField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="street"
                                type="text"
                                onChange={(e) => handleChange(e, "street")}
                                className={classes.txtField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="number"
                                type="number"
                                value={user?.number}
                                onChange={(e) => handleChange(e, "number")}
                                className={classes.txtField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="zipcode"
                                type="text"
                                value={user?.zipcode}
                                onChange={(e) => handleChange(e, "zipcode")}
                                className={classes.txtField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                style={{ outline: "none" }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Container>
    );
};

export default UserProfile;
