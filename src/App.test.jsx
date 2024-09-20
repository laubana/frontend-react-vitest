import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { test, vi } from "vitest";

import Order from "./pages/Order/Order";
import Result from "./pages/Result/Result";
import Summary from "./pages/Summary";
import { render } from "./utils/vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("app", async () => {
  const user = userEvent.setup();

  const router = createMemoryRouter(
    [
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/summary",
        element: <Summary />,
      },
    ],
    { initialEntries: ["/order"] }
  );

  render(<RouterProvider router={router} />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesInput);

  await act(async () => {
    await router.navigate("/summary");
  });

  const scoopsTotal = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsTotal).toHaveTextContent("2.00");

  const toppingsTotal = screen.getByText("Toppings: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  expect(screen.getByText("vanilla", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("cherries", { exact: false })).toBeInTheDocument();

  await act(async () => {
    await router.navigate("/result");
  });

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toHaveTextContent("123456789");
});
