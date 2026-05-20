import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import WorksPage from "../works/page";

jest.mock("next/head", () => {
  return function MockHead({ children }: { children: ReactNode }) {
    return <>{children}</>;
  };
});

describe("WorksPage", () => {
  it("renders works page title", () => {
    render(<WorksPage />);
    expect(screen.getByText(/Наши работы/i)).toBeInTheDocument();
  });

  it("renders work cards from mock data", () => {
    render(<WorksPage />);
    expect(screen.getByText(/MacBook Pro/i)).toBeInTheDocument();
  });
});
