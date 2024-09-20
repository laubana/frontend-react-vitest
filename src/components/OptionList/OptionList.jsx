import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";

import Alert from "../Alert/Alert";
import ScoopOptionCard from "../ScoopOptionCard";
import ToppingOptionCard from "../ToppingOptionCard";
import { prices } from "../../constants";
import { useOrderContext } from "../../contexts/OrderContext";
import { formatCurrency } from "../../helpers/helpers";

const OptionCardMap = {
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
          `http://localhost:4000/${optionType}`,
          { signal: controller.signal }
        );

        setOptions(response.data);
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
    return <Alert message={error} />;
  }

  const OptionCard = OptionCardMap[optionType];

  const optionCards = options.map((option) => (
    <OptionCard key={option.name} name={option.name} image={option.imagePath} />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(prices[optionType])} each</p>
      <p>
        {title} Total: {formatCurrency(totalPrices[optionType])}
      </p>
      <Row>{optionCards}</Row>
    </>
  );
};
