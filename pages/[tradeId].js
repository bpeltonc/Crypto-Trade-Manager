import { Fragment } from "react/cjs/react.production.min";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import TradeDetail from "../components/trades/TradeDetail";
import useFetchData from "../hooks/use-fetch-data";

function TradeDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.tradeData.symbol}</title>
        <meta name="description" content="trade data" />
      </Head>
      <TradeDetail
        symbol={props.tradeData.symbol}
        type={props.tradeData.type}
        entryPrice={props.tradeData.entryPrice}
        comment={props.tradeData.comment}
        currentPrice={props.tradeData.currentPrice}
        profit={props.tradeData.profit}
        percentChange={props.tradeData.percentChange}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db();

  const tradesCollection = db.collection("trades");

  const trades = await tradesCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: trades.map((trade) => ({
      params: {
        tradeId: trade._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const tradeId = context.params.tradeId;

  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db();

  const tradesCollection = db.collection("trades");

  const selectedTrade = await tradesCollection.findOne({
    _id: ObjectId(tradeId),
  });

  client.close();

  const { currentPrice, profit, percentChange } = await useFetchData(
    selectedTrade
  );

  return {
    props: {
      tradeData: {
        id: selectedTrade._id.toString(),
        symbol: selectedTrade.symbol,
        type: selectedTrade.type,
        entryPrice: selectedTrade.entryPrice,
        currentPrice,
        profit,
        percentChange,
        comment: selectedTrade.comment,
      },
    },
  };
}

export default TradeDetails;
