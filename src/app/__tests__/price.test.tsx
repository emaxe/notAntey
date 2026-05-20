import { render, screen } from "@testing-library/react";
import PricePage from "../price/page";

describe("PricePage", () => {
  it("renders price page title", () => {
    render(<PricePage />);
    expect(screen.getByText(/Прайс/i)).toBeInTheDocument();
  });

  it("renders category section", () => {
    render(<PricePage />);
    expect(screen.getByText(/Ноутбуки/i)).toBeInTheDocument();
  });

  it("renders price table rows", () => {
    render(<PricePage />);
    expect(screen.getAllByText(/Диагностика/i).length).toBeGreaterThanOrEqual(1);
  });
});
