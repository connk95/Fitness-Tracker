import { CardContent, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Workout } from "../redux/workout/workout.type";
import { Food } from "../redux/food/food.type";
import { ActivityProps } from "../redux/types";

export const Activity: React.FC<ActivityProps> = ({
  activity,
}: ActivityProps): JSX.Element => {
  const isWorkout = (activity: Workout | Food): activity is Workout => {
    return activity.type === "Workout";
  };

  return (
    <Link to={`/activity/${activity._id}`}>
      <Card>
        <CardContent>
          {isWorkout(activity) ? (
            <>
              <Typography>Workout</Typography>
              <Typography variant="h5">{activity.title}</Typography>
              <Typography>By: {activity.user.username}</Typography>
              <Typography>Duration: {activity.duration}</Typography>
              <Typography>Calories burned: {activity.calories}</Typography>
              <Typography>
                {new Date(activity.createdAt).toLocaleDateString()}
              </Typography>
            </>
          ) : (
            <>
              <Typography>Food</Typography>
              <Typography variant="h5">{activity.title}</Typography>
              <Typography>By: {activity.user.username}</Typography>
              <Typography>Calories: {activity.calories}</Typography>
              <Typography>
                {new Date(activity.createdAt).toLocaleDateString()}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
