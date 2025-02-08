import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { AuthState } from "../../redux/auth/auth.type";
import { ActivityState } from "../../redux/activity/activity.type";
import userEvent from "@testing-library/user-event";
import { NewFood } from "../../pages/NewFood";
import * as activityActions from "../../redux/activity/activity.action";

vi.mock("axios");

describe("HomePage", () => {
  const initialState = {
    activities: {
      allActivities: [],
      singleActivity: null,
      totalPages: 1,
      page: 1,
      error: "",
      loading: false,
    },
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

  const createMockStore = (state: {
    activities: ActivityState;
    auth: AuthState;
  }) =>
    configureStore({
      reducer: {
        activities: createSlice({
          name: "activities",
          initialState: state.activities,
          reducers: {},
        }).reducer,
        auth: createSlice({
          name: "auth",
          initialState: state.auth,
          reducers: {},
        }).reducer,
      },
    });

  it("renders food form", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <NewFood />
        </Router>
      </Provider>
    );

    expect(await screen.getByLabelText(/^title/i)).toBeInTheDocument();
    expect(await screen.getByLabelText(/^calories/i)).toBeInTheDocument();
  });

  it("dispatches new food data & redirects to home", async () => {
    const mockStore = createMockStore(initialState);
    const dispatchSpy = vi.spyOn(activityActions, "newActivity");

    render(
      <Provider store={mockStore}>
        <Router>
          <NewFood />
        </Router>
      </Provider>
    );

    const titleInput = await screen.getByLabelText(/^title/i);
    const calorieInput = await screen.getByLabelText(/^calories/i);

    await userEvent.type(titleInput, "mockTitle");
    await userEvent.type(calorieInput, "100");

    await waitFor(() => {
      expect(titleInput).toHaveValue("mockTitle");
      expect(calorieInput).toHaveValue(100);
    });

    const submitButton = await screen.getByRole("button", { name: "Submit" });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "mockTitle",
          calories: 100,
          type: "food",
        })
      );
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe("/home");
    });
  });

  it("returns error with invalid data", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <NewFood />
        </Router>
      </Provider>
    );

    const titleInput = await screen.getByLabelText(/^title/i);
    const calorieInput = await screen.getByLabelText(/^calories/i);

    await userEvent.type(titleInput, "mockTitle");
    await userEvent.type(calorieInput, "10000");

    await waitFor(() => {
      expect(titleInput).toHaveValue("mockTitle");
      expect(calorieInput).toHaveValue(10000);
    });

    const submitButton = await screen.getByRole("button", { name: "Submit" });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/^calories may not exceed 9999/i)
      ).toBeInTheDocument();
    });
  });

  it("returns error with no data", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <NewFood />
        </Router>
      </Provider>
    );

    const submitButton = await screen.getByRole("button", { name: "Submit" });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/^title is required/i)).toBeInTheDocument();
    });
  });

  it("renders loading state correctly", () => {
    const loadingState = {
      ...initialState,
      activities: { ...initialState.activities, loading: true },
    };

    const mockStore = createMockStore(loadingState);

    render(
      <Provider store={mockStore}>
        <Router>
          <NewFood />
        </Router>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error when not logged in", () => {
    const loggedOutState = {
      ...initialState,
      auth: { ...initialState.auth, access_token: null, loggedInUser: null },
    };

    const mockStore = createMockStore(loggedOutState);

    render(
      <Provider store={mockStore}>
        <Router>
          <NewFood />
        </Router>
      </Provider>
    );

    expect(
      screen.getByText(/^please sign in to make a post./i)
    ).toBeInTheDocument();
  });
});
