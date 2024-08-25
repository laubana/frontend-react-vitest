export const convertKebabToPascal = (kebab) => {
  const pascal = kebab
    .replaceAll("-", " ")
    .replace(/\b([a-z])/g, (match) => match.toUpperCase());

  return pascal;
};

export const formatCurrency = (currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
};
