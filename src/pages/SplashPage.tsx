import { Container } from "@mui/material";
import { Title } from "./helpers/Title";
import styled from "styled-components";
import breakfast from "../assets/breakfast.jpg";
import runningMan from "../assets/runningMan.jpg";
// import runningWoman from "../../assets/runningWoman.jpg";
import woman from "../assets/woman.jpg";

export const SplashPage = (): JSX.Element => {
  const PAGE_TITLES = [
    { text: "Work Better", font: "knewave-regular", background: runningMan },
    { text: "Eat Better", font: "train-one-regular", background: breakfast },
    { text: "Track Better", font: "dotgothic16-regular", background: woman },
    {
      text: "Live Better",
      font: "quattrocento-regular",
      background: "",
    },
  ];

  interface PageProps {
    background: string;
  }

  const Page = styled.div<PageProps>`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background 300ms ease-in 200ms;
    transition: background 300ms ease-out 200ms;

    ${({ background }) => background && `background-image: url(${background});`}
    & > h2 {
      font-size: 10vw;
    }
    opacity: 1;
  `;

  const FinalSlide = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    & > div > h2 {
      font-size: 10vw;
      margin: 0;
    }

    & > div {
      height: 16vh;
    }
  `;

  return (
    <Container sx={{ height: "100%", width: "100%" }}>
      {PAGE_TITLES.slice(0, 3).map(({ text, font, background }) => (
        <Page key={text} background={background}>
          <Title text={text} font={font} />
        </Page>
      ))}
      <FinalSlide>
        {PAGE_TITLES.map(({ text, font }) => (
          <Page key={text} background="">
            <Title text={text} font={font} />
          </Page>
        ))}
      </FinalSlide>
    </Container>
  );
};
