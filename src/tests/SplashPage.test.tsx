import { render, screen } from "@testing-library/react";
import { SplashPage } from "../pages/SplashPage";
import { BrowserRouter as Router } from "react-router-dom";

vi.mock("axios");

describe("SplashPage", () => {
  it("renders the splash page", async () => {
    render(
      <Router>
        <SplashPage />
      </Router>
    );

    const workBetter = screen.getAllByText(/^Work Better/i);
    expect(workBetter.length).toBeGreaterThan(0);

    const eatBetter = screen.getAllByText(/^Eat Better/i);
    expect(eatBetter.length).toBeGreaterThan(0);

    const trackBetter = screen.getAllByText(/^Track Better/i);
    expect(trackBetter.length).toBeGreaterThan(0);
    expect(
      await screen.findByRole("link", { name: /start/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /create account/i })
    ).toBeInTheDocument();
  });
});
