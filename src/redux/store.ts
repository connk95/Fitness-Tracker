import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./food/food.slice";
import workoutSlice from "./workout/workout.slice";
import userSlice from "./user/user.slice";
import authSlice from "./auth/auth.slice";
import activitySlice from "./activity/activity.slice";

export const store = configureStore({
  reducer: {
    foods: foodSlice,
    workouts: workoutSlice,
    activities: activitySlice,
    users: userSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
