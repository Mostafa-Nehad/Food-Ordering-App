export const formatCurrency = (number: number) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'EGP',
    style: 'currency',
  });
  return CURRENCY_FORMATTER.format(number);
};
