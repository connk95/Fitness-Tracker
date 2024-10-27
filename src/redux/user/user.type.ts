import { baseState } from "../types";
import { Comment } from "../comment/comment.type";
import { ActivityType } from "../activity/activity.type";

export interface User {
  username: string;
  password: string;
  email: string;
  activities?: ActivityType[];
  likes?: string[];
  friends?: string[];
  comments?: Comment[];
  _id?: string;
}

export interface UserState extends baseState {
  allUsers: User[];
  user: User;
}
