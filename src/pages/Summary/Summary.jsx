import React from "react";

import SummaryForm from "../../components/SummaryForm";
import { useOrderContext } from "../../contexts/OrderContext";
import { formatCurrency } from "../../helpers/helpers";

export default () => {
  const { optionCounts, totalPrices } = useOrderContext();

  const scoops = Object.entries(optionCounts.scoops).map(([name, count]) => (
    <li key={name}>
      {count} {name}
    </li>
  ));

  const toppings = Object.keys(optionCounts.toppings).map((name) => (
    <li key={name}>{name}</li>
  ));

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totalPrices.scoops)}</h2>
      <ul>{scoops}</ul>
      <h2>Toppings: {formatCurrency(totalPrices.toppings)}</h2>
      <ul>{toppings}</ul>
      <SummaryForm />
    </div>
  );
};
