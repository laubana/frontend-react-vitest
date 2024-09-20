import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import Alert from "../../components/Alert/Alert";
import { useOrderContext } from "../../contexts/OrderContext";

export default () => {
  const navigate = useNavigate();

  const { resetOrderCounts } = useOrderContext();

  const [orderCode, setOrderCode] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const main = async () => {
      try {
        const response = await axios.post("http://localhost:4000/order");

        setOrderCode(response.data.orderNumber);
      } catch (error) {
        console.error(error);

        setError(error.message);
      }
    };
    main();
  }, []);

  const handleClick = () => {
    resetOrderCounts();

    navigate("/order");
  };

  const mainButton = <Button onClick={handleClick}>Go to Main</Button>;

  if (error) {
    return <Alert button={mainButton} message={error} variant={null} />;
  }

  if (orderCode) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderCode}</p>
        <p>As per our terms and conditions, nothing will happen now</p>
        {mainButton}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
