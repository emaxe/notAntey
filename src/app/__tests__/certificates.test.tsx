import { render, screen } from "@testing-library/react";
import CertificatesPage from "../certificates/page";

describe("CertificatesPage", () => {
  it("renders certificates page title", () => {
    render(<CertificatesPage />);
    expect(screen.getByText(/Наши сертификаты/i)).toBeInTheDocument();
  });

  it("renders certificate cards from mock data", () => {
    render(<CertificatesPage />);
    expect(screen.getByText(/Apple Inc./i)).toBeInTheDocument();
  });
});
