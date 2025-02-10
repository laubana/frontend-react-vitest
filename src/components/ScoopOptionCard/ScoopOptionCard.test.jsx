import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";

import ScoopOptionCard from "./ScoopOptionCard";

import { render } from "../../utils/vitest";

describe("ScoopOptionCard Test", () => {
  test("Scoop", async () => {
    const user = userEvent.setup();

    render(<ScoopOptionCard />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "-1");
    expect(input).toHaveClass("is-invalid");

    await user.clear(input);
    await user.type(input, "2.5");
    expect(input).toHaveClass("is-invalid");

    await user.clear(input);
    await user.type(input, "11");
    expect(input).toHaveClass("is-invalid");

    await user.clear(input);
    await user.type(input, "3");
    expect(input).not.toHaveClass("is-invalid");
  });
});
