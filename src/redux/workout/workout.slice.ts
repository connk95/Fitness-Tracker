import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutState, Workout } from "./workout.type";
import {
  fetchSingleWorkout,
  fetchWorkouts,
  newWorkout,
} from "./workout.actions";
import { addLike } from "../activity/activity.action";

const initialState: WorkoutState = {
  allWorkouts: [],
  singleWorkout: <Workout>{},
  error: "",
  loading: false,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchWorkouts.fulfilled,
      (state, action: PayloadAction<Workout[]>) => {
        state.allWorkouts = action.payload;
        state.singleWorkout = <Workout>{};
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchWorkouts.pending, (state) => {
      state.allWorkouts = [];
      state.singleWorkout = <Workout>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchWorkouts.rejected, (state, action) => {
      state.allWorkouts = [];
      state.singleWorkout = <Workout>{};
      state.error = action.error.message || "Could not load workouts";
      state.loading = false;
    });
    builder.addCase(
      fetchSingleWorkout.fulfilled,
      (state, action: PayloadAction<Workout>) => {
        state.allWorkouts = [];
        state.singleWorkout = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchSingleWorkout.pending, (state) => {
      state.allWorkouts = [];
      state.singleWorkout = <Workout>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchSingleWorkout.rejected, (state, action) => {
      state.allWorkouts = [];
      state.singleWorkout = <Workout>{};
      state.error = action.error.message || "Could not load workout";
      state.loading = false;
    });
    builder.addCase(newWorkout.fulfilled, (state) => {
      state.error = "";
      state.loading = false;
    });
    builder.addCase(newWorkout.pending, (state) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(newWorkout.rejected, (state, action) => {
      state.error = action.error.message || "Could not create workout";
      state.loading = false;
    });
    builder.addCase(
      addLike.fulfilled,
      (state, action: PayloadAction<Workout>) => {
        state.singleWorkout = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(addLike.pending, (state) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(addLike.rejected, (state, action) => {
      state.error = action.error.message || "Could not add like";
      state.loading = false;
    });
  },
});

export default workoutSlice.reducer;
