// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { FoodState, Food } from "./food.type";
// import { fetchFoods, fetchSingleFood, newFood } from "./food.actions";
// import { addLike } from "../activity/activity.action";

// const initialState: FoodState = {
//   allFoods: [],
//   singleFood: <Food>{},
//   error: "",
//   loading: false,
// };

// const foodSlice = createSlice({
//   name: "food",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(
//       fetchFoods.fulfilled,
//       (state, action: PayloadAction<Food[]>) => {
//         state.allFoods = action.payload;
//         state.singleFood = <Food>{};
//         state.error = "";
//         state.loading = false;
//       }
//     );
//     builder.addCase(fetchFoods.pending, (state) => {
//       state.allFoods = [];
//       state.singleFood = <Food>{};
//       state.error = "";
//       state.loading = true;
//     });
//     builder.addCase(fetchFoods.rejected, (state, action) => {
//       state.allFoods = [];
//       state.singleFood = <Food>{};
//       state.error = action.error.message || "Could not load foods";
//       state.loading = false;
//     });
//     builder.addCase(
//       fetchSingleFood.fulfilled,
//       (state, action: PayloadAction<Food>) => {
//         state.allFoods = [];
//         state.singleFood = action.payload;
//         state.error = "";
//         state.loading = false;
//       }
//     );
//     builder.addCase(fetchSingleFood.pending, (state) => {
//       state.allFoods = [];
//       state.singleFood = <Food>{};
//       state.error = "";
//       state.loading = true;
//     });
//     builder.addCase(fetchSingleFood.rejected, (state, action) => {
//       state.allFoods = [];
//       state.singleFood = <Food>{};
//       state.error = action.error.message || "Could not load food";
//       state.loading = false;
//     });
//     builder.addCase(newFood.fulfilled, (state) => {
//       state.error = "";
//       state.loading = false;
//     });
//     builder.addCase(newFood.pending, (state) => {
//       state.error = "";
//       state.loading = true;
//     });
//     builder.addCase(newFood.rejected, (state, action) => {
//       state.error = action.error.message || "Could not create food";
//       state.loading = false;
//     });
//     builder.addCase(addLike.fulfilled, (state, action: PayloadAction<Food>) => {
//       state.singleFood = action.payload;
//       state.error = "";
//       state.loading = false;
//     });
//     builder.addCase(addLike.pending, (state) => {
//       state.error = "";
//       state.loading = true;
//     });
//     builder.addCase(addLike.rejected, (state, action) => {
//       state.error = action.error.message || "Could not add like";
//       state.loading = false;
//     });
//   },
// });

// export default foodSlice.reducer;
