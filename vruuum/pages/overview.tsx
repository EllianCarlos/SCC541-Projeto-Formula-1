import type { NextPage } from "next";
import styles from "../styles/Overview.module.css";
import OverviewInfo from "../components/overview-info";
import UserActions from "../components/user-actions";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HomeButton from "@/components/home-button";
import LogoutButton from "@/components/logout-button";

const Overview: NextPage = () => {
  const [cookies] = useCookies();
  const router = useRouter();
  const [tipo, setTipo] = useState("tipo");
  const [username, setUsername] = useState("username");

  useEffect(() => setTipo(cookies.user_type), [cookies.user_type]);
  useEffect(() => setUsername(cookies.username), [cookies.username]);
  useEffect(() => {
    const data = {
      login: username,
      type: tipo,
    };
    const endpoint = "/api/get-name?" + new URLSearchParams(data);

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(endpoint, options).then(async (response) => {
      if (response.ok) {
        setUsername((await response.json()).name);
      }
    });
  }, [tipo, username]);

  if (tipo === null || tipo === undefined) {
    console.log("redirecting to home");
    router.push("/");
  }

  return (
    <>
      <main className={styles.container}>
        <h2>{username}</h2>
        <OverviewInfo></OverviewInfo>
        <UserActions></UserActions>
      </main>
      <br />
      <br />
      <LogoutButton></LogoutButton>
    </>
  );
};

export default Overview;
