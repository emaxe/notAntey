import { render, screen } from "@testing-library/react";
import HomePage from "../page";

describe("HomePage", () => {
  it("renders hero section", () => {
    render(<HomePage />);
    expect(screen.getByText(/Профессиональный ремонт компьютеров/i)).toBeInTheDocument();
  });

  it("renders stats section", () => {
    render(<HomePage />);
    expect(screen.getByText(/лет на рынке/i)).toBeInTheDocument();
  });

  it("renders services section", () => {
    render(<HomePage />);
    expect(screen.getAllByText(/Ремонт ноутбуков/i).length).toBeGreaterThanOrEqual(1);
  });
});
