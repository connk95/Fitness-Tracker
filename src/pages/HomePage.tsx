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
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Activity } from "../components/Activity";
import { ActivityType } from "../redux/types";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import SportsGymnasticsSharpIcon from "@mui/icons-material/SportsGymnasticsSharp";
import { fetchFoods } from "../redux/food/food.actions";
import { fetchWorkouts } from "../redux/workout/workout.actions";

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
      }
      return activity.type === filter;
    }
  );

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(Number((event.target as HTMLInputElement).value));
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
        }}
      >
        <Grid container spacing={2} maxWidth="md" sx={{ paddingLeft: 0 }}>
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
                <FormControl>
                  <FormLabel
                    id="radio"
                    sx={{ fontSize: 20, fontWeight: "bold" }}
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
            <Typography sx={{ mt: 5 }}>Page No.</Typography>
            <RadioGroup
              row
              aria-labelledby="page"
              defaultValue="1"
              name="page-buttons-group"
              onChange={handlePageChange}
              sx={{ mb: 5 }}
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
        </Grid>
      </Box>
    </Container>
  );
};
