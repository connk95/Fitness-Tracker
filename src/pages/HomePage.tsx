import React, { useState, useEffect } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
// import { fetchUsers } from "../redux/user/user.actions";
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  Box,
  Grid,
  Pagination,
} from "@mui/material";
import { Activity } from "../components/Activity";
import { ActivityType } from "../redux/activity/activity.type";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import SportsGymnasticsSharpIcon from "@mui/icons-material/SportsGymnasticsSharp";
import { ActivitySelector } from "../components/ActivitySelector";
import { fetchPaginatedActivities } from "../redux/activity/activity.action";

export const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const activities = useSelector((state: RootState) => state.activities);

  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);

  const [sortedByCreatedAt, setSortedByCreatedAt] = useState<ActivityType[]>(
    []
  );

  const limit = 12; // Number of items per page

  useEffect(() => {
    const friends = auth.loggedInUser?.user?.friends || [];
    dispatch(
      fetchPaginatedActivities({
        filter,
        page: 1,
        limit: limit,
        friends,
      })
    );
  }, [
    auth.loggedInUser?.user?._id,
    auth.loggedInUser?.user?.friends,
    dispatch,
    filter,
  ]);

  useEffect(() => {
    const allActivity: ActivityType[] = [...(activities.allActivities || [])];

    const sortedActivities = allActivity.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setSortedByCreatedAt(sortedActivities);
  }, [activities.allActivities]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = (event.target as HTMLInputElement).value;
    setFilter(newFilter);
    setPage(1); // Reset page to 1 when filter changes
    const friends = auth.loggedInUser?.user?.friends || [];
    while (activities.allActivities.length < 1 && filter !== "friends") {
      // prevent switch without data
      setFilter(newFilter);
      setPage(1);
      dispatch(
        fetchPaginatedActivities({
          page: 1,
          limit: limit,
          filter: filter,
          friends,
        })
      );
    }
  };

  const filteredActivity: ActivityType[] = sortedByCreatedAt.filter(
    (activity) => {
      if (filter === "all") {
        return true;
      }
      return activity.type === filter;
    }
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    const friends = auth.loggedInUser?.user?.friends || [];

    dispatch(
      fetchPaginatedActivities({
        page: value,
        limit,
        filter,
        friends,
      })
    );
  };

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pl: 0,
          mb: 8,
        }}
      >
        <Grid
          container
          spacing={2}
          maxWidth="md"
          sx={{ display: "flex", justifyContent: "flex-start", ml: -2 }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              pl: 0,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pl: 0,
              }}
            >
              <ActivitySelector
                filter={filter}
                handleFilterChange={handleFilterChange}
              />
              {auth.loggedInUser?.access_token ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    "@media (max-width: 600px)": {
                      justifyContent: "center",
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    href="/foods/new"
                    sx={{ width: 180, mt: 0, mr: 0, borderRadius: 0 }}
                  >
                    <RestaurantSharpIcon sx={{ mr: 1 }} />
                    New Food
                  </Button>
                  <Button
                    variant="contained"
                    href="/workouts/new"
                    sx={{ width: 180, mt: 0, mr: 0, borderRadius: 0 }}
                  >
                    <SportsGymnasticsSharpIcon sx={{ mr: 1 }} />
                    New Workout
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </Box>
            <Grid
              container
              spacing={2}
              sx={{ mt: 2, display: "felx", justifyContent: "flexStart" }}
            >
              {Array.isArray(filteredActivity) &&
              filteredActivity.length > 0 ? (
                <>
                  {filteredActivity.map((activity: ActivityType) => (
                    <Grid item xs={12} sm={6} key={activity._id}>
                      <Activity activity={activity} />
                    </Grid>
                  ))}
                </>
              ) : (
                <Typography sx={{ ml: 2 }}>No activities found.</Typography>
              )}
            </Grid>
          </Grid>
          <Pagination
            count={activities.totalPages}
            shape="rounded"
            sx={{ mt: 2 }}
            size="large"
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
      </Box>
    </Container>
  );
};
