import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Box,
  Container,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Workout } from "../redux/workout/workout.type";
// import { newWorkout } from "../redux/workout/workout.actions";
import { newActivity } from "../redux/activity/activity.action";
import { ActivityInterface } from "../redux/types";

export const NewWorkout = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const workouts = useSelector((state: RootState) => state.workouts);
  const auth = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Workout>();

  // const onSubmit: SubmitHandler<Workout> = async (data) => {
  //   await dispatch(newWorkout(data));
  //   navigate("/home");
  // };

  const onSubmit: SubmitHandler<ActivityInterface> = async (data) => {
    data.type = "workout";
    await dispatch(newActivity(data));
    navigate("/home");
  };

  return (
    <Container component="main" sx={{ mt: 12 }}>
      <CssBaseline />
      {workouts.loading ? (
        <Box sx={{ ml: "46%" }}>
          <CircularProgress />
        </Box>
      ) : auth.loggedInUser.access_token ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12}>
              <TextField
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long",
                  },
                })}
                id="title"
                label="Title"
                name="title"
                variant="outlined"
                required
                fullWidth
                autoFocus
                InputProps={{ sx: { borderRadius: 0 } }}
              />
              {errors.title && (
                <Typography variant="caption" color="error">
                  {errors.title.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("duration", {
                  maxLength: {
                    value: 9999,
                    message: "Duration cannot exceed 9999 minutes",
                  },
                })}
                id="duration"
                label="Duration (minutes)"
                name="duration"
                variant="outlined"
                fullWidth
                InputProps={{ sx: { borderRadius: 0 } }}
              />
              {errors.duration && (
                <Typography variant="caption" color="error">
                  {errors.duration.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("calories", {
                  maxLength: {
                    value: 4,
                    message: "Calories may not exceed 9999",
                  },
                })}
                id="calories"
                label="Calories"
                name="calories"
                fullWidth
                InputProps={{ sx: { borderRadius: 0 } }}
              />
              {errors.calories && (
                <Typography variant="caption" color="error">
                  {errors.calories.message}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 90, mt: 2, mb: 10 }}
              >
                Submit
              </Button>
              <Button
                href="/home"
                variant="contained"
                sx={{ width: 90, mt: 2, mb: 10 }}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography>Please sign in to make a post.</Typography>
      )}
    </Container>
  );
};
