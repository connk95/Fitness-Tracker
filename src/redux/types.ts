import { ActivityType } from "./activity/activity.type";

export interface baseMongooseType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface baseState {
  loading: boolean;
  error: string;
}

export interface ActivityProps {
  activity: ActivityType;
}
