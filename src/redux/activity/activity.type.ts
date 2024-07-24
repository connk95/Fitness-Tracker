import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";
import { Comment } from "../comment/comment.type";

export interface Activity extends baseMongooseType {
  type: string;
  title: string;
  duration?: number;
  calories: number;
  user: User;
  likes?: User[];
  comments?: Comment[];
}

export interface ActivityState extends baseState {
  allActivities: Activity[];
  singleActivity: Activity;
}
