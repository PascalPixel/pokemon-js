import { render, screen } from "@testing-library/react";
import Game from "./Game";

test("renders game", () => {
  render(<Game />);
  const menuOption = screen.getByText(/fight/i);
  expect(menuOption).toBeInTheDocument();
});
