import classes from "./TradeDetail.module.css";

function TradeDetail(props) {
  return (
    <section className={classes.detail}>
      <h1>{props.symbol}</h1>
      <h2>{props.type.toUpperCase()}</h2>
      <div className={classes.container}>
        <div className={classes.item}>Entry Price: {props.entryPrice}</div>
        <div className={classes.item}>Current Price: {props.currentPrice}</div>
        <div className={classes.item}>Profit: {props.profit}</div>
        <div className={classes.item}>
          Percent Change: {props.percentChange}
        </div>
      </div>
      <p>{props.comment}</p>
    </section>
  );
}

export default TradeDetail;
