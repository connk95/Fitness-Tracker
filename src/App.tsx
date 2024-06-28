import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ButtonAppBar from "./components/Header";
import { Login } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SignUp } from "./pages/SignUpPage";
import { theme } from "./styles/theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme(theme);

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Provider store={store}>
          <ButtonAppBar />
          <Routes>
            {/* <Route path="/" element={<SplashPage />} /> */}
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/workouts/:id" element={<PostPage />} /> */}
            {/* <Route path="/workouts/new" element={<NewPost />} /> */}
            {/* <Route path="/foods/:id" element={<PostPage />} /> */}
            {/* <Route path="/foods/new" element={<NewPost />} /> */}
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
