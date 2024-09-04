import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";
import { Comment } from "../comment/comment.type";

export interface Food extends baseMongooseType {
  type: "foods";
  title: string;
  calories: number;
  user: User;
  likes?: string[];
  comments?: Comment[];
}

export interface FoodState extends baseState {
  allFoods: Food[];
  singleFood: Food;
}
