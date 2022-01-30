import { ALPHAVANTAGE_API_KEY } from "../../global/global";
const AV_BASE_URL = 'https://www.alphavantage.co';
export const getStockData = async (stockSymbol) => {
  const response = await fetch(`${AV_BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`);
  const data = await response.json();
  if (data['Note']) {
    throw new Error('Exceeded calls, try later...');
  }
  if (!data['Global Quote']['01. symbol']) {
    throw new Error('Invalid Symbol. Try another one.');
  }
  const { 'Global Quote': { "01. symbol": symbol, "05. price": price } } = data;
  const stockData = {
    symbol,
    price: +price
  };
  return stockData;
};
