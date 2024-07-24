import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type GenericState = {
  auth: {
    loggedInUser: {
      user: string;
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
        type,
        user: state.auth.loggedInUser.user,
      }
    );
    return res.data;
  }
);
