import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";
import { Comment } from "../comment/comment.type";

export interface ActivityType extends baseMongooseType {
  type: string;
  title: string;
  duration: number;
  calories: number;
  user: User;
  likes?: string[];
  comments?: Comment[];
}

export interface ActivityTypeState extends baseState {
  allActivities: ActivityType[];
  singleActivity: ActivityType;
  totalCount: number;
  currentPage: number;
}
