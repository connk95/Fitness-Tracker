import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import breakfast from "../assets/breakfast.jpg";
import runningMan from "../assets/runningMan.jpg";
import woman from "../assets/woman.jpg";
import avatar1 from "../assets/Joshua Wilson.jpg";
import avatar2 from "../assets/Bailey Richards.jpg";
import avatar3 from "../assets/Julius Vaughan.jpg";
import info1 from "../assets/Screenshot 2024-11-16 at 18.53.57.png";
import info2 from "../assets/Screenshot 2024-11-16 at 18.52.28.png";
import info3 from "../assets/Screenshot 2024-11-16 at 19.16.45.png";
import info4 from "../assets/pexels-tirachard-kumtanom-112571-347135.jpg";
import { Slideshow } from "../components/Slideshow";
import { Testimonial } from "../components/Testimonial";
import { useState } from "react";

export const SplashPage = (): JSX.Element => {
  const [info, setInfo] = useState<number>(0);

  const pages = [
    {
      title: "Work Better",
      font: "knewave-regular",
      background: runningMan,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos mollitia placeat, quisquam quasi, totam consectetur natus facilis soluta expedita, odit cumque eaque. Quaerat molestias error quisquam architecto, laboriosam optio veritatis?",
    },
    {
      title: "Eat Better",
      font: "train-one-regular",
      background: breakfast,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat veniam odio at molestiae error unde distinctio non voluptatum tempora? Pariatur dolore quisquam mollitia assumenda reprehenderit? Reiciendis saepe eveniet doloribus sit.",
    },
    {
      title: "Track Better",
      font: "dotgothic16-regular",
      background: woman,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, repudiandae tempore dolores qui praesentium nobis? Numquam exercitationem quasi rerum. Mollitia repudiandae ipsum accusantium atque temporibus necessitatibus est magni veritatis porro?",
    },
  ];

  const testimonials = [
    {
      image: avatar1,
      title: "I've never been healthier!",
      text: '"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio veniam fugit perferendis ullam alias voluptatibus est dolorum esse reiciendis quibusdam laudantium sed assumenda, repudiandae accusantium, numquam aperiam atque nesciunt magnam!"',
      name: "Josh",
    },
    {
      image: avatar2,
      title: "My friends' fitness journey inspires me!",
      text: '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nesciunt sunt quod ut ipsam, sit tempore aliquam quas earum molestias obcaecati, veniam ipsa tenetur nisi? Corrupti totam ad nam deleniti."',
      name: "Sabrina",
    },
    {
      image: avatar3,
      title: "I've lost so much weight!",
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus doloremque laudantium numquam atque, omnis odit, tempore unde sequi eum distinctio labore sit praesentium est suscipit deleniti dicta, natus error quibusdam!"',
      name: "Travis",
    },
  ];

  const moreInfo = [
    {
      title: "Work Better",
      font: "knewave-regular",
      image: info1,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aperiam quos quibusdam reprehenderit iste sint nam in officiis nostrum totam, sit cumque saepe incidunt labore unde esse magnam ipsa mollitia.",
    },
    {
      title: "Eat Better",
      font: "train-one-regular",
      image: info2,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, fugit itaque impedit minus exercitationem officia inventore error laborum nostrum est, quaerat aperiam dicta delectus magnam, corporis doloremque. Alias, blanditiis expedita!",
    },
    {
      title: "Track Better",
      font: "dotgothic16-regular",
      image: info3,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dolor vero non. Dolorum quidem corporis sequi veniam a eos facere recusandae, molestiae sit distinctio deleniti cupiditate perferendis voluptates. Sint, unde.",
    },
    {
      title: "Live Better",
      font: "quattrocento-regular",
      image: info4,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit asperiores sint illo cupiditate repudiandae doloremque soluta quasi voluptate quibusdam? Nemo quidem laboriosam perspiciatis cumque velit! Facere autem dolorum in quos!",
    },
  ];

  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        marginTop: "5rem",
        marginBottom: "0rem",
      }}
    >
      <CssBaseline />
      <Box sx={{ width: "100%" }}>
        <Grid>
          <Box>
            <Slideshow pages={pages}></Slideshow>
          </Box>
          <Box
            sx={{
              display: "flex",
              top: "20px",
              justifyContent: "flex-end",
              marginTop: "1rem",
              gap: "20px",
              "@media (max-width: 600px)": {
                justifyContent: "center",
              },
            }}
          >
            <Button
              variant="contained"
              href="/home"
              sx={{
                width: 180,
                mt: 0,
                borderRadius: 0,
                margin: 0,
              }}
            >
              Start
            </Button>
            <Button
              variant="contained"
              href="/signup"
              sx={{ width: 180, mt: 0, borderRadius: 0, margin: 0 }}
            >
              Create Account
            </Button>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ marginTop: "4rem", marginBottom: "6rem" }}>
        <Grid
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial testimonial={testimonial} key={index}></Testimonial>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          "@media (max-width: 600px)": {
            display: "none",
          },
        }}
      >
        <Box sx={{ minWidth: "max-content" }}>
          {moreInfo.map((info, index) => (
            <Box sx={{ display: "flex" }} key={index}>
              <Typography
                onMouseOver={() => setInfo(index)}
                className={info.font}
                sx={{
                  fontSize: "5.5rem",
                  "&:hover": {
                    fontSize: "5.8rem",
                    cursor: "default",
                  },
                }}
              >
                {info.title}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "35vw",
            justifyContent: "flex-start",
            marginTop: "4rem",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${moreInfo[info].image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "185px",
              width: "100%",
            }}
          ></Box>
          <Box>
            <Typography sx={{ marginLeft: "1rem", marginTop: "2rem" }}>
              {moreInfo[info].text}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
