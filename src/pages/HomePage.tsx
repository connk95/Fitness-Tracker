// The home page will include an activity feed, which will display recent activity by other members.
// Recent activity includes new account signups, completed exercises, or recently added foods.

// Users will be able to track friends' progress on their fitness journey.
// Users can interact with friends' activity, view workouts and foods, and add friends to their network.

import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { fetchUsers, fetchUser } from "../redux/user/user.actions";
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { User } from "../redux/user/user.type";
import { Workout } from "../redux/workout/workout.type";
import { Food } from "../redux/food/food.type";

export const HomePage = (): JSX.Element => {
  const users = useSelector((state: RootState) => state.users);
  const auth = useSelector((state: RootState) => state.auth);
  // const workouts = useSelector((state: RootState) => state.workouts); ** not needed? **
  // const foods = useSelector((state: RootState) => state.foods); ** not needed? **
  const dispatch = useAppDispatch();

  const allWorkouts: Workout[] = [];
  users.forEach((user) => allWorkouts.push(user.workouts));
  const allFoods: Food[] = [];
  users.forEach((user) => allFoods.push(user.foods));
  const allActivity: Object[] = allWorkouts.concat(allFoods);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 12 }}>
      <CssBaseline />
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
            {auth.loggedInUser.access_token ? (
              <>
                <Button variant="contained" sx={{ width: 120, mt: 2 }}>
                  All Activity
                </Button>
                <Button variant="contained" sx={{ width: 120, mt: 2 }}>
                  Friend Activity
                </Button>
              </>
            ) : (
              <></>
            )}
            <>
              {Array.isArray(allActivity) &&
                allActivity
                  .slice()
                  .reverse()
                  .map((activity) => {
                    <Activity></Activity>; // Activity component for foods and workouts
                  })}
            </>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
