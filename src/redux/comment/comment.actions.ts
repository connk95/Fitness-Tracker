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
    {
      text,
      activityId,
      type,
    }: { text: string; activityId: string; type: string },
    thunkApi
  ) => {
    console.log("test comment");
    const state = thunkApi.getState() as GenericState;
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/${type}/${activityId}/comment`,
      {
        activityId,
        text,
        user: state.auth.loggedInUser.user,
        type,
      }
    );
    return res.data;
  }
);
