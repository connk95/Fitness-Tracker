import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Workout } from "./workout.type";

type GenericState = {
  auth: {
    loggedInUser: {
      user: string;
    };
  };
};

export const fetchSingleWorkout = createAsyncThunk(
  "workouts/fetchSingleWorkout",
  async (id: string) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/workouts/${id}`
    );
    return res.data;
  }
);

export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchAllWorkouts",
  async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/workouts`);
    return res.data;
  }
);

export const newWorkout = createAsyncThunk(
  "workouts/newWorkout",
  async ({ title, duration, calories }: Workout, thunkApi) => {
    const state = thunkApi.getState() as GenericState;
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/workouts`, {
      type: "Workout",
      title,
      duration,
      calories,
      user: state.auth.loggedInUser.user,
    });
    return res;
  }
);
