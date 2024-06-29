import { CardContent, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ActivityProps } from "../redux/types";

export const Activity: React.FC<ActivityProps> = ({
  activity,
}: ActivityProps): JSX.Element => {
  console.log(activity);
  return (
    <Link to={`/${activity.type}/${activity._id}`}>
      <Card>
        <CardContent>
          {activity.type == "Workout" ? (
            <>
              <Typography>{activity.type}</Typography>
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
              <Typography>{activity.type}</Typography>
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
