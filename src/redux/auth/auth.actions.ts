import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../user/user.type";
import { UserLoginData } from "./auth.type";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async ({ username, password }: UserLoginData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      if (res.data) {
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));
        return res.data;
      }
    } catch (error) {
      throw new Error("Invalid username or password. Please try again");
    }
  }
);

export const setLoggedInUser = createAsyncThunk(
  "auth/setLoggedInUser",
  async () => {
    const user = await localStorage.getItem("loggedInUser");
    if (user) {
      const loggedInUser = JSON.parse(user);
      return loggedInUser;
    } else {
      return;
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async ({ username, password }: UserLoginData) => {
    localStorage.removeItem("loggedInUser");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          username,
          password,
        }
      );
      return res;
    } catch (error) {
      throw new Error("Failed to logout. Please try again");
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ username, email, password }: User) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        username,
        email,
        password,
      });
      return res.data;
    } catch (error) {
      throw new Error("This username is already in use. Please try again");
    }
  }
);
