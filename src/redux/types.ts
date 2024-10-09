import { Workout } from "./workout/workout.type";
import { Food } from "./food/food.type";
import { User } from "./user/user.type";

export interface baseMongooseType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface baseState {
  loading: boolean;
  error: string;
}

export type ActivityType = Workout | Food;

export interface ActivityInterface extends baseMongooseType {
  type: string;
  title: string;
  duration: number;
  calories: number;
  user: User;
  likes?: string[];
  comments?: Comment[];
}

export interface ActivityState extends baseState {
  allActivities: ActivityInterface[];
  singleActivity: ActivityInterface;
}

export interface ActivityProps {
  activity: ActivityType;
}
