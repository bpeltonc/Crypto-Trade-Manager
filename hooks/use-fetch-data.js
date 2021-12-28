const useFetchData = async ({ symbol, type, entryPrice }) => {
  //fetch last price from Bittrex API
  const response = await fetch(
    `https://api.bittrex.com/v3/markets/${symbol}/ticker`
  );
  if (response.status !== 200) {
    throw new Error(response.status);
  }

  const data = await response.json();

  console.log(data);

  let currentPrice = parseFloat(data.lastTradeRate);

  // check if price must be displayed in dollars/cents

  let numDecimals = 8;

  if (symbol.includes("USDT" || "USD")) {
    numDecimals = 2;
  }

  currentPrice = currentPrice.toFixed(numDecimals);

  //calculate current profit/loss data for current price

  let profit = 0;
  let percentChange = 0;

  if (type === "long") {
    profit = currentPrice - entryPrice;
  } else {
    profit = entryPrice - currentPrice;
  }

  // calculate percent profit/loss

  percentChange = ((profit / entryPrice) * 100).toFixed(2);

  // return fetched and calculated data

  return {
    currentPrice,
    profit,
    percentChange,
  };
};

export default useFetchData;
