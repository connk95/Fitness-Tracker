import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { RootState } from "../redux/store";
import { UserLoginData } from "../redux/auth/auth.type";
import { userLogin } from "../redux/auth/auth.actions";
import { useEffect, useState } from "react";

export const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>();

  const onSubmit: SubmitHandler<UserLoginData> = async (data) => {
    try {
      await dispatch(userLogin(data));
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Invalid username or password. Please try again");
      }
    }
  };

  useEffect(() => {
    if (auth.loggedInUser.access_token) {
      navigate("/home");
    } else if (auth.error) {
      setErrorMessage(auth.error);
    }
  }, [auth.loggedInUser.access_token, auth.error, navigate]);

  return (
    <Container component="main" sx={{ mt: 12 }}>
      <CssBaseline />
      {(!auth.error || !auth.loading) && (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {auth.error && !errorMessage && <Typography>{auth.error}</Typography>}
          {auth.loading && <CircularProgress />}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, width: "30vw" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("username")}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                {errors.username && (
                  <Typography variant="caption" color="error">
                    {errors.username.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <Typography variant="caption" color="error">
                    {errors.password.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              name="submit"
              sx={{ mt: 3, mb: 2 }}
              data-testid="signInButton"
              aria-hidden="false"
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
};
