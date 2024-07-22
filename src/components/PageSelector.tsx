import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";

export const PageSelector = ({
  length,
  pageSize,
  currentPage,
  handlePageChange,
}: {
  length: number;
  pageSize: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Grid sx={{ ml: 2 }}>
    <Typography sx={{ mt: 2 }}>Page No.</Typography>
    <RadioGroup
      row
      aria-labelledby="page"
      defaultValue={currentPage.toString()}
      name="page-buttons-group"
      onChange={handlePageChange}
      sx={{ mb: 1 }}
    >
      {Array.from({ length: Math.ceil(length / pageSize) }, (_, index) => (
        <FormControlLabel
          key={index + 1}
          value={`${index + 1}`}
          control={<Radio />}
          label={`${index + 1}`}
        />
      ))}
    </RadioGroup>
  </Grid>
);
