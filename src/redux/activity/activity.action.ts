import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../user/user.type";
import { ActivityType } from "./activity.type";

type GenericState = {
  auth: {
    loggedInUser: {
      user: User;
    };
  };
};

export const fetchSingleActivity = createAsyncThunk(
  "activities/fetchSingleActivity",
  async (id: string) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/activities/${id}`
    );
    return res.data;
  }
);

export const fetchActivities = createAsyncThunk(
  "activities/fetchAllActivities",
  async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities`);
    return res.data;
  }
);

export const fetchPaginatedActivities = createAsyncThunk(
  "activities/fetchPaginatedActivities",
  async ({
    filter,
    page,
    limit,
  }: {
    filter?: string;
    page?: number;
    limit?: number;
  }) => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/activities?type=${filter}&page=${page}&limit=${limit}`
    );
    console.log(
      "filter: ",
      filter,
      "page: ",
      page,
      "limit: ",
      limit,
      "data: ",
      res.data
    );
    return res.data;
  }
);

export const newActivity = createAsyncThunk(
  "activities/newActivity",
  async ({ type, title, duration, calories }: ActivityType, thunkApi) => {
    const state = thunkApi.getState() as GenericState;
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/activities`, {
      type,
      title,
      duration: duration ? duration : null,
      calories,
      user: state.auth.loggedInUser.user,
    });

    return res.data;
  }
);

export const addLike = createAsyncThunk(
  "likes/newLike",
  async ({ activityId }: { activityId: string }, thunkApi) => {
    const state = thunkApi.getState() as GenericState;
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/activities/${activityId}/like`,
      {
        activityId,
        user: state.auth.loggedInUser.user,
      }
    );
    return { ...res.data, activityId };
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
