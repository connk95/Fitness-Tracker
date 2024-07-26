// import { Workout } from "./workout/workout.type";
// import { Food } from "./food/food.type";
import { Activity } from "./activity/activity.type";

export interface baseMongooseType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface baseState {
  loading: boolean;
  error: string;
}

// export type ActivityType = Workout | Food;
export type ActivityType = Activity;

export interface ActivityProps {
  content: ActivityType;
}
