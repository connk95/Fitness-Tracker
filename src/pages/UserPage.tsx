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
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { fetchUser } from "../redux/user/user.actions";
import { useAppDispatch } from "../redux/hooks";
import { ActivityType } from "../redux/types";
import { Activity } from "../components/Activity";
import { CommentCard } from "../components/Comment";
// import { PageSelector } from "../components/PageSelector";
import { ActivitySelector } from "../components/ActivitySelector";

export const UserPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.users);

  const [filter, setFilter] = useState<string>("all");
  const [activityPage, setActivityPage] = useState<number>(1);
  const [commentPage, setCommentPage] = useState<number>(1);

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
    setActivityPage(1); // Reset page to 1 when filter changes
  };

  const filteredActivity: ActivityType[] = sortedByCreatedAt.filter(
    (activity) => {
      if (filter === "all") {
        return true;
      }
      return activity.type === filter;
    }
  );

  // const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPage(Number((event.target as HTMLInputElement).value));
  // };

  // const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPage(Number((event.target as HTMLInputElement).value));
  // };

  const handleActivityChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setActivityPage(value);
  };

  const activitySize = 6; // Number of items per page

  const handleCommentChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCommentPage(value);
  };

  const commentSize = 8; // Number of items per page

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
            </Grid>
            {user.user.workouts || user.user.foods ? (
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
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  {Array.isArray(filteredActivity) &&
                  filteredActivity.length > 0 ? (
                    <>
                      {filteredActivity
                        .slice(
                          (activityPage - 1) * activitySize,
                          activityPage * activitySize
                        )
                        .map((activity: ActivityType) => (
                          <Grid item xs={12} sm={6} key={activity._id}>
                            <Activity activity={activity} />
                          </Grid>
                        ))}
                      {/* <PageSelector
                        length={filteredActivity.length}
                        pageSize={activitySize}
                        currentPage={activityPage}
                        onChange={handleActivityChange}
                      /> */}
                    </>
                  ) : (
                    <Typography sx={{ ml: 2 }}>No activities found.</Typography>
                  )}
                  <Pagination
                    count={Math.ceil(filteredActivity.length / activitySize)}
                    shape="rounded"
                    sx={{ mt: 2 }}
                    size="large"
                    page={activityPage}
                    onChange={handleActivityChange}
                  />
                </Grid>
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
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  {Array.isArray(user.user.comments) &&
                  user.user.comments.length > 0 ? (
                    <>
                      {user.user.comments
                        .slice()
                        .reverse()
                        .map((comment) => (
                          <Grid item xs={12} key={comment._id} sx={{ mb: 0 }}>
                            <Link to={`/${comment.type}/${comment.activityId}`}>
                              <CommentCard comment={comment} />
                            </Link>
                          </Grid>
                        ))}
                      {/* <PageSelector
                        length={user.user.comments.length}
                        pageSize={pageSize}
                        currentPage={page}
                        handlePageChange={handleCommentChange}
                      /> */}
                    </>
                  ) : (
                    <Typography sx={{ ml: 2 }}>No comments found.</Typography>
                  )}
                  <Pagination
                    count={Math.ceil(user.user.comments.length / commentSize)}
                    shape="rounded"
                    sx={{ mt: 2 }}
                    size="large"
                    page={commentPage}
                    onChange={handleCommentChange}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default UserPage;
