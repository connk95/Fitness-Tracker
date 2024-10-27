import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  FormControl,
  FormLabel,
} from "@mui/material";

export const ActivitySelector: React.FC<{
  filter: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ filter, handleFilterChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 0,
      }}
    >
      <FormControl>
        {window.location.href.includes("/profile") ? (
          <FormLabel
            id="radio"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#505050",
              "&.Mui-focused": {
                color: "#505050",
              },
            }}
          >
            My Activities
          </FormLabel>
        ) : (
          <FormLabel
            id="radio"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#505050",
              "&.Mui-focused": {
                color: "#505050",
              },
            }}
          >
            Activity Log
          </FormLabel>
        )}
        <RadioGroup
          row
          aria-labelledby="radio"
          defaultValue="all"
          name="radio-buttons-group"
          value={filter}
          onChange={handleFilterChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="All Activity"
          />
          <FormControlLabel
            value="food"
            control={<Radio />}
            label="Food Only"
          />
          <FormControlLabel
            value="workout"
            control={<Radio />}
            label="Workouts Only"
          />
          {window.location.href.includes("/profile") ? (
            <></>
          ) : (
            <FormControlLabel
              value="friends"
              control={<Radio />}
              label="Friend Activity"
            />
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
