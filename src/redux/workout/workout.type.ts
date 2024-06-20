import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";

export interface Workout extends baseMongooseType {
  title: string;
  duration: string;
  calories: number;
  user: User;
}

export interface WorkoutState extends baseState {
  allWorkouts: Workout[];
  singleWorkout: Workout;
}
