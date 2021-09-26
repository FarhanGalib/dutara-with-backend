import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { requestAddNewUser } from "../../../store/actions/userAction";
import { useState } from "react";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignUp() {
    const [signUpInfo, setSignUpInfo] = useState({
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        city: "",
        street: "",
        number: "",
        zipcode: "",
        lat: "",
        long: "",
        phone: "",
    });

    const [confirmPass, setConfirmPass] = useState("");
    const [isPassMatched, setIsPassMatched] = useState(true);
    const [isLengthOk, setIsLengthOk] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    // const [email, setEmail] = useState("");
    // const [pass, setPass] = useState("");

    const setRegValue = (key, e) => {
        setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    };
    const handleSignUp = (e) => {
        e.preventDefault();
        if (signUpInfo.password.length > 7 && signUpInfo.password.length < 21) {
            setIsLengthOk(true);
            if (signUpInfo.password === confirmPass) {
                setIsPassMatched(true);
                dispatch(requestAddNewUser(signUpInfo));
                history.push("/signin");
            } else {
                setIsPassMatched(false);
            }
        } else {
            setIsLengthOk(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        mb: "50px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        validate
                        onSubmit={handleSignUp}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={signUpInfo.firstname}
                                    onChange={(e) =>
                                        setRegValue("firstname", e)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={signUpInfo.lastname}
                                    onChange={(e) => setRegValue("lastname", e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userName"
                                    label=" username"
                                    name="username"
                                    autoComplete="username"
                                    value={signUpInfo.username}
                                    onChange={(e) => setRegValue("username", e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label=" City"
                                    name="city"
                                    autoComplete="city"
                                    value={signUpInfo.city}
                                    onChange={(e) => setRegValue("city", e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={signUpInfo.email}
                                    onChange={(e) => setRegValue("email", e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={signUpInfo.password}
                                    onChange={(e) => setRegValue("password", e)}
                                    helperText="password must be 8-10 characters"
                                    error={!isLengthOk}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm-password"
                                    label="confirm-password"
                                    type="password"
                                    id="confirm-password"
                                    autoComplete="new-password"
                                    value={confirmPass}
                                    onChange={(e) =>
                                        setConfirmPass(e.target.value)
                                    }
                                    error={
                                        signUpInfo.password !== confirmPass &&
                                        confirmPass !== ""
                                    }
                                    helperText="password must be 8-10 characters"
                                />
                            </Grid>
                            {!isPassMatched && (
                                <Grid item xs={12}>
                                    <Box
                                        sx={{ color: "red", fontSize: "13px" }}
                                    >
                                        {signUpInfo.password !== confirmPass &&
                                            confirmPass !== "" &&
                                            `password not matched`}
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                        <Button
                            style={{ outline: "none" }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signin">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
