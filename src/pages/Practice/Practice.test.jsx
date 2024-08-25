import { fireEvent } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Practice from "./Practice";
import { convertKebabToPascal } from "../../helpers/helpers";

test("button flow", () => {
  render(<Practice />);
  // logRoles(container);

  const button = screen.getByRole("button", { name: /blue/i });

  expect(button).toHaveTextContent(/Midnight Blue/);
  expect(button).toHaveClass("medium-violet-red");

  fireEvent.click(button);
  expect(button).toHaveTextContent(/Medium Violet Red/);
  expect(button).toHaveClass("midnight-blue");
});

test("checkbox flow", () => {
  render(<Practice />);

  const button = screen.getByRole("button", { name: /blue/i });
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });

  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(button).not.toBeEnabled();
  expect(button).toHaveClass("grey");

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  expect(button).toHaveClass("medium-violet-red");

  fireEvent.click(button);
  fireEvent.click(checkbox);
  expect(button).not.toBeEnabled();
  expect(button).toHaveClass("grey");

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  expect(button).toHaveClass("midnight-blue");
});

describe("kebab to pascal unit", () => {
  test("0 hyphen", () => {
    expect(convertKebabToPascal("red")).toBe("Red");
  });
  test("1 hyphen", () => {
    expect(convertKebabToPascal("midnight-blue")).toBe("Midnight Blue");
  });
  test("2 hyphens", () => {
    expect(convertKebabToPascal("medium-violet-red")).toBe("Medium Violet Red");
  });
});
