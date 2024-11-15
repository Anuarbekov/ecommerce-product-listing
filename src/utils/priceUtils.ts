export const formatPrice = (price: number, currency: string): string => {
  switch (currency.toUpperCase()) {
    case "USD":
      return `$ ${price.toFixed(2)}`;
    case "EUR":
      return `€ ${price.toFixed(2)}`;
    case "KZT":
      return `${price.toFixed(2)} ₸`;
    case "RUB":
      return `${price.toFixed(2)} ₽`;
    default:
      return `${price} ${currency}`;
  }
};
