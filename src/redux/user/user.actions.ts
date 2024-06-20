import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./user.type";

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ username, email, password }: User) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      username,
      email,
      password,
    });
    return res.data;
  }
);

export const fetchUser = createAsyncThunk(
  "users/getUser",
  async (id: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`);
    return res.data;
  }
);
