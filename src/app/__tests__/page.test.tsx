import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders heading and call button", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /КомпьютерщикЪ/i })).toBeInTheDocument();
    expect(screen.getByTestId("hero-call-button")).toBeInTheDocument();
  });
});
