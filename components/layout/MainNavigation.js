import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import classes from "./MainNavigation.module.css";

const MainNavigation = ({ email }) => {
  const { data: session } = useSession();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Crypto Trade Manager</div>
      <nav>
        <ul>
          <li>
            {session && <Link href="/">All Trades</Link>}
            {!session && <Link href="/api/auth/signin">Login/Sign Up</Link>}
          </li>
          <li>{session && <Link href="/newTrade">Log New Trade</Link>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
