import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { RootState } from "../redux/store";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Container,
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { fetchUser } from "../redux/user/user.actions";
import { useAppDispatch } from "../redux/hooks";
import { Linkify } from "../utilities/utilities";
import { ActivityType } from "../redux/types";
import { Activity } from "../components/Activity";
import { CommentCard } from "../components/Comment";

export const UserPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.users);

  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [sortedByCreatedAt, setSortedByCreatedAt] = useState<ActivityType[]>(
    []
  );

  useEffect(() => {
    if (auth.loggedInUser.access_token) {
      const userId = auth.loggedInUser.user._id;
      if (userId) {
        dispatch(fetchUser(userId));
      }
    }
  }, [dispatch, auth]);

  useEffect(() => {
    const allActivity: ActivityType[] = [
      ...(user.user.foods || []),
      ...(user.user.workouts || []),
    ];

    const sortedActivities = allActivity.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setSortedByCreatedAt(sortedActivities);
  }, [user.user.foods, user.user.workouts]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((event.target as HTMLInputElement).value);
    setPage(1); // Reset page to 1 when filter changes
  };

  const filteredActivity: ActivityType[] = sortedByCreatedAt.filter(
    (activity) => {
      if (filter === "all") {
        return true;
      }
      return activity.type === filter;
    }
  );

  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(Number((event.target as HTMLInputElement).value));
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(Number((event.target as HTMLInputElement).value));
  };

  const pageSize = 6; // Number of items per page

  return (
    <Container component="main" sx={{ mt: 12 }}>
      <CssBaseline />
      {!user.user._id ? (
        <Box sx={{ mt: "19%", ml: "47%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12}>
              <Card
                sx={{
                  backgroundColor: "#ebe9e1",
                  border: 0,
                  // mt: 2,
                  borderRadius: 0,
                }}
                elevation={2}
              >
                <CardContent>
                  <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                    Username
                  </Typography>
                  <Typography>{user.user.username}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {user.user.workouts || user.user.foods ? (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: 0,
                  }}
                >
                  <FormControl>
                    <FormLabel
                      id="radio"
                      sx={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#505050",
                      }}
                    >
                      Activity Log
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="radio"
                      defaultValue="all"
                      name="radio-buttons-group"
                      onChange={handleFilterChange}
                    >
                      <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label="All Activity"
                      />
                      <FormControlLabel
                        value="friends"
                        control={<Radio />}
                        label="Friend Activity"
                      />
                      <FormControlLabel
                        value="foods"
                        control={<Radio />}
                        label="Meals Only"
                      />
                      <FormControlLabel
                        value="workouts"
                        control={<Radio />}
                        label="Workouts Only"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {Array.isArray(filteredActivity) &&
                  filteredActivity.length > 0 ? (
                    filteredActivity
                      .slice((page - 1) * pageSize, page * pageSize)
                      .map((activity: ActivityType) => (
                        <Grid item xs={12} sm={6} key={activity._id}>
                          <Activity activity={activity} />
                        </Grid>
                      ))
                  ) : (
                    <Typography sx={{ ml: 2 }}>No activities found.</Typography>
                  )}
                </Grid>
                <Typography sx={{ mt: 2 }}>Page No.</Typography>

                <RadioGroup
                  row
                  aria-labelledby="page"
                  defaultValue="1"
                  name="page-buttons-group"
                  onChange={handleActivityChange}
                  sx={{ mb: 1 }}
                >
                  {Array.from(
                    { length: Math.ceil(filteredActivity.length / pageSize) },
                    (_, index) => (
                      <FormControlLabel
                        key={index + 1}
                        value={`${index + 1}`}
                        control={<Radio />}
                        label={`${index + 1}`}
                      />
                    )
                  )}
                </RadioGroup>
              </Grid>
            ) : (
              <></>
            )}
            {user.user.comments && (
              <Grid item xs={12} sx={{ mb: 8 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 20,
                    mt: 2,
                    color: "#505050",
                  }}
                >
                  Comments
                </Typography>
                {user.user.comments
                  .slice()
                  .reverse()
                  .map((comment) => (
                    <Link to={`/${comment.type}/${comment.activityId}`}>
                      <CommentCard key={comment._id} comment={comment} />
                    </Link>
                  ))}
                <Typography sx={{ mt: 2 }}>Page No.</Typography>

                <RadioGroup
                  row
                  aria-labelledby="page"
                  defaultValue="1"
                  name="page-buttons-group"
                  onChange={handleCommentChange}
                  sx={{ mb: 5 }}
                >
                  {Array.from(
                    { length: Math.ceil(user.user.comments.length / pageSize) },
                    (_, index) => (
                      <FormControlLabel
                        key={index + 1}
                        value={`${index + 1}`}
                        control={<Radio />}
                        label={`${index + 1}`}
                      />
                    )
                  )}
                </RadioGroup>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default UserPage;
