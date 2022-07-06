import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import { useState } from "react";
import styles from "styles/Table.module.css";

const GetByForename: NextPage = () => {
  const [piloto, setPiloto] = useState(<p>Não houve pilotos encontrados.</p>);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      forename: event.target.Forename.value,
    };
    const endpoint = "/api/get-pilot?" + new URLSearchParams(data);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(endpoint, options).then(async (response: any) => {
      const json = await response.json();
      console.log(json);
      const str = JSON.stringify(json, null, 2);
      setPiloto(Object.values(json).map((v) => <td>{v}</td>));
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Forename">Primeiro Nome do Piloto(Forename):</label>
        <input
          type="text"
          placeholder="José da Silva"
          id="Forename"
          name="Forename"
          pattern="[a-zA-Z_]+"
          title="apenas caracteres alfabeticos"
          required
        />
        <button type="submit">Procurar por piloto</button>
      </form>
      <table className={styles.boderTable}>
        <tr className={styles.boderTable}>
          <th className={styles.boderRow}>driverid</th>
          <th className={styles.boderRow}>driverref</th>
          <th className={styles.boderRow}>number</th>
          <th className={styles.boderRow}>code</th>
          <th className={styles.boderRow}>forename</th>
          <th className={styles.boderRow}>surname</th>
          <th className={styles.boderRow}>dob</th>
          <th className={styles.boderRow}>nationality</th>
          <th className={styles.boderRow}>url</th>
        </tr>
        <tr className={styles.boderRow}>{piloto}</tr>
      </table>
      <HomeButton></HomeButton>
    </>
  );
};

export default GetByForename;
