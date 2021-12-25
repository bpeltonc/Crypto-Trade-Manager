import Link from "next/link";
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Crypto Trade Manager</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Trades</Link>
          </li>
          <li>
            <Link href="/new-trade">Log New Trade</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
