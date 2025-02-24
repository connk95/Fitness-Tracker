import reducer, {
  userLogin,
  userLogout,
  createUser,
  setLoggedInUser,
} from "../../redux/auth/auth.slice";
import { expect, it, vi } from "vitest";
import { AuthState, NewUser, LoggedInUser } from "../../redux/auth/auth.type";
import axios from "axios";
import * as actions from "../../redux/auth/auth.actions";
import { configureStore } from "@reduxjs/toolkit";

vi.mock("axios");
const mockedAxios = axios as vi.Mocked<typeof axios>;

describe("authSlice", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      loggedInUser: {},
      newUser: {},
      error: "",
      loading: false,
    });
  });

  it("should handle userLogin", async () => {
    const mockUser = { username: "mockUser", token: "mockToken" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockUser });

    const store = configureStore({ reducer });

    await store.dispatch(
      actions.userLogin({ username: "mockUser", password: "mockPass" })
    );

    const state = store.getState();
    expect(state.loggedInUser).toEqual(mockUser);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("");
  });

  it("should return error on failed login", async () => {
    const errorMessage = "Invalid username or password. Please try again";
    mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

    const store = configureStore({ reducer });

    await store.dispatch(
      actions.userLogin({ username: "mockUser", password: "mockPass" })
    );

    const state = store.getState();
    expect(state.loggedInUser).toEqual({});
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
