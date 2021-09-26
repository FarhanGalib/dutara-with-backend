import * as React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    requestSignIn,
    setError,
    setToken,
} from "../../../store/actions/tokenAction";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignInPhoto from "./photo/shopping.jpg";
import axios from "axios";

const theme = createTheme();

export default function SignIn() {
    const { error } = useSelector((state) => state.persistedStorage);
    const [signInInfo, setSignInInfo] = useState({
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    const setValues = (key, e) => {
        setSignInInfo({ ...signInInfo, [key]: e.target.value });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(requestSignIn(signInInfo));
        axios
            .post("http://localhost:8080/signin", signInInfo)
            .then(({ data }) => {
                if (data.message === "Logged in Successfully") {
                    dispatch(setToken(data));
                    setLoginError(false);

                    history.push("/");
                } else {
                    dispatch(setError(data.message));
                    setLoginError(true);
                }
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${SignInPhoto})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            validate
                            onSubmit={handleSignIn}
                            sx={{ mt: 1 }}
                        >
                            <Container maxWidth="sm">
                                <Grid container spacing={0.5}>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            value={signInInfo.email}
                                            onChange={(e) =>
                                                setValues("email", e)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            value={signInInfo.password}
                                            onChange={(e) =>
                                                setValues("password", e)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {loginError && (
                                            <Box
                                                fullWidth
                                                style={{
                                                    color: "red",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                user/password is incorrect.
                                            </Box>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="remember"
                                                    color="primary"
                                                />
                                            }
                                            label="Remember me"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            style={{ outline: "none" }}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign In
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
