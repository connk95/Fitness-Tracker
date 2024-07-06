import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";

export interface Workout extends baseMongooseType {
  type: "workouts";
  title: string;
  duration: number;
  calories: number;
  user: User;
}

export interface WorkoutState extends baseState {
  allWorkouts: Workout[];
  singleWorkout: Workout;
}
