import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActivityPage } from "../../pages/ActivityPage";
import { ActivityState } from "../../redux/activity/activity.type";
import { AuthState } from "../../redux/auth/auth.type";
import { CommentState } from "../../redux/comment/comment.type";
import * as commentActions from "../../redux/comment/comment.actions";
import * as activityActions from "../../redux/activity/activity.action";

vi.mock("axios");
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

const createMockStore = (state: {
  activities: ActivityState;
  auth: AuthState;
  comments: CommentState;
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

describe("ActivityPage", () => {
  let initialState: {
    activities: ActivityState;
    auth: AuthState;
    comments: CommentState;
  };

  beforeEach(() => {
    initialState = {
      activities: {
        allActivities: [],
        singleActivity: {
          _id: "1",
          type: "workout",
          title: "Morning Run",
          duration: 30,
          calories: 100,
          user: {
            _id: "user1",
            username: "JohnDoe",
            password: "mockPass",
            email: "mockEmail",
          },
          likes: [],
          comments: [
            {
              _id: "111",
              text: "mockComment",
              activityId: "1",
              user: {
                username: "JohnDoe",
                _id: "user1",
                password: "mockPass",
                email: "mockEmail",
              },
              likes: [],
              createdAt: "2024-12-01T09:00:00",
              updatedAt: "2024-12-01T10:00:00",
            },
          ],
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
            _id: "mockId",
            password: "mockPass",
            email: "mockEmail",
          },
        },
        newUser: null,
        error: "",
        loading: false,
      },
      comments: {
        loading: false,
        error: "",
      },
    };
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

    await waitFor(() => {
      expect(screen.getByText(/Morning Run/i)).toBeInTheDocument();
      expect(screen.getByText(/Duration: 30 minutes/i)).toBeInTheDocument();
      expect(screen.getByText(/Calories burned: 100/i)).toBeInTheDocument();
      expect(screen.getByText(/mockComment/i)).toBeInTheDocument();
    });
  });

  it("dispatches comment data", async () => {
    const mockStore = createMockStore(initialState);
    const dispatchSpy = vi.spyOn(commentActions, "newComment");

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    const commentInput = screen.getByRole("textbox", { name: /comment/i });
    await userEvent.type(commentInput, "mockCommentTwo");

    const submitButton = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Object));
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
          <ActivityPage />
        </Router>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders no activity data message when no activity exists", () => {
    const emptyActivityState = {
      ...initialState,
      activities: { ...initialState.activities, singleActivity: null },
    };

    const mockStore = createMockStore(emptyActivityState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/No activity found./i)).toBeInTheDocument();
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
      auth: { newUser: null, loading: false, error: "", loggedInUser: null },
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

  it("dispatches like action", async () => {
    const mockStore = createMockStore(initialState);
    const dispatchSpy = vi.spyOn(activityActions, "addLike");

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    const likeButton = screen.getByTitle("Like");
    userEvent.click(likeButton);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          activityId: initialState.activities.singleActivity?._id,
        })
      );
    });
  });

  it("does not dispatch like action when logged out", async () => {
    const loggedOutState = {
      ...initialState,
      auth: {
        loggedInUser: null,
        newUser: null,
        error: "",
        loading: false,
      },
    };
    const mockStore = createMockStore(loggedOutState);
    const dispatchSpy = vi.spyOn(activityActions, "addLike");

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    const likeButton = screen.getByTitle("Like");
    userEvent.click(likeButton);

    await waitFor(() => {
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

  it("does not dispatch like action if user has already liked", async () => {
    const likedState = {
      ...initialState,
      activities: {
        ...initialState.activities,
        singleActivity: {
          _id: "1",
          type: "workout",
          title: "Morning Run",
          duration: 30,
          calories: 100,
          user: {
            _id: "user1",
            username: "JohnDoe",
            password: "mockPass",
            email: "mockEmail",
          },
          likes: ["mockId"],
          comments: [],
          createdAt: "2024-12-01T09:00:00",
          updatedAt: "2024-12-01T10:00:00",
        },
      },
    };

    const mockStore = createMockStore(likedState);
    const dispatchSpy = vi.spyOn(activityActions, "addLike");

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    const likeButton = screen.getByTitle("Like");
    userEvent.click(likeButton);

    await waitFor(() => {
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

  it("dispatches add friend action", async () => {
    const mockStore = createMockStore(initialState);
    const dispatchSpy = vi.spyOn(activityActions, "addFriend");

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    const friendButton = screen.getByTitle("Friend");
    userEvent.click(friendButton);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          friend: initialState.activities.singleActivity?.user,
        })
      );
    });
  });

  it("hides friend icon when logged out", async () => {
    const loggedOutState = {
      ...initialState,
      auth: {
        loggedInUser: null,
        newUser: null,
        error: "",
        loading: false,
      },
    };
    const mockStore = createMockStore(loggedOutState);

    render(
      <Provider store={mockStore}>
        <Router>
          <ActivityPage />
        </Router>
      </Provider>
    );

    expect(screen.queryByTitle("Friend")).toBeNull();
  });
});
