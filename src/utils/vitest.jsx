import { render as test } from "@testing-library/react";

import OrderContextProvider from "../contexts/OrderContext";

export const render = (ui, options) =>
  test(ui, {
    wrapper: ({ children }) => (
      <OrderContextProvider>{children}</OrderContextProvider>
    ),
    ...options,
  });
