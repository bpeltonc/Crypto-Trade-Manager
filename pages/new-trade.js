import { Fragment } from "react/cjs/react.production.min";
import Head from "next/head";
import { useRouter } from "next/router";
import NewTradeForm from "..//components/trades/NewTradeForm";

const NewTradePage = () => {
  const router = useRouter();

  const addTradeHandler = async (enteredTradeData) => {
    const response = await fetch("/api/new-trade", {
      method: "POST",
      body: JSON.stringify(enteredTradeData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.replace("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Log a New Trade</title>
        <meta
          name="description"
          content="Add your crypto trade to interpret profit or loss data"
        />
      </Head>
      <NewTradeForm onAddTrade={addTradeHandler} />
    </Fragment>
  );
};

export default NewTradePage;
