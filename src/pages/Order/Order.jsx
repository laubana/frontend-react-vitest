import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import OptionList from "../../components/OptionList";
import { useOrderContext } from "../../contexts/OrderContext";
import { formatCurrency } from "../../helpers/helpers";

export default () => {
  const navigate = useNavigate();

  const { totalPrices } = useOrderContext();

  const handleNext = () => {
    navigate("/summary");
  };

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <OptionList optionType="scoops" />
      <OptionList optionType="toppings" />
      <h2>
        Grand total: {formatCurrency(totalPrices.scoops + totalPrices.toppings)}
      </h2>
      <Button onClick={handleNext} disabled={totalPrices.scoops === 0}>
        Next
      </Button>
    </div>
  );
};
