import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ButtonAppBar from "./components/Header";
import { Login } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SignUp } from "./pages/SignUpPage";
import { NewWorkout } from "./pages/NewWorkout";
import { NewFood } from "./pages/NewFood";
import { theme } from "./styles/theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { setLoggedInUser } from "./redux/auth/auth.actions";
import { FoodPage } from "./pages/FoodPage";

const defaultTheme = createTheme(theme);

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoggedInUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Provider store={store}>
          <ButtonAppBar />
          <Routes>
            {/* <Route path="/" element={<SplashPage />} /> */}
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/workouts/:id" element={<PostPage />} /> */}
            <Route path="/workouts/new" element={<NewWorkout />} />
            <Route path="/foods/:id" element={<FoodPage />} />
            <Route path="/foods/new" element={<NewFood />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/profile" element={<UserPage />} /> */}
          </Routes>
        </Provider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
