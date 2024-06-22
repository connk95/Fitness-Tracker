import { Workout } from "./workout/workout.type";
import { Food } from "./food/food.type";

export interface baseMongooseType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface baseState {
  loading: boolean;
  error: string;
}

export type ActivityType =
  | (Workout & { type: "Workout" })
  | (Food & { type: "Food" });

export interface ActivityProps {
  activity: ActivityType;
}
