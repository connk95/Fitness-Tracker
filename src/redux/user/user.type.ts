import { baseState } from "../types";
import { Food } from "../food/food.type";
import { Workout } from "../workout/workout.type";
import { Comment } from "../comment/comment.type";

export interface User {
  username: string;
  password: string;
  email: string;
  foods?: Food[];
  workouts?: Workout[];
  likes?: [];
  comments?: Comment[];
  _id?: string;
}

export interface UserState extends baseState {
  allUsers: User[];
  user: User;
}
