import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useOrderContext } from "../../contexts/OrderContext";

export default ({ name, image }) => {
  const { optionCounts, updateOptionCount } = useOrderContext();

  const handleChange = (event) => {
    updateOptionCount("toppings", name, event.target.checked ? 1 : 0);
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:4000/${image}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          onChange={handleChange}
          defaultChecked={
            optionCounts.toppings[name] && optionCounts.toppings[name] === 1
              ? true
              : false
          }
          label={name}
        />
      </Form.Group>
    </Col>
  );
};
