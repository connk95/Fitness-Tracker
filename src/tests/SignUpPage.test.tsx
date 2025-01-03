import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUp } from "../pages/SignUpPage";
import { createUser } from "../redux/auth/auth.actions";
import { AuthState } from "../redux/auth/auth.type";

vi.mock("axios");

describe("SignUpPage", () => {
  const initialState = {
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

    render(
      <Provider store={mockStore}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );

    const usernameInput = screen.getByRole("textbox", { name: "Username" });
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.type(usernameInput, "mockUsername");
    userEvent.type(emailInput, "mockEmail");
    userEvent.type(passwordInput, "mockPassword");

    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    vi.spyOn(mockStore, "dispatch").mockResolvedValueOnce({
      data: {},
      type: "",
    });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        createUser({
          username: "mockUsername",
          email: "mockEmail",
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
      expect(screen.getByText(/errorState.auth.error/i)).toBeInTheDocument();
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
