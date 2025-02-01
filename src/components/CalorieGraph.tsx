import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { ActivityType } from "../redux/types";

export const CalorieGraph: React.FC<{
  weeklyData: { [key: string]: ActivityType[] };
}> = ({ weeklyData }) => {
  const caloriesPerDay = Object.keys(weeklyData).map((day) => {
    const dayData = weeklyData[day];
    // Summing up calories for each day
    const totalCalories = dayData.reduce((sum, activity) => {
      if (activity.type === "workout") {
        return sum - (activity.calories || 0); // Subtract calories for workouts
      } else if (activity.type === "food") {
        return sum + (activity.calories || 0); // Add calories for foods
      }
      return sum; // No change for other types
    }, 0);

    return totalCalories;
  });

  const daysOfWeek = Object.keys(weeklyData);

  return (
    <BarChart
      series={[{ data: caloriesPerDay }]}
      height={180}
      xAxis={[{ data: daysOfWeek, scaleType: "band" }]}
      yAxis={[{}]}
      grid={{ horizontal: true }}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      data-testid="calorieGraph"
    />
  );
};
