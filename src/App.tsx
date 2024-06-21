import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ButtonAppBar from "./components/Header";
import { Login } from "./pages/LoginPage";

const App = () => {
  return (
    <>
      <Router>
        <Provider store={store}>
          <ButtonAppBar />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Provider>
      </Router>
    </>
  );
};

export default App;
