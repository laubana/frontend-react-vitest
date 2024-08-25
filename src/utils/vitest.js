import { render } from "@testing-library/react";

import OrderContextProvider from "../contexts/OrderContext";

export const render = (ui, options) =>
  render(ui, { wrapper: OrderContextProvider, ...options });
