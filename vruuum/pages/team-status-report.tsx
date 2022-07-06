import Header from "@/components/header";
import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styles from "styles/Table.module.css";

const RegisterTeam: NextPage = () => {
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
    const endpoint = "/api/team-status-report?" + new URLSearchParams(data);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(endpoint, options).then(async (value: any) => {
      const response = await value.json();
      console.log(response);
      setReport(
        response.map((value: any) => {
          return (
            <>
              <tr className={styles.boderTable}>
                <td className={styles.boderRow}>{value.nome_status}</td>
                <td className={styles.boderRow}>{value.quantidade}</td>
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
          <th className={styles.boderRow}>Status</th>
          <th className={styles.boderRow}>Quantidade</th>
        </tr>
        {report}
      </table>
      <br />
      <HomeButton></HomeButton>
    </>
  );
};

export default RegisterTeam;
