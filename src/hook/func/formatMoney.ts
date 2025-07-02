const formatMoney = (
  amount: number,
  currency: string = "NIO",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

export const formatNumber = (
  amount: number,
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale).format(amount);
}

export default formatMoney;