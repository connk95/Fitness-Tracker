import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";

export interface Food extends baseMongooseType {
  title: string;
  calories: number;
  user: User;
}

export interface FoodState extends baseState {
  allFoods: Food[];
  singleFood: Food;
}
