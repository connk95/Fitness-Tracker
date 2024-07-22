import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  FormControl,
  FormLabel,
} from "@mui/material";

export const ActivitySelector = ({
  filter,
  handleFilterChange,
}: {
  filter: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      paddingLeft: 0,
    }}
  >
    <FormControl>
      <FormLabel
        id="radio"
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#505050",
        }}
      >
        Activity Log
      </FormLabel>
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
          value="friends"
          control={<Radio />}
          label="Friend Activity"
        />
        <FormControlLabel
          value="foods"
          control={<Radio />}
          label="Meals Only"
        />
        <FormControlLabel
          value="workouts"
          control={<Radio />}
          label="Workouts Only"
        />
      </RadioGroup>
    </FormControl>
  </Box>
);
