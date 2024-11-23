import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type GenericState = {
  auth: {
    loggedInUser: {
      user: string;
    };
  };
};

export const newComment = createAsyncThunk(
  "comments/newComment",
  async (
    { text, activityId }: { text: string; activityId: string },
    thunkApi
  ) => {
    const state = thunkApi.getState() as GenericState;
    console.log("activityId: ", activityId);
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/activities/${activityId}/comment`,
      {
        activityId,
        text,
        user: state.auth.loggedInUser.user,
      }
    );
    return res.data;
  }
);
