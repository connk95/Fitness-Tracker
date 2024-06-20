import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  userLogin,
  createUser,
  userLogout,
  setLoggedInUser,
} from "./auth.actions";
import { User } from "../user/user.type";
import { AuthState, NewUser, LoggedInUser } from "./auth.type";

const initialState: AuthState = {
  loggedInUser: <LoggedInUser>{},
  newUser: <NewUser>{},
  error: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      userLogin.fulfilled,
      (state, action: PayloadAction<LoggedInUser>) => {
        state.loggedInUser = action.payload;
        state.newUser = <User>{};
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(userLogin.pending, (state) => {
      state.loggedInUser = <LoggedInUser>{};
      state.newUser = <User>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loggedInUser = <LoggedInUser>{};
      state.newUser = <User>{};
      state.error = action.error.message || "Could not find user";
      state.loading = false;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loggedInUser = <LoggedInUser>{};
      state.newUser = <User>{};
      state.error = "";
      state.loading = false;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.newUser = <User>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.newUser = <User>{};
      state.error = action.error.message || "Could not logout";
      state.loading = false;
    });
    builder.addCase(
      createUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.newUser = action.payload;
        state.loggedInUser = <LoggedInUser>{};
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(createUser.pending, (state) => {
      state.loggedInUser = <LoggedInUser>{};
      state.newUser = <User>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loggedInUser = <LoggedInUser>{};
      state.newUser = <User>{};
      state.error = action.error.message || "Could not create user";
      state.loading = false;
    });
    builder.addCase(
      setLoggedInUser.fulfilled,
      (state, action: PayloadAction<LoggedInUser>) => {
        state.loggedInUser = action.payload || <LoggedInUser>{};
        state.newUser = <User>{};
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(setLoggedInUser.pending, (state) => {
      state.loggedInUser = <LoggedInUser>{};
      state.newUser = <User>{};
      state.error = "";
      state.loading = true;
    });
  },
});

export default authSlice.reducer;
