import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    foods: foodSlice,
    workouts: workoutSlice,
    users: userSlice,
    auth: authSlice,
  },
});
