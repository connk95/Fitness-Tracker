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
  Pagination,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { fetchUser } from "../redux/user/user.actions";
import { useAppDispatch } from "../redux/hooks";
import { ActivityType } from "../redux/activity/activity.type";
import { Activity } from "../components/Activity";
import { CommentCard } from "../components/Comment";
import { ActivitySelector } from "../components/ActivitySelector";
import { CalorieGraph } from "../components/CalorieGraph";
import { fetchPaginatedActivities } from "../redux/activity/activity.action";

export const UserPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.users);
  const activities = useSelector((state: RootState) => state.activities);

  const [filter, setFilter] = useState<string>("all");
  const [activityPage, setActivityPage] = useState<number>(1);
  const [commentPage, setCommentPage] = useState<number>(1);

  const [sortedByCreatedAt, setSortedByCreatedAt] = useState<ActivityType[]>(
    []
  );

  const [dataRange, setDataRange] = useState<number>(7);
  const [calorieData, setCalorieData] = useState<{
    [key: string]: ActivityType[];
  }>({});

  const totalItems = activities.totalCount;
  const activityLimit = 6; // Number of items per page

  useEffect(() => {
    // const foods = auth.loggedInUser.user?.foods || [];
    // const workouts = auth.loggedInUser.user?.workouts || [];
    const activities = auth.loggedInUser.user?.activities || [];

    const taskArray: ActivityType[] = activities;

    setCalorieData(getCalorieData(taskArray));
  }, [auth.loggedInUser, dataRange]);

  const getCalorieData = (data: ActivityType[]) => {
    const result: { [key: string]: ActivityType[] } = {};
    const today = new Date();

    // Convert to JST by adjusting for the offset (JST is UTC+9)
    today.setHours(today.getHours());

    for (let i = 0; i < dataRange; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const dayKey = day.toISOString().split("T")[0]; // Using ISO date as key

      const dayData = data.filter((entry: ActivityType) => {
        const entryDate = new Date(entry.createdAt);

        return (
          entryDate.getDate() === day.getDate() &&
          entryDate.getMonth() === day.getMonth() &&
          entryDate.getFullYear() === day.getFullYear()
        );
      });

      result[dayKey] = dayData;
    }

    return result;
  };

  useEffect(() => {
    if (auth.loggedInUser.access_token) {
      const userId = auth.loggedInUser.user._id;
      if (userId) {
        dispatch(fetchUser(userId));
        dispatch(
          fetchPaginatedActivities({ page: 1, limit: activityLimit, filter })
        );
      }
    }
  }, [dispatch, auth, activityPage, filter]);

  useEffect(() => {
    const allActivity: ActivityType[] = [...(user.user.activities || [])];

    const sortedActivities = allActivity.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setSortedByCreatedAt(sortedActivities);
  }, [user.user.activities]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = (event.target as HTMLInputElement).value;
    setFilter(newFilter);
    setActivityPage(1); // Reset page to 1 when filter changes
    dispatch(
      fetchPaginatedActivities({
        page: 1,
        limit: activityLimit,
        filter: newFilter,
      })
    );
  };

  const handleDataRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataRange(Number((event.target as HTMLInputElement).value));
  };

  const filteredActivity: ActivityType[] = sortedByCreatedAt.filter(
    (activity) => {
      if (filter === "all") {
        return true;
      }
      return activity.type === filter;
    }
  );

  const handleActivityChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setActivityPage(value);
    dispatch(
      fetchPaginatedActivities({ page: value, limit: activityLimit, filter })
    );
  };

  const handleCommentChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCommentPage(value);
  };

  const commentSize = 6; // Number of items per page

  return (
    <Container component="main" sx={{ mt: 12 }} maxWidth="md">
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
            paddingLeft: 0,
          }}
        >
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12}>
              <Card
                sx={{
                  backgroundColor: "#ebe9e1",
                  border: 0,
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
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#505050",
                    mr: 2,
                  }}
                >
                  My Calories
                </Typography>

                <RadioGroup
                  row
                  aria-label="data-range"
                  name="data-range"
                  value={dataRange.toString()}
                  onChange={handleDataRangeChange}
                >
                  <FormControlLabel
                    value="7"
                    control={<Radio />}
                    label="7 Days"
                  />
                  <FormControlLabel
                    value="30"
                    control={<Radio />}
                    label="30 Days"
                  />
                </RadioGroup>
              </Box>
              <Card
                sx={{
                  backgroundColor: "#ebe9e1",
                  border: 0,
                  borderRadius: 0,
                  mt: 2,
                }}
                elevation={2}
              >
                <CardContent>
                  <CalorieGraph weeklyData={calorieData}></CalorieGraph>
                </CardContent>
              </Card>
            </Grid>
            {user.user.activities ? (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingLeft: 0,
                  paddingTop: 0,
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <ActivitySelector
                  filter={filter}
                  handleFilterChange={handleFilterChange}
                />
                <Grid
                  container
                  spacing={2}
                  sx={{ mt: 0, display: "flex", flexDirection: "row" }}
                >
                  {Array.isArray(filteredActivity) &&
                  filteredActivity.length > 0 ? (
                    <>
                      {filteredActivity.map((activity: ActivityType) => (
                        <Grid item xs={12} sm={6} key={activity._id}>
                          <Activity activity={activity} />
                        </Grid>
                      ))}
                    </>
                  ) : (
                    <Typography sx={{ ml: 2 }}>No activities found.</Typography>
                  )}
                </Grid>
                <Pagination
                  count={Math.ceil(totalItems / activityLimit)}
                  shape="rounded"
                  sx={{ mt: 2 }}
                  size="large"
                  page={activityPage}
                  onChange={handleActivityChange}
                />
              </Grid>
            ) : null}
            {user.user.comments && (
              <Grid item xs={12} sx={{ mb: 8 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 20,
                    mt: 0,
                    color: "#505050",
                  }}
                >
                  Comments
                </Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{ mt: 0, display: "flex", flexDirection: "column" }}
                >
                  {Array.isArray(user.user.comments) &&
                  user.user.comments.length > 0 ? (
                    <>
                      {user.user.comments
                        .slice(
                          (commentPage - 1) * commentSize,
                          commentPage * commentSize
                        )
                        .reverse()
                        .map((comment) => (
                          <Grid item xs={12} key={comment._id} sx={{ mb: 0 }}>
                            <Link to={`/${comment.type}/${comment.activityId}`}>
                              <CommentCard comment={comment} />
                            </Link>
                          </Grid>
                        ))}
                    </>
                  ) : (
                    <Typography sx={{ ml: 2 }}>No comments found.</Typography>
                  )}
                </Grid>
                <Pagination
                  count={Math.ceil(user.user.comments.length / commentSize)}
                  shape="rounded"
                  sx={{ mt: 2 }}
                  size="large"
                  page={commentPage}
                  onChange={handleCommentChange}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default UserPage;
