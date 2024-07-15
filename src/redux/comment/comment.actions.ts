import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { Comment } from "./comment.type";

type GenericState = {
  auth: {
    loggedInUser: {
      user: string;
    };
  };
};

export const newComment = createAsyncThunk(
  `comments/newComment`,
  async (
    {
      text,
      activityId,
      type,
    }: { text: string; activityId: string; type: string },
    thunkApi
  ) => {
    console.log("test action");
    const state = thunkApi.getState() as GenericState;
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/${type}/${activityId}`,
      {
        activityId,
        text,
        user: state.auth.loggedInUser.user,
      }
    );
    return res.data;
  }
);
