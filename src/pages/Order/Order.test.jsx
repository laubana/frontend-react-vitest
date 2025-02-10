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

describe("Order Test", () => {
  test.skip("Failure", async () => {
    server.resetHandlers(
      http.get(`${import.meta.env.VITE_BACKEND_URL}/scoops`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
      http.get(`${import.meta.env.VITE_BACKEND_URL}/toppings`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<Order />);

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });

  test("Default", async () => {
    server.resetHandlers(...handlers);

    const { unmount } = render(<Order />);

    const total = screen.getByRole("heading", { name: /Grand Total: \$/ });
    expect(total).toHaveTextContent("0.00");

    unmount();
  });

  test("Scoops", async () => {
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
  });

  test("Toppings", async () => {
    const user = userEvent.setup();

    server.resetHandlers(...handlers);

    render(<Order />);

    const total = screen.getByText("Grand Total: $", { exact: false });

    const cherriesInput = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    await user.click(cherriesInput);
    expect(total).toHaveTextContent("1.50");
  });
});
