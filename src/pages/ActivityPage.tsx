import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Pagination,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { newComment } from "../redux/comment/comment.actions";
import { Comment } from "../redux/comment/comment.type";
import { CommentCard } from "../components/Comment";
import { Activity } from "../components/Activity";
import { useState } from "react";
import { fetchSingleActivity } from "../redux/activity/activity.action";

export const ActivityPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const activity = useSelector((state: RootState) => state.activities);
  const auth = useSelector((state: RootState) => state.auth);
  const comment = useSelector((state: RootState) => state.comments);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Comment>();
  const pageSize = 12; // Number of items per page

  const [page, setPage] = useState<number>(1);

  const onSubmit: SubmitHandler<Comment> = async (data) => {
    if (!id) {
      console.error("No activity ID found");
      return;
    }
    const commentData = {
      text: data.text,
      activityId: id,
    };
    await dispatch(newComment(commentData));
    window.location.reload();
  };

  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchSingleActivity(id));
  //   }
  // }, [dispatch, id]);
  useEffect(() => {
    if (id && activity.singleActivity?._id !== id) {
      dispatch(fetchSingleActivity(id));
    }
  }, [activity.singleActivity?._id, dispatch, id]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container sx={{ mt: 12 }} maxWidth="md">
      <CssBaseline />
      {activity.loading ? (
        <Box sx={{}}>
          <CircularProgress />
        </Box>
      ) : activity.error || !id || activity.singleActivity == null ? (
        <Box>
          <Typography>No activity found.</Typography>
        </Box>
      ) : activity.singleActivity?.title ? (
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
              <Activity activity={activity.singleActivity} />
            </Grid>
            {auth.loggedInUser?.access_token ? (
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
                  id="comment-input"
                  label="Comment"
                  variant="outlined"
                  fullWidth
                  InputProps={{ sx: { borderRadius: 0 } }}
                />
                {comment?.error && (
                  <Typography variant="caption" color="error">
                    {comment.error || "Could not add comment."}
                  </Typography>
                )}
                {errors.text && (
                  <Typography variant="caption" color="error">
                    {errors.text.message}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 90, mt: 2, mb: 2, borderRadius: 0 }}
                >
                  Submit
                </Button>
                <Button
                  href="/home"
                  variant="contained"
                  sx={{ width: 90, mt: 2, mb: 2, borderRadius: 0 }}
                >
                  Back
                </Button>
              </Grid>
            ) : (
              <></>
            )}
            {activity.singleActivity.comments &&
            activity.singleActivity.comments.length > 0 ? (
              <Grid item xs={12}>
                <Typography sx={{ ml: 1, mb: 2, mt: -2 }}>
                  Comments: {`${activity.singleActivity.comments.length}`}
                </Typography>
                {activity.singleActivity.comments
                  .slice()
                  .reverse()
                  .map((comment, index) => (
                    <Box sx={{ mt: 2 }} key={index}>
                      <CommentCard comment={comment} />
                    </Box>
                  ))}
                <Box sx={{ ml: -2, mb: 10 }}>
                  <Pagination
                    count={Math.ceil(
                      activity.singleActivity.comments.length / pageSize
                    )}
                    shape="rounded"
                    sx={{ mt: 2 }}
                    size="large"
                    page={page}
                    onChange={handlePageChange}
                  />
                </Box>
              </Grid>
            ) : (
              <Typography sx={{ m: 2, ml: 3, mb: 10 }}>
                Be the first to leave a comment!
              </Typography>
            )}
          </Grid>
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
};
