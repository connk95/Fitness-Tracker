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
  Button,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchSingleFood } from "../redux/food/food.actions";
import { CssBaseline } from "@mui/material";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import { SubmitHandler, useForm } from "react-hook-form";
import { newComment } from "../redux/comment/comment.actions";
// import { foodComment } from "../redux/food/food.actions";
import { Comment } from "../redux/comment/comment.type";
import { Linkify } from "../utilities/utilities";

export const FoodPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const food = useSelector((state: RootState) => state.foods);
  const auth = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Comment>();

  const onSubmit: SubmitHandler<Comment> = async (data) => {
    console.log("test submit");
    if (!id) {
      console.error("No activity ID found");
      return;
    }
    const commentData = {
      text: data.text,
      activityId: id,
      type: "foods",
    };
    await dispatch(newComment(commentData));
    window.location.reload();
  };

  // const onSubmit: SubmitHandler<Comment> = async (data) => {
  //   const commentData = {
  //     text: data.text,
  //     postId: id,
  //   };
  //   await dispatch(foodComment(commentData));
  //   window.location.reload();
  // };

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleFood(id));
    }
  }, [dispatch, id]);

  return (
    <Container sx={{ mt: 12 }}>
      <CssBaseline />
      {food.loading ? (
        <Box sx={{}}>
          <CircularProgress />
        </Box>
      ) : food.singleFood.title ? (
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
              <Card
                // variant="outlined"
                sx={{
                  backgroundColor: "#ebe9e1",
                  border: 0,
                  // mt: 2,
                  borderRadius: 0,
                }}
                elevation={2}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    <RestaurantSharpIcon sx={{ mr: 1 }} />
                    {food.singleFood.title}
                  </Typography>
                  <Typography>
                    {food.singleFood.user.username} logged a food!
                  </Typography>
                  <Typography>Calories: {food.singleFood.calories}</Typography>
                  <Typography>
                    {food.singleFood.createdAt.slice(11, 16)} on{" "}
                    {new Date(food.singleFood.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {food.singleFood.comments && food.singleFood.comments.length > 0 ? (
              <Grid item xs={12}>
                <Typography sx={{ ml: 1, mb: 2 }}>
                  Comments: {`${food.singleFood.comments.length}`}
                </Typography>
                {food.singleFood.comments
                  .slice()
                  .reverse()
                  .map((comment) => (
                    <Card
                      key={comment._id}
                      sx={{
                        my: 1,
                        backgroundColor: "#ebe9e1",
                        borderRadius: 0,
                        border: 0,
                      }}
                    >
                      <CardContent>
                        <Linkify sx={{ mb: 1 }}>{comment.text}</Linkify>
                        <Typography sx={{ fontSize: 14 }}>
                          {comment.createdAt.slice(11, 16)} on{" "}
                          {new Date(comment.createdAt).toLocaleDateString()}{" "}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          by {comment.user.username}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Grid>
            ) : (
              <Typography sx={{ m: 2, ml: 3 }}>
                Be the first to leave a comment!
              </Typography>
            )}
            {auth.loggedInUser.access_token ? (
              <Grid item xs={12}>
                <TextField
                  {...register("text", {
                    required: "Please add a comment and try again",
                    maxLength: {
                      value: 240,
                      message:
                        "Comments cannot exceed 240 characters in length",
                    },
                  })}
                  id="text"
                  label="Comment"
                  variant="outlined"
                  fullWidth
                  InputProps={{ sx: { borderRadius: 0 } }}
                />
                {errors.text && (
                  <Typography variant="caption" color="error">
                    {errors.text.message}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 90, mt: 2, mb: 10, borderRadius: 0 }}
                >
                  Submit
                </Button>
                <Button
                  href="/home"
                  variant="contained"
                  sx={{ width: 90, mt: 2, mb: 10, borderRadius: 0 }}
                >
                  Back
                </Button>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
};
