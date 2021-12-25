import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./TradeItem.module.css";

function TradeItem(props) {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.container}>
          <div className={classes.content}>{props.symbol}</div>
          <div className={classes.content}>{props.type}</div>
          <div className={classes.content}>OPEN: {props.entryPrice}</div>
          <div className={classes.content}>CURRENT: {props.currentPrice}</div>
          <div className={classes.content}>P/L: {props.profit}</div>
          <div className={classes.actions}>
            Percent Gain/Loss: {props.percentChange}
          </div>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default TradeItem;
