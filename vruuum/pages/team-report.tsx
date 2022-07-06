import Header from "@/components/header";
import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styles from "styles/Table.module.css";

const Overview: NextPage = () => {
  const [cookies] = useCookies();
  const [report, setReport] = useState(<p>Gerando Relatório...</p>);
  const [tipo, setTipo] = useState("tipo");
  const [username, setUsername] = useState("username");
  useEffect(() => setTipo(cookies.user_type), [cookies.user_type]);
  useEffect(() => setUsername(cookies.username), [cookies.username]);
  useEffect(() => {
    const data = {
      login: username,
      type: tipo,
    };
    const endpoint = "/api/team-report?" + new URLSearchParams(data);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(endpoint, options).then(async (value: any) => {
      const response = await value.json();

      setReport(
        response.map((value: any) => {
          return (
            <>
              <tr className={styles.boderTable}>
                <td className={styles.boderRow}>{value.forename}</td>
                <td className={styles.boderRow}>{value.surname}</td>
                <td className={styles.boderRow}>{value.count}</td>
              </tr>
            </>
          );
        })
      );
    });
  }, [tipo, username]);
  return (
    <>
      <Header></Header>
      <h2>Relatório de Status</h2>
      <table className={styles.boderTable}>
        <tr className={styles.boderTable}>
          <th className={styles.boderRow}>Primeiro Nome</th>
          <th className={styles.boderRow}>Segundo Nome</th>
          <th className={styles.boderRow}>Vitórias</th>
        </tr>
        {report}
      </table>
      <br />
      <HomeButton></HomeButton>
    </>
  );
};

export default Overview;
