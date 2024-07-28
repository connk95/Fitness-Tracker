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
    // return res.data;
    return { ...res.data, type, activityId };
  }
);

export const addFriend = createAsyncThunk(
  "friends/newFriend",
  async ({ friendId }: { friendId: string }, thunkApi) => {
    console.log("test friend action: ", friendId);
    const state = thunkApi.getState() as GenericState;
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${
        state.auth.loggedInUser.user._id
      }/friends`,
      {
        user: { _id: friendId },
      }
    );

    return res.data;
  }
);
