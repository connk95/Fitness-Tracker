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
import { mock } from "node:test";

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

  it("should handle user logout", async () => {
    const mockUser = { username: "mockUser", token: "mockToken" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockUser });

    const store = configureStore({ reducer });

    await store.dispatch(
      actions.userLogout({ username: "mockUser", password: "mockPass" })
    );
    const state = store.getState();
    expect(state.loggedInUser).toEqual({});
    expect(state.loading).toBe(false);
    expect(state.error).toBe("");
  });

  it("should return error on failed logout", async () => {
    const errorMessage = "Failed to logout. Please try again";
    mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

    const store = configureStore({ reducer });

    await store.dispatch(
      actions.userLogout({ username: "mockUser", password: "mockPass" })
    );

    const state = store.getState();
    expect(state.loggedInUser).toEqual({});
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it("should handle create user", async () => {
    const mockUser = { username: "mockUser", token: "mockToken" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockUser });

    const store = configureStore({ reducer });

    await store.dispatch(
      actions.createUser({
        username: "mockUser",
        email: "mock@email.com",
        password: "mockPass",
      })
    );
    const state = store.getState();

    console.log(state);
    expect(state.newUser).toEqual(mockUser);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("");
  });

  it("should return error on failed create user", async () => {
    const errorMessage = "This username is already in use. Please try again";
    mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

    const store = configureStore({ reducer });

    await store.dispatch(
      actions.createUser({
        username: "mockUser",
        email: "mock@email.com",
        password: "mockPass",
      })
    );

    const state = store.getState();
    expect(state.loggedInUser).toEqual({});
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it("should set logged in user", async () => {
    const mockUser = { username: "mockUser", token: "mockToken" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockUser });

    const store = configureStore({ reducer });

    await store.dispatch(
      actions.userLogin({ username: "mockUser", password: "mockPass" })
    );

    await store.dispatch(actions.setLoggedInUser());

    const state = store.getState();
    expect(state.loggedInUser).toEqual(mockUser);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("");
  });
});
