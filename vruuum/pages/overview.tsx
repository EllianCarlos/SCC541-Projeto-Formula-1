import type { NextPage } from "next";
import styles from "../styles/Overview.module.css";
import OverviewInfo from "../components/overview-info";
import UserActions from "../components/user-actions";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Overview: NextPage = () => {
  const [cookies] = useCookies();
  const router = useRouter();
  const [tipo, setTipo] = useState('tipo');
  const [username, setUsername] = useState('username');

  useEffect(() => setTipo(cookies.user_type), [cookies.user_type])
  useEffect(() => setUsername(cookies.username), [cookies.username])

  if (tipo === null || tipo === undefined) {
    console.log("redirecting to home");
    router.push("/");
  }

  return (
    <main className={styles.container}>
      <h2>{username}</h2>
      <OverviewInfo></OverviewInfo>
      <UserActions></UserActions>
    </main>
  );
};

export default Overview;
