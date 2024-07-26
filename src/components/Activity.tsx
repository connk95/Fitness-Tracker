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
  content,
}: ActivityProps): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addLike({ activityId: activity._id }));
  };

  return (
    <Link to={`/${content.type}/${content._id}`}>
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
          {content.type == "workouts" ? (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                <SportsGymnasticsSharpIcon sx={{ mr: 1 }} />
                {content.title}
              </Typography>
              <Typography>
                {content.user.username || "I"} logged a workout!
              </Typography>
              <Typography>Duration: {content.duration} minutes</Typography>
              <Typography>Calories burned: {content.calories}</Typography>
              <Typography>
                {content.createdAt.slice(11, 16)} on{" "}
                {new Date(content.createdAt).toLocaleDateString()}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                <RestaurantSharpIcon sx={{ mr: 1 }} />
                {content.title}
              </Typography>
              <Typography>
                {content.user.username || "I"} logged a food!
              </Typography>
              <Typography>Calories: {content.calories}</Typography>
              <Typography>
                {new Date(content.createdAt).toLocaleDateString()} at {""}
                {content.createdAt.slice(11, 16)}
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
            content.user.username == auth.loggedInUser.user.username ? (
              <></>
            ) : auth.loggedInUser.access_token ? (
              <PersonAddAltSharpIcon sx={{ ml: 1 }} />
            ) : (
              <></>
            )}
          </Box>
          <Box>
            {content.likes && content.likes.length > 0 ? (
              <Typography>
                {content.likes.length}{" "}
                {content.likes.length > 1 ? "users" : "user"} liked this!
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
