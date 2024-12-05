import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { SlideshowProps } from "../redux/types";

export const Slideshow: React.FC<SlideshowProps> = ({
  pages,
}: SlideshowProps): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  const delay = 10000;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === pages.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, pages.length]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        overflow: "hidden",
        padding: "0",
      }}
    >
      {pages.map((page, pageIndex) => (
        <Box
          key={pageIndex}
          sx={{
            display: pageIndex === index ? "flex" : "none",
            flexDirection: "row",
            width: "100%",
            transition: "ease 1000ms",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
              "@media (max-width: 600px)": {
                display: "none",
              },
            }}
          >
            <Typography sx={{ fontSize: "1.5rem" }}>{page.text}</Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              position: "relative",
              height: "400px",
              backgroundImage: `url(${page.background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Typography
              className={page.font}
              sx={{
                position: "absolute",
                top: "20px",
                right: "4px",
                textAlign: "right",
                fontSize: "7rem",
              }}
            >
              {page.title}
            </Typography>
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          position: "relative",
          right: "25%",
          top: "-20px",
          textAlign: "center",
          width: "100%",
        }}
      >
        {pages.map((_, ind) => (
          <Box
            key={ind}
            sx={{
              display: "inline-block",
              height: "10px",
              width: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              margin: "0 5px",
              backgroundColor: index === ind ? "#e43d12" : "#c4c4c4",
              "@media (max-width: 600px)": {
                display: "none",
              },
            }}
            onClick={() => {
              setIndex(ind);
            }}
          ></Box>
        ))}
      </Box>
    </Box>
  );
};
