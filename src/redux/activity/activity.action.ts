import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../user/user.type";
import { Activity } from "./activity.type";

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

export const newActivity = createAsyncThunk(
  "workouts/newWorkout",
  async (activity: Activity, thunkApi) => {
    const state = thunkApi.getState() as GenericState;

    const activityData = {
      type: activity.type,
      title: activity.title,
      calories: activity.calories,
      user: state.auth.loggedInUser.user,
      ...(activity.type === "workouts" && activity.duration
        ? { duration: activity.duration }
        : {}),
    };
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/activities`,
      activityData
    );

    return res;
  }
);

export const addLike = createAsyncThunk(
  "likes/newLike",
  async ({ activityId }: { activityId: string }, thunkApi) => {
    console.log("test like action");

    const state = thunkApi.getState() as GenericState;
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/activities/${activityId}/like`,
      {
        activityId,
        user: state.auth.loggedInUser.user,
      }
    );
    return res.data;
  }
);
