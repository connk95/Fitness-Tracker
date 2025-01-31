import { UserPage } from "../pages/UserPage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { AuthState } from "../redux/auth/auth.type";
import { ActivityState } from "../redux/activity/activity.type";
import { UserState } from "../redux/user/user.type";
import userEvent from "@testing-library/user-event";
import { CalorieGraph } from "../components/CalorieGraph";

vi.mock("axios");

describe("UserPage", () => {
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
          email: "mockEmail",
          _id: "mockId",
        },
      },
      newUser: null,
      error: "",
      loading: false,
    },
    users: {
      allUsers: [],
      user: {
        _id: "mockId",
        username: "mockUser",
        password: "mockPass",
        email: "mockEmail",
        likes: [],
        friends: [],
        comments: [
          {
            _id: "mockComment1",
            text: "mockText",
            user: {
              _id: "mockId",
              username: "mockUser",
              password: "mockPass",
              email: "mockEmail",
            },
            activityId: "mockActivity1",
            likes: [],
            createdAt: new Date()
              .toISOString()
              .replace(/^(\d{4})-(\d{2})-(\d{2})/, "$1-$3-$2"),
            updatedAt: new Date()
              .toISOString()
              .replace(/^(\d{4})-(\d{2})-(\d{2})/, "$1-$3-$2"),
          },
        ],
        activities: [
          {
            _id: "1",
            type: "workout",
            title: "Morning Run",
            user: {
              _id: "mockId",
              username: "mockUser",
              password: "mockPass",
              email: "mockEmail",
            },
            likes: [],
            calories: 300,
            duration: 30,
            createdAt: new Date()
              .toISOString()
              .replace(/^(\d{4})-(\d{2})-(\d{2})/, "$1-$3-$2"),
            updatedAt: new Date()
              .toISOString()
              .replace(/^(\d{4})-(\d{2})-(\d{2})/, "$1-$3-$2"),
          },
          {
            _id: "2",
            type: "food",
            title: "Chicken Salad",
            user: {
              _id: "mockId",
              username: "mockUser",
              password: "mockPass",
              email: "mockEmail",
            },
            likes: [],
            calories: 400,
            createdAt: new Date()
              .toISOString()
              .replace(/^(\d{4})-(\d{2})-(\d{2})/, "$1-$3-$2"),
            updatedAt: new Date()
              .toISOString()
              .replace(/^(\d{4})-(\d{2})-(\d{2})/, "$1-$3-$2"),
          },
        ],
      },
      error: "",
      loading: false,
    },
  };

  const mockActivities = initialState.users.user.activities;
  const mockComments = initialState.users.user.comments;

  const createMockStore = (state: {
    users: UserState;
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
        users: createSlice({
          name: "users",
          initialState: state.users,
          reducers: {},
        }).reducer,
      },
    });

  it("Renders username, activities, and comments", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <UserPage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(initialState.users.user.username)
      ).toBeInTheDocument();
      expect(screen.getByText("My Calories")).toBeInTheDocument();
      // expect(screen.getByAria("calorie-graph"));
      mockComments.forEach((comment) => {
        expect(screen.getByText(comment.text)).toBeInTheDocument();
      });
      mockActivities.forEach((activity) => {
        expect(screen.getByText(activity.title)).toBeInTheDocument();
      });
    });
  });

  it("filters activities by type", async () => {
    const mockStore = createMockStore(initialState);
    render(
      <Provider store={mockStore}>
        <Router>
          <UserPage />
        </Router>
      </Provider>
    );

    const foodRadio = screen.getByRole("radio", { name: "Food Only" });
    userEvent.click(foodRadio);

    await waitFor(() => {
      expect(screen.getByText("Chicken Salad")).toBeInTheDocument();
      expect(screen.queryByText("Morning Run")).not.toBeInTheDocument();
    });
  });

  it("filters and fetches activities with correct params on button click", async () => {
    const mockStore = createMockStore(initialState);
    const dispatchSpy = vi.spyOn(mockStore, "dispatch");

    render(
      <Provider store={mockStore}>
        <Router>
          <UserPage />
        </Router>
      </Provider>
    );

    const foodRadio = screen.getByRole("radio", { name: "Food Only" });
    userEvent.click(foodRadio);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it("renders custom calorie graph", async () => {
    const mockStore = createMockStore(initialState);
    // const dispatchSpy = vi.spyOn

    render(
      <Provider store={mockStore}>
        <Router>
          <UserPage />
        </Router>
      </Provider>
    );
    expect(await screen.findByTestId("calorieGraph")).toBeInTheDocument();
  });
});
