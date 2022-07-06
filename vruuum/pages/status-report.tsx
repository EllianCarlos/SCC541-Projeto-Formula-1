import Header from "@/components/header";
import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import { useState } from "react";
import styles from "styles/Table.module.css";

const RegisterTeam: NextPage = () => {
  const [report, setReport] = useState(<p>Gerando Relatório...</p>);

  const endpoint = "/api/status-report";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = fetch(endpoint, options).then(async (value: any) => {
    const response = await value.json();

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
