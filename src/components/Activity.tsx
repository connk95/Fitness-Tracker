import { CardContent, Card, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ActivityProps } from "../redux/types";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import SportsGymnasticsSharpIcon from "@mui/icons-material/SportsGymnasticsSharp";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addLike } from "../redux/activity/activity.action";

export const Activity: React.FC<ActivityProps> = ({
  activity,
}: ActivityProps): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addLike({ activityId: activity._id, type: activity.type }));
  };

  return (
    <Link to={`/${activity.type}/${activity._id}`}>
      <Card
        sx={{
          backgroundColor: "#ebe9e1",
          border: 0,
          borderRadius: 0,
          height: "10rem",
          display: "flex",
          justifyContent: "space-between",
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
                {activity.user.username || "I"} logged a workout!
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
              <Typography>
                {activity.user.username || "I"} logged a food!
              </Typography>
              <Typography>Calories: {activity.calories}</Typography>
              <Typography>
                {new Date(activity.createdAt).toLocaleDateString()} at {""}
                {activity.createdAt.slice(11, 16)}
              </Typography>
            </>
          )}
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <ThumbUpSharpIcon onClick={handleLike} />
            {auth.loggedInUser.access_token &&
            activity.user.username == auth.loggedInUser.user.username ? (
              <></>
            ) : auth.loggedInUser.access_token ? (
              <PersonAddAltSharpIcon sx={{ ml: 1 }} />
            ) : (
              <></>
            )}
          </Box>
          <Box>
            {activity.likes && activity.likes.length > 0 ? (
              <Typography>
                {activity.likes.length}{" "}
                {activity.likes.length > 1 ? "users" : "user"} liked this!
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
