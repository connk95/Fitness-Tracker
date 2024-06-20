import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "./user.type";
import { fetchUser } from "./user.actions";

const initialState: UserState = {
  user: <User>{},
  error: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchUser.pending, (state) => {
      state.user = <User>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.user = <User>{};
      state.error = action.error.message || "Could not find user";
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
