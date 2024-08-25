import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import Order from "./pages/Order/Order";
import Practice from "./pages/Practice";
import Result from "./pages/Result/Result";
import Summary from "./pages/Summary";

export default () => {
  return (
    <Routes>
      <Route
        path="/order"
        element={
          <Container>
            <Order />
          </Container>
        }
      />
      <Route path="/practice" element={<Practice />} />
      <Route
        path="/result"
        element={
          <Container>
            <Result />
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
    </Routes>
  );
};
