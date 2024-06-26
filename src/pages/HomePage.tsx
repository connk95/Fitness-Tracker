// The home page will include an activity feed, which will display recent activity by other members.
// Recent activity includes new account signups, completed exercises, or recently added foods.

// Users will be able to track friends' progress on their fitness journey.
// Users can interact with friends' activity, view workouts and foods, and add friends to their network.

import { RootState } from "../redux/store";
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
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { User } from "../redux/user/user.type";
import { Workout } from "../redux/workout/workout.type";
import { Food } from "../redux/food/food.type";
import { Activity } from "../components/Activity";
import { ActivityType } from "../redux/types";

export const HomePage = (): JSX.Element => {
  const users = useSelector((state: RootState) => state.users.allUsers);
  const auth = useSelector((state: RootState) => state.auth);
  // const workouts = useSelector((state: RootState) => state.workouts); ** not needed? **
  // const foods = useSelector((state: RootState) => state.foods); ** not needed? **
  const dispatch = useAppDispatch();

  console.log(auth);

  const allWorkouts: ActivityType[] = users.flatMap((user: User) =>
    (user.workouts ?? []).map((workout) => ({ ...workout, type: "Workout" }))
  );

  const allFoods: ActivityType[] = users.flatMap((user: User) =>
    (user.foods ?? []).map((food) => ({ ...food, type: "Food" }))
  );

  const allActivity: ActivityType[] = [...allWorkouts, ...allFoods];

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
            {auth.loggedInUser?.access_token ? (
              <>
                <FormControl>
                  <FormLabel id="radio">Activity Log</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="radio"
                    defaultValue="all"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All Activity"
                    />
                    <FormControlLabel
                      value="friend"
                      control={<Radio />}
                      label="Friend Activity"
                    />
                    {/* <FormControlLabel
                      value="food"
                      control={<Radio />}
                      label="Food"
                    /> */}
                  </RadioGroup>
                </FormControl>
                <Button variant="contained" sx={{ width: 120, mt: 2 }}>
                  Record Meal
                </Button>
                <Button variant="contained" sx={{ width: 120, mt: 2 }}>
                  Record Workout
                </Button>
              </>
            ) : (
              <>
                <Typography>All Activity</Typography>
              </>
            )}
            <>
              {Array.isArray(allActivity) &&
                allActivity
                  .slice()
                  .reverse()
                  .map((activity: ActivityType) => {
                    <Activity key={activity._id} activity={activity} />; // Activity component for foods and workouts
                  })}
            </>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
