import TradeItem from "./TradeItem";
import classes from "./TradesList.module.css";

function TradeList(props) {
  return (
    <ul className={classes.list}>
      {props.trades.map((trade) => (
        <TradeItem
          key={trade.id}
          id={trade.id}
          symbol={trade.symbol}
          type={trade.type}
          entryPrice={trade.entryPrice}
          currentPrice={trade.currentPrice}
          profit={trade.profit}
          percentChange={trade.percentChange}
        />
      ))}
    </ul>
  );
}

export default TradeList;
