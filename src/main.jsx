import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import OrderContextProvider from "./contexts/OrderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OrderContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </OrderContextProvider>
  </React.StrictMode>
);
