import { createSlice } from "@reduxjs/toolkit";
import { newComment } from "./comment.actions";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newComment.fulfilled, (state) => {
      state.error = "";
      state.loading = false;
    });
    builder.addCase(newComment.pending, (state) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(newComment.rejected, (state, action) => {
      state.error = action.error.message || "Could not add comment.";
      state.loading = false;
    });
  },
});

export default commentSlice.reducer;
