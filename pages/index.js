import Head from "next/head";
import { MongoClient } from "mongodb";

import { Fragment } from "react";
import TradesList from "../components/trades/TradesList";
import classes from "../styles/Home.module.css";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Crypto Trade Manager</title>
        <meta
          name="description"
          content="Manage your crypto trades in one convenient app"
        />
      </Head>
      <h1 className="heading">Open Trades</h1>
      <TradesList trades={props.trades} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.DB_URL);

  const db = client.db();

  const tradesCollection = db.collection("trades");

  const trades = await tradesCollection.find().toArray();

  client.close();

  console.log(trades);

  const getPrice = async (symbol) => {
    const response = await fetch(
      `https://api.bittrex.com/v3/markets/${symbol}/ticker`
    );
    if (response.status !== 200) {
      throw new Error(response.status);
    }

    const data = await response.json();

    console.log(data.lastTradeRate);

    return data.lastTradeRate;
  };

  let tradesWithCurrentPrices = [];

  for (let i = 0; i < trades.length; i++) {
    const currentPrice = await getPrice(trades[i].symbol);
    let profit = 0;
    let percentChange = 0;

    if (trades[i].type === "long") {
      profit = currentPrice - trades[i].entryPrice;
    } else {
      profit = trades[i].entryPrice - currentPrice;
    }

    percentChange = ((profit / trades[i].entryPrice) * 100).toFixed(2);

    tradesWithCurrentPrices.push(
      new Object({
        ...trades[i],
        currentPrice,
        profit,
        percentChange,
      })
    );
  }

  console.log(tradesWithCurrentPrices);

  return {
    props: {
      trades: tradesWithCurrentPrices.map((trade) => ({
        symbol: trade.symbol,
        type: trade.type,
        entryPrice: trade.entryPrice,
        currentPrice: trade.currentPrice,
        profit: trade.profit,
        percentChange: trade.percentChange,
        id: trade._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
