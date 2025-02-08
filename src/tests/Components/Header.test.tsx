import { render, screen, waitFor } from "@testing-library/react";
import ButtonAppBar from "../../components/Header";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AuthState } from "../../redux/auth/auth.type";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as authActions from "../../redux/auth/auth.actions";

vi.mock("axios");

describe("SplashPage", () => {
  const initialState = {
    auth: {
      loggedInUser: null,
      newUser: null,
      error: "",
      loading: false,
    },
  };

  const createMockStore = (state: { auth: AuthState }) =>
    configureStore({
      reducer: {
        auth: createSlice({
          name: "auth",
          initialState: state.auth,
          reducers: {},
        }).reducer,
      },
    });

  it("Renders title, login and create account buttons when logged out", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ButtonAppBar></ButtonAppBar>{" "}
        </Router>
      </Provider>
    );

    expect(screen.getByText(/^FITTED/i)).toBeInTheDocument();

    expect(
      await screen.findByRole("link", { name: /login/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /create account/i })
    ).toBeInTheDocument();
  });

  it("Renders welcome message, logout button when logged in", async () => {
    const loggedInState = {
      ...initialState,
      auth: {
        loggedInUser: {
          access_token: "mockToken",
          user: {
            username: "mockUser",
            password: "mockPass",
            email: "mockemail",
            _id: "mockId",
          },
        },
        newUser: null,
        error: "",
        loading: false,
      },
    };

    const mockStore = createMockStore(loggedInState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ButtonAppBar></ButtonAppBar>{" "}
        </Router>
      </Provider>
    );

    expect(
      loggedInState.auth.loggedInUser.user.username &&
        loggedInState.auth.loggedInUser.user.password
    ).toBeDefined();

    expect(
      screen.getByText(
        `Welcome ${loggedInState.auth.loggedInUser.user.username}!`
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("link", { name: /logout/i })
    ).toBeInTheDocument();
  });

  it("Dispatches logout action & updates login state", async () => {
    const loggedInState = {
      ...initialState,
      auth: {
        loggedInUser: {
          access_token: "mockToken",
          user: {
            username: "mockUser",
            password: "mockPass",
            email: "mockemail",
            _id: "mockId",
          },
        },
        newUser: null,
        error: "",
        loading: false,
      },
    };

    const mockStore = createMockStore(loggedInState);
    const dispatchSpy = vi.spyOn(authActions, "userLogout");

    render(
      <Provider store={mockStore}>
        <Router>
          <ButtonAppBar></ButtonAppBar>{" "}
        </Router>
      </Provider>
    );

    const logoutButton = await screen.findByRole("link", { name: /logout/i });
    userEvent.click(logoutButton);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledOnce();
    });
  });
});
