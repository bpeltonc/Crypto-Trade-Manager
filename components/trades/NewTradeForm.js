import { useRef, Fragment } from "react";

import Card from "../ui/Card";
import classes from "./NewTradeForm.module.css";

function NewTradeForm(props) {
  const symbolInputRef = useRef();
  const shortInputRef = useRef();
  const longInputRef = useRef();
  const entryPriceInputRef = useRef();
  const commentInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    let enteredType;
    const enteredSymbol = symbolInputRef.current.value;
    const enteredEntryPrice = entryPriceInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (shortInputRef.current.checked) {
      enteredType = "short";
    } else {
      enteredType = "long";
    }

    const tradeData = {
      symbol: enteredSymbol,
      type: enteredType,
      entryPrice: enteredEntryPrice,
      comment: enteredComment,
    };

    props.onAddTrade(tradeData);
  }

  return (
    <Fragment>
      <h1 className="heading">Log an Active Trade</h1>
      <div className="form-container">
        <Card>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="symbol">Symbol</label>
              <input type="text" required id="symbol" ref={symbolInputRef} />
            </div>
            <div className={classes.control}>
              <label>Type</label>
            </div>
            <div className={classes.radioOptions}>
              <label htmlFor="long">Long</label>
              <input
                type="radio"
                name="type"
                required
                id="long"
                value="long"
                ref={longInputRef}
              />
              <label htmlFor="short">Short</label>
              <input
                type="radio"
                name="type"
                required
                id="short"
                value="short"
                ref={shortInputRef}
              />
            </div>

            <div className={classes.control}>
              <label htmlFor="entryPrice">Entry Price</label>
              <input
                type="text"
                required
                id="entryPrice"
                ref={entryPriceInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                required
                rows="5"
                ref={commentInputRef}
              ></textarea>
            </div>
            <div className={classes.actions}>
              <button>Add Trade</button>
            </div>
          </form>
        </Card>
      </div>
    </Fragment>
  );
}

export default NewTradeForm;
