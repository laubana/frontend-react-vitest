import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Row } from "react-bootstrap";

import ScoopOptionCard from "../ScoopOptionCard";
import ToppingOptionCard from "../ToppingOptionCard";

import { prices } from "../../consts";
import { useOrderContext } from "../../contexts/OrderContext";
import { formatCurrency } from "../../helpers/format";

const OPTION_CARDS = {
  scoops: ScoopOptionCard,
  toppings: ToppingOptionCard,
};

export default ({ optionType }) => {
  const { totalPrices } = useOrderContext();

  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  useEffect(() => {
    const main = async () => {
      const controller = new AbortController();

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/${optionType}`,
          { signal: controller.signal }
        );

        setOptions(response.data.data);
      } catch (error) {
        console.error(error);

        setError(error.message);
      } finally {
        return () => {
          controller.abort();
        };
      }
    };
    main();
  }, [optionType]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const OptionCard = OPTION_CARDS[optionType];

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(prices[optionType])} each</p>
      <p>
        {title} Total: {formatCurrency(totalPrices[optionType])}
      </p>
      <Row>
        {options.map((option) => (
          <OptionCard
            key={option.name}
            name={option.name}
            image={option.imageUrl}
          />
        ))}
      </Row>
    </>
  );
};
