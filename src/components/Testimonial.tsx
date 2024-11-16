import { Avatar, Box, Container, Typography } from "@mui/material";
import { TestimonialProps } from "../redux/types";
import React from "react";

export const Testimonial: React.FC<TestimonialProps> = ({
  testimonial,
}: TestimonialProps): JSX.Element => {
  return (
    <Container
      sx={{
        width: "20vw",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        src={testimonial.image}
        sx={{ height: "80px", width: "80px", marginBottom: "1rem" }}
      ></Avatar>
      <Box sx={{ height: "5rem" }}>
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Typography
          sx={{ marginTop: "1rem", marginRight: "1rem", textAlign: "right" }}
        >
          - {testimonial.name}
        </Typography>
      </Box>
    </Container>
  );
};
