import { Box, Button, Container, CssBaseline, Grid } from "@mui/material";
import breakfast from "../assets/breakfast.jpg";
import runningMan from "../assets/runningMan.jpg";
// import runningWoman from "../../assets/runningWoman.jpg";
import woman from "../assets/woman.jpg";
import { Slideshow } from "../components/Slideshow";
import { Testimonial } from "../components/Testimonial";

export const SplashPage = (): JSX.Element => {
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
      image: "",
      title: "I've never been healthier!",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio veniam fugit perferendis ullam alias voluptatibus est dolorum esse reiciendis quibusdam laudantium sed assumenda, repudiandae accusantium, numquam aperiam atque nesciunt magnam!",
      name: "Josh",
    },
    {
      image: "",
      title: "I've lost so much weight.",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nesciunt sunt quod ut ipsam, sit tempore aliquam quas earum molestias obcaecati, veniam ipsa tenetur nisi? Corrupti totam ad nam deleniti.",
      name: "Tracy",
    },
    {
      image: "",
      title: "I can share my fitness journey.",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus doloremque laudantium numquam atque, omnis odit, tempore unde sequi eum distinctio labore sit praesentium est suscipit deleniti dicta, natus error quibusdam!",
      name: "Travis",
    },
  ];

  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        marginTop: "10rem",
        marginBottom: "10rem",
      }}
    >
      <CssBaseline />
      <Box>
        <Grid>
          <Box>
            <Slideshow pages={pages}></Slideshow>
          </Box>
          <Box
            sx={{
              display: "flex",
              top: "40px",
              justifyContent: "flex-end",
              position: "relative",
              right: "6px",
            }}
          >
            <Button
              variant="contained"
              href="/home"
              sx={{
                width: 180,
                mt: 0,
                borderRadius: 0,
              }}
            >
              Start
            </Button>
            <Button
              variant="contained"
              href="/signup"
              sx={{ width: 180, mt: 0, borderRadius: 0 }}
            >
              Create Account
            </Button>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ marginTop: "5rem" }}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {testimonials.map((testimonial) => (
            <Testimonial testimonial={testimonial}></Testimonial>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
