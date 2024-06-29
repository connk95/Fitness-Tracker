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
import { Activity } from "../components/Activity";
import { ActivityType } from "../redux/types";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import SportsGymnasticsSharpIcon from "@mui/icons-material/SportsGymnasticsSharp";
import { fetchFoods } from "../redux/food/food.actions";
import { fetchWorkouts } from "../redux/workout/workout.actions";

export const HomePage = (): JSX.Element => {
  // const users = useSelector((state: RootState) => state.users.allUsers);
  const auth = useSelector((state: RootState) => state.auth);
  const workouts = useSelector((state: RootState) => state.workouts);
  const foods = useSelector((state: RootState) => state.foods);
  const dispatch = useAppDispatch();

  const allActivity: ActivityType[] = [
    ...foods.allFoods,
    ...workouts.allWorkouts,
  ];

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchFoods());
    dispatch(fetchWorkouts());
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
          paddingLeft: 0,
        }}
      >
        <Grid container spacing={2} maxWidth="md">
          <Grid
            item
            xs={12}
            sx={{
              paddingLeft: 0,
              paddingTop: 0,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {auth.loggedInUser?.access_token ? (
              <Box>
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
                    <FormControlLabel
                      value="food"
                      control={<Radio />}
                      label="Meals Only"
                    />
                    <FormControlLabel
                      value="workout"
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
              <>
                <Typography>All Activity</Typography>
              </>
            )}
            <>
              {Array.isArray(allActivity) &&
                allActivity
                  .slice()
                  .reverse()
                  .map((activity: ActivityType) => (
                    <Activity key={activity._id} activity={activity} /> // Activity component for foods and workouts
                  ))}
            </>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
