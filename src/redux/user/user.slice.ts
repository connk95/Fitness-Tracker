import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "./user.type";
import { fetchUser, fetchUsers } from "./user.actions";

const initialState: UserState = {
  allUsers: [],
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
        state.allUsers = [];
        state.user = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchUser.pending, (state) => {
      state.allUsers = [];
      state.user = <User>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.allUsers = [];
      state.user = <User>{};
      state.error = action.error.message || "Could not find user";
      state.loading = false;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.allUsers = action.payload;
        state.user = <User>{};
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchUsers.pending, (state) => {
      state.allUsers = [];
      state.user = <User>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.allUsers = [];
      state.user = <User>{};
      state.error = action.error.message || "Cpuld not find users";
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
