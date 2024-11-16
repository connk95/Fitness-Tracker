import { Box, Container, Typography } from "@mui/material";
import { TestimonialProps } from "../redux/types";
import React from "react";

export const Testimonial: React.FC<TestimonialProps> = ({
  testimonial,
}: TestimonialProps): JSX.Element => {
  return (
    <Container sx={{ width: "20vw", height: "40vh" }}>
      <Box sx={{ width: "40px", height: "40px", borderRadius: "50%" }}>
        {testimonial.image}
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          {testimonial.title}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ height: "220px", textAlign: "center" }}>
          {testimonial.text}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ marginTop: "1rem", textAlign: "right" }}>
          - {testimonial.name}
        </Typography>
      </Box>
    </Container>
  );
};
