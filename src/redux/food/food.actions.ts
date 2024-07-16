import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Food } from "./food.type";
// import { Comment } from "../comment/comment.type";

type GenericState = {
  auth: {
    loggedInUser: {
      user: string;
    };
  };
};

export const fetchSingleFood = createAsyncThunk(
  "foods/fetchSingleFood",
  async (id: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/foods/${id}`);
    return res.data;
  }
);

export const fetchFoods = createAsyncThunk("foods/fetchAllFoods", async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/foods`);
  return res.data;
});

export const newFood = createAsyncThunk(
  "foods/newFood",
  async ({ title, calories }: Food, thunkApi) => {
    const state = thunkApi.getState() as GenericState;
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/foods`, {
      type: "foods",
      title,
      calories,
      user: state.auth.loggedInUser.user,
    });
    return res;
  }
);

// export const foodComment = createAsyncThunk(
//   "posts/newComment",
//   async ({ text, activityId }: Comment, thunkApi) => {
//     const state = thunkApi.getState() as GenericState;
//     const res = await axios.patch(
//       `${import.meta.env.VITE_API_URL}/foods/${activityId}`,
//       {
//         activityId,
//         text,
//         user: state.auth.loggedInUser.user,
//       }
//     );
//     return res.data;
//   }
// );
