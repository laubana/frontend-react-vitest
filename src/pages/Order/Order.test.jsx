import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { expect, test, vi } from "vitest";

import Order from "./Order";
import { server } from "../../msw/server";
import { render } from "../../utils/vitest";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

test("errors", async () => {
  server.resetHandlers(
    http.get("http://localhost:5000/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:5000/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<Order />);

  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);
});
