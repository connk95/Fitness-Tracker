import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";
import { Comment } from "../comment/comment.type";

export interface Workout extends baseMongooseType {
  type: "workouts";
  title: string;
  duration: number;
  calories: number;
  user: User;
  likes?: User[];
  comments?: Comment[];
}

export interface WorkoutState extends baseState {
  allWorkouts: Workout[];
  singleWorkout: Workout;
}
