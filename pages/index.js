import Head from "next/head";
import { MongoClient } from "mongodb";
import { useSession } from "next-auth/react";

import { Fragment } from "react";
import TradesList from "../components/trades/TradesList";
import classes from "../styles/Home.module.css";
import useFetchData from "../hooks/use-fetch-data";

export default function Home(props) {
  const { data: session } = useSession();

  return (
    <Fragment>
      <Head>
        <title>Crypto Trade Manager</title>
        <meta
          name="description"
          content="Manage your crypto trades in one convenient app"
        />
      </Head>
      {session && <h1 className="heading">Open Trades</h1>}
      {session && <TradesList trades={props.trades} />}
      {!session && <p>Please sign in to use the app</p>}
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  const db = client.db();

  const tradesCollection = db.collection("trades");

  const dbTrades = await tradesCollection.find().toArray();

  client.close();

  let trades = [];

  for (let i = 0; i < dbTrades.length; i++) {
    const { currentPrice, profit, percentChange } = await useFetchData({
      symbol: dbTrades[i].symbol,
      type: dbTrades[i].type,
      entryPrice: dbTrades[i].entryPrice,
    });

    trades.push(
      new Object({
        ...dbTrades[i],
        currentPrice,
        profit,
        percentChange,
      })
    );
  }

  return {
    props: {
      trades: trades.map((trade) => ({
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
