import {
  addLike,
  fetchPaginatedActivities,
  fetchSingleActivity,
  newActivity,
} from "./activity.action";
import { ActivityType, ActivityState } from "./activity.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ActivityState = {
  allActivities: [],
  singleActivity: <ActivityType>{},
  totalPages: 1,
  page: 1,
  error: "",
  loading: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(
    //   fetchActivities.fulfilled,
    //   (state, action: PayloadAction<ActivityType[]>) => {
    //     state.allActivities = action.payload;
    //     state.singleActivity = <ActivityType>{};
    //     state.error = "";
    //     state.loading = false;
    //   }
    // );
    // builder.addCase(fetchActivities.pending, (state) => {
    //   state.allActivities = [];
    //   state.singleActivity = <ActivityType>{};
    //   state.error = "";
    //   state.loading = true;
    // });
    // builder.addCase(fetchActivities.rejected, (state, action) => {
    //   state.allActivities = [];
    //   state.singleActivity = <ActivityType>{};
    //   state.error = action.error.message || "Could not load activities";
    //   state.loading = false;
    // });
    builder.addCase(
      fetchSingleActivity.fulfilled,
      (state, action: PayloadAction<ActivityType>) => {
        state.allActivities = [];
        state.singleActivity = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchSingleActivity.pending, (state) => {
      state.allActivities = [];
      state.singleActivity = <ActivityType>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchSingleActivity.rejected, (state, action) => {
      state.allActivities = [];
      state.singleActivity = <ActivityType>{};
      state.error = action.error.message || "Could not load workout";
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
      state.error = action.error.message || "Could not create workout";
      state.loading = false;
    });
    builder.addCase(
      addLike.fulfilled,
      (state, action: PayloadAction<ActivityType>) => {
        state.singleActivity = action.payload;
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
    builder.addCase(fetchPaginatedActivities.fulfilled, (state, action) => {
      state.allActivities = action.payload.activities;
      state.totalPages = action.payload.pages;
      state.page = action.payload.page;
      state.error = "";
      state.loading = false;
    });
    builder.addCase(fetchPaginatedActivities.pending, (state) => {
      state.allActivities = [];
      state.totalPages = 0;
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchPaginatedActivities.rejected, (state, action) => {
      state.allActivities = [];
      state.totalPages = 0;
      state.error = action.error.message || "Could not load activities";
      state.loading = false;
    });
  },
});

export default activitySlice.reducer;
