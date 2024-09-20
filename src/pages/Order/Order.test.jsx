import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, test, vi } from "vitest";

import Order from "./Order";

import { handlers } from "../../msw/handlers";
import { server } from "../../msw/server";
import { render } from "../../utils/vitest";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

test.skip("errors", async () => {
  server.resetHandlers(
    http.get("http://localhost:4000/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:4000/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<Order />);

  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);
});

describe("total", () => {
  test("default", async () => {
    server.resetHandlers(...handlers);

    const { unmount } = render(<Order />);

    const total = screen.getByRole("heading", { name: /Grand Total: \$/ });
    expect(total).toHaveTextContent("0.00");

    unmount();
  });

  test("scoops", async () => {
    const user = userEvent.setup();

    server.resetHandlers(...handlers);

    render(<Order />);

    const total = screen.getByText("Grand Total: $", { exact: false });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(total).toHaveTextContent("2.00");

    const cherriesInput = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    await user.click(cherriesInput);
    expect(total).toHaveTextContent("3.50");
  });

  test("toppings", async () => {
    const user = userEvent.setup();

    server.resetHandlers(...handlers);

    render(<Order />);

    const total = screen.getByText("Grand Total: $", { exact: false });

    const cherriesInput = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    await user.click(cherriesInput);
    expect(total).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(total).toHaveTextContent("3.50");
  });
});

test("remove", async () => {
  const user = userEvent.setup();

  server.resetHandlers(...handlers);

  render(<Order />);

  const total = screen.getByText("Grand Total: $", { exact: false });

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesInput);

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(total).toHaveTextContent("3.50");

  await user.click(cherriesInput);
  expect(total).toHaveTextContent("2.00");
});
