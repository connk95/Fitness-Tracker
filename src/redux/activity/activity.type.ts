import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";
import { Comment } from "../comment/comment.type";

export interface ActivityType extends baseMongooseType {
  type: string;
  title: string;
  duration?: number;
  calories: number;
  user: User;
  likes?: string[];
  comments?: Comment[];
}

export interface ActivityState extends baseState {
  allActivities: ActivityType[];
  singleActivity: ActivityType | null;
  totalPages: number;
  page: number;
  error: string;
  loading: boolean;
}
