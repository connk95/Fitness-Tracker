import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";

export interface Comment extends baseMongooseType {
  text: string;
  activityId: string;
  user: User;
  likes?: User[];
}

export interface CommentState extends baseState {
  error: string;
  loading: boolean;
}
