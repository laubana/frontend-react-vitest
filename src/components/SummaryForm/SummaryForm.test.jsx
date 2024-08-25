import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import SummaryForm from "./SummaryForm";

import { render } from "../../utils/vitest";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

test("checkbox", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const button = screen.getByRole("button", { name: /confirm/i });
  expect(button).not.toBeEnabled();

  await user.click(checkbox);
  expect(button).toBeEnabled();

  await user.click(checkbox);
  expect(button).not.toBeEnabled();
});

test("popover", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const unexistingPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(unexistingPopover).not.toBeInTheDocument();

  const trigger = screen.getByText(/terms and conditions/i);
  await user.hover(trigger);

  const existingPopover = screen.getByRole("tooltip", {
    name: /no ice cream will actually be delivered/i,
  });
  expect(existingPopover).toBeInTheDocument();
});
