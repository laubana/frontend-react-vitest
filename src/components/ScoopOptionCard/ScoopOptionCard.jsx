import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import { useOrderContext } from "../../contexts/OrderContext";

export default ({ name, image }) => {
  const { optionCounts, setOptionCount } = useOrderContext();

  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (event) => {
    const value = parseInt(event.target.value);

    const isValid = 0 <= value && value <= 10 && +event.target.value === value;

    setIsInvalid(!isValid);
    setOptionCount("scoops", name, isValid ? value : 0);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
        alt={`${name} scoop`}
        style={{ width: "75%" }}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={optionCounts.scoops[name] ?? 0}
            onChange={handleChange}
            isInvalid={isInvalid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};
