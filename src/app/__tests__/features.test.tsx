import { render, screen } from "@testing-library/react";
import FeaturesPage from "../features/page";

describe("FeaturesPage", () => {
  it("renders features page title", () => {
    render(<FeaturesPage />);
    expect(screen.getByText(/Наши фишки/i)).toBeInTheDocument();
  });

  it("renders feature cards from mock data", () => {
    render(<FeaturesPage />);
    expect(screen.getByText(/Железная гарантия/i)).toBeInTheDocument();
  });
});
