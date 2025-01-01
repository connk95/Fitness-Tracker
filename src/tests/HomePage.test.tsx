import { HomePage } from "../pages/HomePage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { AuthState } from "../redux/auth/auth.type";
import { ActivityState } from "../redux/activity/activity.type";
// import { fetchUsers } from "../redux/user/user.actions";
import { fetchPaginatedActivities } from "../redux/activity/activity.action";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("HomePage", () => {
  const initialState = {
    activities: {
      allActivities: [
        {
          _id: "1",
          type: "workout",
          title: "Morning Run",
          user: {
            _id: "user1",
            username: "JohnDoe",
            password: "mockPass",
            email: "mockemail",
          },
          likes: [],
          calories: 300,
          duration: 30,
          createdAt: "2024-12-01T09:00:00",
          updatedAt: "2024-12-01T10:00:00",
        },
        {
          _id: "2",
          type: "food",
          title: "Chicken Salad",
          user: {
            _id: "user2",
            username: "JaneDoe",
            password: "mockPass",
            email: "mockemail",
          },
          likes: [],
          calories: 400,
          createdAt: "2024-12-01T12:00:00",
          updatedAt: "2024-12-01T13:00:00",
        },
      ],
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

  const mockActivities = initialState.activities.allActivities;

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

  it("Renders activities", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      mockActivities.forEach((activity) => {
        expect(screen.getByText(activity.title)).toBeInTheDocument();
      });
    });
  });

  it("renders the correct number of activities on page load", async () => {
    const mockStore = createMockStore(initialState);
    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Morning Run")).toBeInTheDocument();
      expect(screen.getByText("Chicken Salad")).toBeInTheDocument();
    });
  });

  it("renders 'New Food' and 'New Workout' buttons when user is logged in", () => {
    const mockStore = createMockStore(initialState);
    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );
    expect(screen.getByText("New Food")).toBeInTheDocument();
    expect(screen.getByText("New Workout")).toBeInTheDocument();
  });

  it("Does not render 'New Food' or 'New Workout' button when user is not logged in", () => {
    const noAuthState = {
      ...initialState,
      auth: { loggedInUser: null, newUser: null, loading: false, error: "" },
    };
    const mockStore = createMockStore(noAuthState);

    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    expect(screen.queryByText("New Food")).not.toBeInTheDocument();
    expect(screen.queryByText("New Workout")).not.toBeInTheDocument();
  });

  it("Renders 'No activities found' when no activities are available", async () => {
    const emptyState = {
      ...initialState,
      activities: { ...initialState.activities, allActivities: [] },
    };
    const mockStore = createMockStore(emptyState);

    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("No activities found.")).toBeInTheDocument();
    });
  });

  it("filters activities by type", async () => {
    const mockStore = createMockStore(initialState);
    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
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

  it("Paginates through activities correctly", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    const paginationButton = screen.getByRole("button", { name: /next/i });
    paginationButton.click();

    await waitFor(() => {
      expect(screen.getByText(mockActivities[0].title)).toBeInTheDocument();
    });
  });

  it("renders correct activities when the filter is changed to 'friends'", async () => {
    const mockStore = createMockStore(initialState);
    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    const friendRadio = screen.getByRole("radio", { name: "Friend Activity" });
    userEvent.click(friendRadio);

    await waitFor(() => {
      expect(screen.getByText("Morning Run")).toBeInTheDocument();
    });
  });

  //   it("dispatches fetchUsers on page load", () => {
  //     const mockStore = createMockStore(initialState);
  //     const dispatchSpy = vi.spyOn(mockStore, "dispatch");

  //     render(
  //       <Provider store={mockStore}>
  //         <Router>
  //           <HomePage />
  //         </Router>
  //       </Provider>
  //     );

  //     expect(dispatchSpy).toHaveBeenCalledWith(fetchUsers());
  //   });

  it("filters and fetches activities with correct params on button click", async () => {
    const mockStore = createMockStore(initialState);
    const dispatchSpy = vi.spyOn(mockStore, "dispatch");

    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    const foodRadio = screen.getByRole("radio", { name: "Food Only" });
    userEvent.click(foodRadio);

    screen.debug();

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        fetchPaginatedActivities({
          filter: "food",
          page: 1,
          limit: 12,
          friends: [],
        })
      );
    });
  });

  it("resets the page to 1 when the filter changes", () => {
    const mockStore = createMockStore(initialState);
    const dispatchSpy = vi.spyOn(mockStore, "dispatch");

    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    const foodRadio = screen.getByRole("radio", { name: "Food Only" });
    userEvent.click(foodRadio);

    expect(dispatchSpy).toHaveBeenCalledWith(
      fetchPaginatedActivities({
        filter: "food",
        page: 1,
        limit: 12,
        friends: [],
      })
    );
  });

  it("handles pagination correctly when the page is changed", async () => {
    const mockStore = createMockStore(initialState);
    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    const paginationButton = screen.getByRole("button", { name: /next/i });
    userEvent.click(paginationButton);

    await waitFor(() => {
      expect(screen.getByText(mockActivities[0].title)).toBeInTheDocument();
    });
  });
});
