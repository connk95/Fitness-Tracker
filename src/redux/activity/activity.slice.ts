import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "./activity.type";
import { ActivityState } from "./activity.type";
import {
  fetchActivities,
  fetchSingleActivity,
  newActivity,
} from "./activity.action";

const initialState: ActivityState = {
  allActivities: [],
  singleActivity: <Activity>{},
  error: "",
  loading: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchActivities.fulfilled,
      (state, action: PayloadAction<Activity[]>) => {
        state.allActivities = action.payload;
        state.singleActivity = <Activity>{};
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchActivities.pending, (state) => {
      state.allActivities = [];
      state.singleActivity = <Activity>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchActivities.rejected, (state, action) => {
      state.allActivities = [];
      state.singleActivity = <Activity>{};
      state.error = action.error.message || "Could not load activities";
      state.loading = false;
    });
    builder.addCase(
      fetchSingleActivity.fulfilled,
      (state, action: PayloadAction<Activity>) => {
        state.allActivities = [];
        state.singleActivity = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchSingleActivity.pending, (state) => {
      state.allActivities = [];
      state.singleActivity = <Activity>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchSingleActivity.rejected, (state, action) => {
      state.allActivities = [];
      state.singleActivity = <Activity>{};
      state.error = action.error.message || "Could not load activity";
      state.loading = false;
    });
    builder.addCase(newActivity.fulfilled, (state) => {
      state.error = "";
      state.loading = false;
    });
    builder.addCase(newActivity.pending, (state) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(newActivity.rejected, (state, action) => {
      state.error = action.error.message || "Could not create activity";
      state.loading = false;
    });
  },
});

export default activitySlice.reducer;
