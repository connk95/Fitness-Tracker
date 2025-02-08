import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUp } from "../../pages/SignUpPage";
import { AuthState } from "../../redux/auth/auth.type";
import * as authActions from "../../redux/auth/auth.actions";

vi.mock("axios");

describe("SignUpPage", () => {
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

  it("dispatches user data", async () => {
    const mockStore = createMockStore(initialState);
    const dispatchSpy = vi.spyOn(authActions, "createUser");

    render(
      <Provider store={mockStore}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );

    const usernameInput = await screen.getByLabelText(/^username/i);
    const emailInput = await screen.getByLabelText(/^email address/i);
    const passwordInput = await screen.getByLabelText(/^password/i);

    await userEvent.type(usernameInput, "mockUsername");
    await userEvent.type(emailInput, "email@mock.com");
    await userEvent.type(passwordInput, "mockPassword");

    await waitFor(() => {
      expect(usernameInput).toHaveValue("mockUsername");
      expect(emailInput).toHaveValue("email@mock.com");
      expect(passwordInput).toHaveValue("mockPassword");
    });

    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "mockUsername",
          email: "email@mock.com",
          password: "mockPassword",
        })
      );
    });
  });

  it("produces error", async () => {
    const errorState = {
      auth: {
        loggedInUser: {
          access_token: "",
          user: {
            username: "",
            password: "",
            email: "",
            _id: "",
          },
        },
        newUser: {
          username: "",
          password: "",
          email: "",
        },
        loading: false,
        error: "mockError",
      },
      users: {
        loading: false,
      },
    };

    const errorSlice = createSlice({
      name: "auth",
      initialState: errorState,
      reducers: {},
    });

    const loggedOutStore = configureStore(errorSlice);

    render(
      <Provider store={loggedOutStore}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/mockError/i)).toBeInTheDocument();
    });
  });

  it("redirects after successful account creation", async () => {
    const loggedInState = {
      auth: {
        loggedInUser: {
          access_token: "mockAccessToken",
          user: {
            username: "mockUsername",
            password: "mockPassword",
            email: "mockEmail",
            _id: "mockId",
          },
        },
        newUser: {
          username: "",
          password: "",
          email: "",
        },
        loading: false,
        error: "",
      },
      users: {
        loading: false,
      },
    };

    const loggedInStore = configureStore(
      createSlice({
        name: "auth",
        initialState: loggedInState,
        reducers: {},
      })
    );

    render(
      <Provider store={loggedInStore}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/home");
    });
  });
});
