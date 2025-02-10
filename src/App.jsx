import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import Order from "./pages/Order/Order";
import Result from "./pages/Result/Result";
import Summary from "./pages/Summary";

export default () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container>
            <Order />
          </Container>
        }
      />
      <Route
        path="/summary"
        element={
          <Container>
            <Summary />
          </Container>
        }
      />
      <Route
        path="/result"
        element={
          <Container>
            <Result />
          </Container>
        }
      />
    </Routes>
  );
};
