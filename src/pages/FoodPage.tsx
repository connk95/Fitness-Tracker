// import {
//   Box,
//   CircularProgress,
//   Container,
//   Grid,
//   Typography,
//   Button,
//   TextField,
//   Pagination,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useAppDispatch } from "../redux/hooks";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { useEffect } from "react";
// import { fetchSingleFood } from "../redux/food/food.actions";
// import { CssBaseline } from "@mui/material";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { newComment } from "../redux/comment/comment.actions";
// import { Comment } from "../redux/comment/comment.type";
// import { CommentCard } from "../components/Comment";
// import { Activity } from "../components/Activity";
// import { useState } from "react";

// export const FoodPage = (): JSX.Element => {
//   const { id } = useParams();
//   const auth = useSelector((state: RootState) => state.auth);
//   // const food = useSelector((state: RootState) => state.foods.singleFood);
//   const food = useSelector(
//     (state: RootState) => state.activities.singleActivity
//   );
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Comment>();
//   const dispatch = useAppDispatch();
//   const pageSize = 12; // Number of items per page

//   const [page, setPage] = useState<number>(1);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchSingleFood(id));
//     }
//   }, [dispatch, id]);

//   const onSubmit: SubmitHandler<Comment> = async (data, event) => {
//     if (event) {
//       event.stopPropagation();
//       event.preventDefault();
//     }

//     if (!id) {
//       console.error("No activity ID found");
//       return;
//     }
//     const commentData = {
//       text: data.text,
//       activityId: id,
//       type: "food",
//     };
//     await dispatch(newComment(commentData));
//     dispatch(fetchSingleFood(id));
//   };

//   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   return (
//     <Container sx={{ mt: 12 }} maxWidth="md">
//       <CssBaseline />
//       {!food ? (
//         <Box sx={{}}>
//           <CircularProgress />
//         </Box>
//       ) : !auth.loggedInUser ? (
//         <Typography>Loading user data...</Typography>
//       ) : food._id ? (
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//           noValidate
//         >
//           <Grid container spacing={2} maxWidth="md">
//             <Grid item xs={12}>
//               <Activity activity={food} />
//             </Grid>
//             {auth.loggedInUser.access_token ? (
//               <Grid item xs={12}>
//                 <TextField
//                   {...register("text", {
//                     required: "Please add a comment and try again",
//                     maxLength: {
//                       value: 240,
//                       message:
//                         "Comments cannot exceed 240 characters in length",
//                     },
//                   })}
//                   id="text"
//                   label="Comment"
//                   variant="outlined"
//                   fullWidth
//                   InputProps={{ sx: { borderRadius: 0 } }}
//                 />
//                 {errors.text && (
//                   <Typography variant="caption" color="error">
//                     {errors.text.message}
//                   </Typography>
//                 )}
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{ width: 90, mt: 2, mb: 2, borderRadius: 0 }}
//                 >
//                   Submit
//                 </Button>
//                 <Button
//                   href="/home"
//                   variant="contained"
//                   sx={{ width: 90, mt: 2, mb: 2, borderRadius: 0 }}
//                 >
//                   Back
//                 </Button>
//               </Grid>
//             ) : (
//               <></>
//             )}
//             {food.comments && food.comments.length > 0 ? (
//               <Grid item xs={12}>
//                 <Typography sx={{ ml: 1, mb: 2, mt: -2 }}>
//                   Comments: {`${food.comments.length}`}
//                 </Typography>
//                 {food.comments
//                   .slice()
//                   .reverse()
//                   .map((comment) => (
//                     <Box sx={{ mt: 2 }}>
//                       <CommentCard key={comment._id} comment={comment} />
//                     </Box>
//                   ))}
//                 <Box sx={{ ml: -2, mb: 10 }}>
//                   <Pagination
//                     count={Math.ceil(food.comments.length / pageSize)}
//                     shape="rounded"
//                     sx={{ mt: 2 }}
//                     size="large"
//                     page={page}
//                     onChange={handlePageChange}
//                   />
//                 </Box>
//               </Grid>
//             ) : (
//               <Typography sx={{ m: 2, ml: 3, mb: 10 }}>
//                 Be the first to leave a comment!
//               </Typography>
//             )}
//           </Grid>
//         </Box>
//       ) : (
//         <></>
//       )}
//     </Container>
//   );
// };
