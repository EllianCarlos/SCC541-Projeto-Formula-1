import type { NextPage } from "next";
import styles from "../styles/Overview.module.css";
import OverviewInfo from "../components/overview-info";
import UserActions from "../components/user-actions";

const Overview: NextPage = () => {
  let username = "Admin";

  return (
    <main className={styles.container}>
      <h2>{username}</h2>
      <OverviewInfo></OverviewInfo>
      <UserActions></UserActions>
    </main>
  );
};

export default Overview;
