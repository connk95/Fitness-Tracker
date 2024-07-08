// Users can add workouts to their timeline.
// Users will have the option to create new workouts, or add previously created workouts by searching a database.

// Users can add meals to their timeline.
// Users will have the option to create new meals, or add previously created meals by searching a database.

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchSingleWorkout } from "../redux/workout/workout.actions";
import { CssBaseline } from "@mui/material";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";

export const WorkoutPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const workout = useSelector((state: RootState) => state.workouts);
  //   const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleWorkout(id));
    }
  }, [dispatch, id]);

  return (
    <Container sx={{ mt: 12 }}>
      <CssBaseline />
      {workout.loading ? (
        <Box sx={{}}>
          <CircularProgress />
        </Box>
      ) : workout.singleWorkout.title ? (
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
                // variant="outlined"
                sx={{
                  backgroundColor: "#ebe9e1",
                  border: 0,
                  // mt: 2,
                  borderRadius: 0,
                  height: "10rem",
                }}
                elevation={2}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    <RestaurantSharpIcon sx={{ mr: 1 }} />
                    {workout.singleWorkout.title}
                  </Typography>
                  <Typography>
                    {workout.singleWorkout.user.username} logged a workout!
                  </Typography>
                  <Typography>
                    Duration: {workout.singleWorkout.duration} minutes
                  </Typography>
                  <Typography>
                    Calories burned: {workout.singleWorkout.calories}
                  </Typography>
                  <Typography>
                    {new Date(
                      workout.singleWorkout.createdAt
                    ).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
};
