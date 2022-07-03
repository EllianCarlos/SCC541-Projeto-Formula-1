
import Head from "next/head";
import { FC } from "react";
import styles from "../styles/Login.module.css";

const Header: FC<any> = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <center>
        <h1>
          <i>Vruuum</i>
        </h1>
      </center>
    </div>
  );
};

export default Header;