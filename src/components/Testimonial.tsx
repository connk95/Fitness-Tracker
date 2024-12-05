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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: "1",
        alignItems: "center",
        minWidth: "16rem",
      }}
    >
      <Avatar
        src={testimonial.image}
        sx={{ height: "80px", width: "80px", marginBottom: "1rem" }}
      ></Avatar>
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
        <Typography sx={{ textAlign: "center" }}>{testimonial.text}</Typography>
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
