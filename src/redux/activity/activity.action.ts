import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../user/user.type";

type GenericState = {
  auth: {
    loggedInUser: {
      user: User;
    };
  };
};

export const addLike = createAsyncThunk(
  "likes/newLike",
  async (
    { activityId, type }: { activityId: string; type: string },
    thunkApi
  ) => {
    const state = thunkApi.getState() as GenericState;
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/${type}/${activityId}/like`,
      {
        activityId,
        user: state.auth.loggedInUser.user,
      }
    );
    return { ...res.data, type, activityId };
  }
);

export const addFriend = createAsyncThunk(
  "friends/newFriend",
  async ({ friend }: { friend: User }, thunkApi) => {
    const state = thunkApi.getState() as GenericState;
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${
        state.auth.loggedInUser.user._id
      }/friends`,
      {
        friend,
      }
    );

    return res.data;
  }
);

export const fetchPaginatedActivities = createAsyncThunk(
  "activities/fetchPaginatedData",
  async ({
    page = 1,
    limit = 12,
    filter = "all",
  }: {
    page?: number;
    limit?: number;
    filter?: string;
  }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/data/paginated`,
      {
        params: { page, limit, filter },
      }
    );
    return res.data;
  }
);
