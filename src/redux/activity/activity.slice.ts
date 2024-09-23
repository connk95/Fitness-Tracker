import { fetchPaginatedActivities } from "./activity.action";
import { ActivityType } from "../types";
import { createSlice } from "@reduxjs/toolkit";

interface ActivityState {
  activities: ActivityType[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  activities: [],
  totalCount: 0,
  error: "",
  loading: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPaginatedActivities.fulfilled, (state, action) => {
      state.activities = action.payload.activities;
      state.totalCount = action.payload.totalCount;
      state.error = "";
      state.loading = false;
    });
    builder.addCase(fetchPaginatedActivities.pending, (state) => {
      state.activities = [];
      state.totalCount = 0;
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchPaginatedActivities.rejected, (state, action) => {
      state.activities = [];
      state.totalCount = 0;
      state.error = action.error.message || "Could not load activities";
      state.loading = false;
    });
  },
});

export default activitySlice.reducer;
