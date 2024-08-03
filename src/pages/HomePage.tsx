import React, { useState, useEffect } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { fetchUsers } from "../redux/user/user.actions";
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  Box,
  Grid,
  Pagination,
} from "@mui/material";
import { Activity } from "../components/Activity";
import { ActivityType } from "../redux/types";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import SportsGymnasticsSharpIcon from "@mui/icons-material/SportsGymnasticsSharp";
import { fetchFoods } from "../redux/food/food.actions";
import { fetchWorkouts } from "../redux/workout/workout.actions";
// import { PageSelector } from "../components/PageSelector";
import { ActivitySelector } from "../components/ActivitySelector";

export const HomePage = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const workouts = useSelector((state: RootState) => state.workouts);
  const foods = useSelector((state: RootState) => state.foods);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [sortedByCreatedAt, setSortedByCreatedAt] = useState<ActivityType[]>(
    []
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchFoods());
    dispatch(fetchWorkouts());
  }, [dispatch]);

  useEffect(() => {
    const allActivity: ActivityType[] = [
      ...foods.allFoods,
      ...workouts.allWorkouts,
    ];

    const sortedActivities = allActivity.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setSortedByCreatedAt(sortedActivities);
  }, [foods.allFoods, workouts.allWorkouts]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((event.target as HTMLInputElement).value);
    setPage(1); // Reset page to 1 when filter changes
  };

  const filteredActivity: ActivityType[] = sortedByCreatedAt.filter(
    (activity) => {
      if (filter === "all") {
        return true;
      } else if (filter === "friends") {
        return auth.loggedInUser.user.friends?.includes(activity.user);
      }
      return activity.type === filter;
    }
  );

  // const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPage(Number((event.target as HTMLInputElement).value));
  // };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const pageSize = 12; // Number of items per page

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: 0,
          mb: 8,
        }}
      >
        <Grid
          container
          spacing={2}
          maxWidth="md"
          sx={{ display: "flex", justifyContent: "center" }}
        >
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
            {auth.loggedInUser?.access_token ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 0,
                }}
              >
                <ActivitySelector
                  filter={filter}
                  handleFilterChange={handleFilterChange}
                />
                <Box>
                  <Button
                    variant="contained"
                    href="/foods/new"
                    sx={{ width: 180, mt: 0, borderRadius: 0 }}
                  >
                    <RestaurantSharpIcon sx={{ mr: 1 }} />
                    New Meal
                  </Button>
                  <Button
                    variant="contained"
                    href="/workouts/new"
                    sx={{ width: 180, mt: 0, borderRadius: 0 }}
                  >
                    <SportsGymnasticsSharpIcon sx={{ mr: 1 }} />
                    New Workout
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography>All Activity</Typography>
            )}
            <Grid
              container
              spacing={2}
              sx={{ mt: 2, display: "felx", justifyContent: "flexStart" }}
            >
              {Array.isArray(filteredActivity) &&
              filteredActivity.length > 0 ? (
                <>
                  {filteredActivity
                    .slice((page - 1) * pageSize, page * pageSize)
                    .map((activity: ActivityType) => (
                      <Grid item xs={12} sm={6} key={activity._id}>
                        <Activity activity={activity} />
                      </Grid>
                    ))}
                  {/* <PageSelector
                    length={filteredActivity.length}
                    pageSize={pageSize}
                    currentPage={page}
                    handlePageChange={handlePageChange}
                  /> */}
                  {/* <Pagination
                    count={filteredActivity.length / 12}
                    shape="rounded"
                    sx={{ mt: 2 }}
                    size="large"
                  /> */}
                </>
              ) : (
                <Typography sx={{ ml: 2 }}>No activities found.</Typography>
              )}
            </Grid>
          </Grid>
          <Pagination
            count={Math.ceil(filteredActivity.length / pageSize)}
            shape="rounded"
            sx={{ mt: 2 }}
            size="large"
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
      </Box>
    </Container>
  );
};
