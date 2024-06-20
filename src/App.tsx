import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Routes>
            <Route />
          </Routes>
        </Provider>
      </Router>
    </>
  );
};

export default App;
