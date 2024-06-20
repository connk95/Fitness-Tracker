import { baseState } from "../types";
import { User } from "../user/user.type";

export interface NewUser {
  username: string;
  password: string;
  email: string;
}

export interface AuthState extends baseState {
  loggedInUser: LoggedInUser;
  newUser: NewUser;
}

export interface LoggedInUser {
  access_token: string;
  user: User;
}

export interface UserLoginData {
  username: string;
  password: string;
}
