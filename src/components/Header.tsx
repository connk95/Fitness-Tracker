import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { userLogout } from "../redux/auth/auth.actions";
import DirectionsRunSharpIcon from "@mui/icons-material/DirectionsRunSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";

export const ButtonAppBar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const onClick = async () => {
    if (auth.loggedInUser?.user.username && auth.loggedInUser?.user.password) {
      const data = {
        username: auth.loggedInUser?.user.username,
        password: auth.loggedInUser?.user.password,
      };
      await dispatch(userLogout(data));
      navigate("/home");
    }
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Box sx={{ padding: "0", flexDirection: "row" }}>
      <AppBar position="fixed" elevation={0} sx={{ padding: "0" }}>
        <Toolbar sx={{ display: "flex", flexDirection: "row", padding: "0" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, mr: 2, ml: 2 }}
          >
            <Link to={"/home"} style={{ color: "#e43d12", fontSize: 24 }}>
              <DirectionsRunSharpIcon />
              FITTED
            </Link>
          </Typography>
          {auth.loggedInUser?.access_token ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{
                  lineHeight: "3rem",
                  mr: 3,
                  color: "#e43d12",
                  "@media (max-width: 600px)": {
                    display: "none",
                  },
                }}
              >
                Welcome {auth.loggedInUser?.user.username}!
              </Typography>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2, color: "#e43d12" }}
                href="/profile"
              >
                <AccountBoxSharpIcon></AccountBoxSharpIcon>
              </IconButton>
              <Button
                color="inherit"
                href="/"
                onClick={onClick}
                sx={{ color: "#e43d12" }}
              >
                <LogoutSharpIcon sx={{ mr: 1 }} />
                Logout
              </Button>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" href="/login" sx={{ color: "#e43d12" }}>
                <LoginSharpIcon sx={{ mr: 1 }} />
                Login
              </Button>
              <Button color="inherit" href="/signup" sx={{ color: "#e43d12" }}>
                <AddBoxSharpIcon sx={{ mr: 1 }} />
                Create Account
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    // </ThemeProvider>
  );
};

export default ButtonAppBar;
