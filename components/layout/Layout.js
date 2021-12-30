import Head from "next/head";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { Fragment } from "react/cjs/react.production.min";

const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <MainNavigation />
        <main className={classes.main}>{props.children}</main>
        <footer className={classes.footer}>
          <div className={classes.footer_line}>
            <div className={classes.footer_content}>
              ©2021 Brandon Pelton-Cox
            </div>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Layout;
