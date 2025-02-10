import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useOrderContext } from "../../contexts/OrderContext";

export default () => {
  const navigate = useNavigate();

  const { resetOrderCounts } = useOrderContext();

  const [orderCode, setOrderCode] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const main = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/order`
        );

        setOrderCode(response.data.data.orderNumber);
      } catch (error) {
        console.error(error);

        setError(error.message);
      }
    };
    main();
  }, []);

  const handleClick = () => {
    resetOrderCounts();

    navigate("/");
  };

  if (error) {
    return (
      <Alert variant="danger">
        <div>{error}</div>
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleClick}>Go to Main</Button>
        </div>
      </Alert>
    );
  }

  if (orderCode) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderCode}.</p>
        <Button onClick={handleClick}>Go to Main</Button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
