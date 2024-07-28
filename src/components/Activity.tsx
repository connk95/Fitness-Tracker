import React, { useEffect, useState } from "react";
import { CardContent, Card, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ActivityProps } from "../redux/types";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import SportsGymnasticsSharpIcon from "@mui/icons-material/SportsGymnasticsSharp";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addFriend, addLike } from "../redux/activity/activity.action";
import { useAppDispatch } from "../redux/hooks";
import { User } from "../redux/user/user.type";

export const Activity: React.FC<ActivityProps> = ({
  activity,
}: ActivityProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [likeCount, setLikeCount] = useState(activity.likes?.length ?? 0);

  const handleLike = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const userId = auth.loggedInUser?.user?._id;

    if (!userId) {
      console.error("Please log in to interact with this post.");
      return;
    }

    const likeIds = activity.likes?.map((like: User) => like._id);
    const hasLiked = likeIds?.includes(userId);

    if (hasLiked) {
      return;
    } else {
      setLikeCount((activity.likes?.length || 0) + 1);
      await dispatch(
        addLike({ activityId: activity._id, type: activity.type })
      );
    }
  };

  const handleFriend = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("test friend dispatch");

    if (
      activity.user._id &&
      auth.loggedInUser.user._id &&
      activity.user._id !== auth.loggedInUser.user._id
    )
      await dispatch(
        addFriend({
          friendId: activity.user._id,
        })
      );
  };

  useEffect(() => {
    setLikeCount(activity.likes?.length ?? 0);
  }, [activity.likes]);

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
          {activity.type === "workouts" ? (
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
                {new Date(activity.createdAt).toLocaleDateString()} at{" "}
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
            alignItems: "flex-end",
          }}
        >
          <Box sx={{ position: "relative", top: 23 }}>
            <ThumbUpSharpIcon
              onClick={handleLike}
              sx={{
                cursor: "pointer",
                ":hover": {
                  color: "#9f2b0c",
                },
              }}
            />
            {(auth.loggedInUser.access_token &&
              activity.user.username === auth.loggedInUser.user.username) ||
            window.location.href.includes("/profile") ? (
              <></>
            ) : auth.loggedInUser.access_token ? (
              <PersonAddAltSharpIcon
                onClick={handleFriend}
                sx={{
                  ml: 1,
                  cursor: "pointer",
                  ":hover": {
                    color: "#9f2b0c",
                  },
                }}
              />
            ) : (
              <></>
            )}
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{
                  fontSize: "8px",
                  position: "relative",
                  bottom: 10,
                  left: 10,
                }}
              >
                {likeCount}
              </Typography>
              {(auth.loggedInUser.access_token &&
                activity.user.username === auth.loggedInUser.user.username) ||
              window.location.href.includes("/profile") ? (
                <></>
              ) : auth.loggedInUser.access_token ? (
                <Typography
                  sx={{
                    fontSize: "8px",
                    position: "relative",
                    bottom: 10,
                    left: 20,
                  }}
                >
                  + Friend
                </Typography>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
