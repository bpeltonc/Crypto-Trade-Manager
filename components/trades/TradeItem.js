import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./TradeItem.module.css";

function TradeItem(props) {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };

  //format data before displaying
  let currentPrice = props.currentPrice;
  let profit = props.profit;
  let isDollar = props.symbol.includes("USDT" || "USD");

  if (isDollar) {
    currentPrice = parseFloat(currentPrice).toFixed(2);
    profit = profit.toFixed(2);
  } else {
    currentPrice = parseFloat(currentPrice).toFixed(8);
    profit = profit.toFixed(8);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.container}>
          <div className={classes.content}>{props.symbol}</div>
          <div className={classes.content}>{props.type}</div>
          <div className={classes.content}>
            OPEN: {isDollar ? "$" : ""}
            {props.entryPrice}
          </div>
          <div className={classes.content}>
            CURRENT: {isDollar ? "$" : ""}
            {currentPrice}
          </div>
          <div className={classes.content}>
            P/L: {isDollar ? "$" : ""}
            {profit}
          </div>
          <div className={classes.content}>
            Percent Gain/Loss: {props.percentChange}%
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default TradeItem;
