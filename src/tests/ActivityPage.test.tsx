import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ActivityPage } from "../pages/ActivityPage";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchSingleActivity } from "../redux/activity/activity.action";
import { newComment } from "../redux/comment/comment.actions";
import { ActivityState } from "../redux/activity/activity.type";
import { AuthState } from "../redux/auth/auth.type";

vi.mock("axios");

describe("PostPage", () => {
  const initialState = {
    activities: {
      allActivities: [],
      singleActivity: {
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
        comments: [
          {
            _id: "111",
            text: "mockComment",
            activityId: "1",
            user: {
              username: "mockUser",
              password: "mockPass",
              email: "mockemail",
              _id: "mockId",
            },
            type: "workout",
            likes: [],
            createdAt: "2024-12-01T09:00:00",
            updatedAt: "2024-12-01T10:00:00",
          },
        ],
        calories: 300,
        duration: 30,
        createdAt: "2024-12-01T09:00:00",
        updatedAt: "2024-12-01T10:00:00",
      },
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

  it("Retrieves & renders post & comment", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    vi.spyOn(mockStore, "dispatch").mockResolvedValueOnce({
      data: {},
      type: "",
    });

    await waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        fetchSingleActivity(initialState.activities.singleActivity._id)
      );
    });

    await waitFor(() => {
      expect(screen.getByText(initialState.activities.singleActivity.title))
        .toBeInTheDocument;
      expect(screen.getByText(initialState.activities.singleActivity.duration))
        .toBeInTheDocument;
      expect(
        screen.getByText(initialState.activities.singleActivity.user.username)
      ).toBeInTheDocument;
      expect(screen.getByText(initialState.activities.singleActivity.createdAt))
        .toBeInTheDocument;
      expect(
        screen.getByText(
          initialState.activities.singleActivity.comments[0].text
        )
      ).toBeInTheDocument;
      expect(
        screen.getByText(
          initialState.activities.singleActivity.comments[0].user.username
        )
      ).toBeInTheDocument;
      expect(
        screen.getByText(
          initialState.activities.singleActivity.comments[0].createdAt
        )
      ).toBeInTheDocument;
    });
  });

  it("dispatches comment data", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      const commentInput = screen.getByRole("textbox", { name: /comment/i });

      userEvent.type(commentInput, "mockCommentTwo");

      const submitButton = screen.getByRole("button", { name: "Submit" });

      vi.spyOn(mockStore, "dispatch").mockResolvedValueOnce({
        data: {},
        type: "",
      });

      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        newComment({
          text: "mockCommentTwo",
          activityId: initialState.activities.singleActivity._id,
        })
      );
    });
  });

  it("renders loading state correctly", () => {
    const loadingState = {
      ...initialState,
      activities: {
        ...initialState.activities,
        loading: true,
      },
    };

    const mockStore = createMockStore(loadingState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders no activity data message when no activity exists", () => {
    const emptyActivityState = {
      ...initialState,
      activities: {
        ...initialState.activities,
        singleActivity: null,
      },
    };

    const mockStore = createMockStore(emptyActivityState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/no activity found/i)).toBeInTheDocument();
  });

  it("renders comment form for authenticated user", async () => {
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Submit/i })
      ).toBeInTheDocument();
    });
  });

  it("does not render comment form for unauthenticated user", async () => {
    const unauthState = {
      ...initialState,
      auth: { ...initialState.auth, loggedInUser: null },
    };

    const mockStore = createMockStore(unauthState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByLabelText(/Comment/i)).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /Submit/i })
      ).not.toBeInTheDocument();
    });
  });

  it("displays error message when comment submission fails", async () => {
    const mockStore = createMockStore(initialState);

    vi.spyOn(mockStore, "dispatch").mockRejectedValueOnce(
      new Error("Could not add comment.")
    );

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      const commentInput = screen.getByRole("textbox", { name: /comment/i });
      userEvent.type(commentInput, "mockCommentFailed");

      const submitButton = screen.getByRole("button", { name: /submit/i });
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalled();
      expect(screen.getByText(/could not add comment/i)).toBeInTheDocument();
    });
  });

  it("renders correct comments per page and handles page changes", async () => {
    const paginatedCommentsState = {
      ...initialState,
      activities: {
        ...initialState.activities,
        singleActivity: {
          ...initialState.activities.singleActivity,
          comments: Array.from({ length: 20 }, (_, i) => ({
            _id: `mockCommentId${i}`,
            text: `Mock Comment ${i + 1}`,
            user: {
              username: `MockUser ${i + 1}`,
              password: `MockPass ${i + 1}`,
              email: `MockEmail ${i + 1}`,
            },
            activityId: initialState.activities.singleActivity._id,
            type: initialState.activities.singleActivity.type,
            createdAt: "2024-12-01T09:00:00",
            updatedAt: "2024-12-01T10:00:00",
          })),
        },
      },
    };

    const mockStore = createMockStore(paginatedCommentsState);
    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      const comments = screen.getAllByText(/Mock Comment/i);
      expect(comments.length).toBe(12);

      const pagination = screen.getByRole("navigation");
      expect(pagination).toBeInTheDocument();

      userEvent.click(screen.getByText("2"));
    });
    await waitFor(() => {
      const newComments = screen.getAllByText(/Mock Comment/i);
      expect(newComments.length).toBe(8);
      expect(screen.getByText("Mock Comment 13")).toBeInTheDocument(); // First comment of page 2
    });
  });
});
