function isStringAnInteger(str) {
  return Number.isInteger(parseInt(str, 10));
}

export function getPriceRangeFromString(str) {
  const prices = str.split("-");
  console.log("prices:", prices);
  if (prices.length !== 2) {
    return [];
  }
  if (!isStringAnInteger(prices[0]) || !isStringAnInteger(prices[1])) {
    return [];
  }
  return [prices[0], prices[1]];
}

export default getPriceRangeFromString;
