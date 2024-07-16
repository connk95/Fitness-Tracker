import { CardContent, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ActivityProps } from "../redux/types";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import SportsGymnasticsSharpIcon from "@mui/icons-material/SportsGymnasticsSharp";

export const Activity: React.FC<ActivityProps> = ({
  activity,
}: ActivityProps): JSX.Element => {
  return (
    <Link to={`/${activity.type}/${activity._id}`}>
      <Card
        // variant="outlined"
        sx={{
          backgroundColor: "#ebe9e1",
          border: 0,
          // mt: 2,
          borderRadius: 0,
          height: "10rem",
        }}
        elevation={2}
      >
        <CardContent>
          {activity.type == "workouts" ? (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                <SportsGymnasticsSharpIcon sx={{ mr: 1 }} />
                {activity.title}
              </Typography>
              <Typography>
                {activity.user.username} logged a workout!
              </Typography>
              <Typography>Duration: {activity.duration} minutes</Typography>
              <Typography>Calories burned: {activity.calories}</Typography>
              <Typography>
                {activity.createdAt.slice(11, 16)} on{" "}
                {new Date(activity.createdAt).toLocaleDateString()}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                <RestaurantSharpIcon sx={{ mr: 1 }} />
                {activity.title}
              </Typography>
              <Typography>{activity.user.username} logged a food!</Typography>
              <Typography>Calories: {activity.calories}</Typography>
              <Typography>
                {activity.createdAt.slice(11, 16)} on{" "}
                {new Date(activity.createdAt).toLocaleDateString()}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
