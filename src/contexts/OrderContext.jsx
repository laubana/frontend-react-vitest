import { createContext, useContext, useState } from "react";

import { prices } from "../constants";

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  const updateOptionCount = (type, name, count) => {
    setOptionCounts((prevStates) => ({
      ...prevStates,
      [type]: { ...prevStates[type], [name]: count },
    }));
  };

  const resetOrderCounts = () => {
    setOptionCounts({ scoops: {}, toppings: {} });
  };

  const getTotalPrice = (type) => {
    const totalCount = Object.values(optionCounts[type]).reduce(
      (sum, count) => sum + count,
      0
    );

    return totalCount * prices[type];
  };

  const totalPrices = {
    scoops: getTotalPrice("scoops"),
    toppings: getTotalPrice("toppings"),
  };

  return (
    <OrderContext.Provider
      value={{ totalPrices, optionCounts, updateOptionCount, resetOrderCounts }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const orderContext = useContext(OrderContext);

  if (!orderContext) {
    throw new Error("OrderContext must be used in OrderContextProvider.");
  }

  return orderContext;
};

export default OrderContextProvider;
