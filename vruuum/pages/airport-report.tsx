import Header from "@/components/header";
import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import { useState } from "react";
import styles from "styles/Table.module.css";

const RegisterTeam: NextPage = () => {
  const [report, setReport] = useState(<td>Gerando Relatório...</td>);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      cityName: encodeURIComponent(event.target.cityName.value),
    };
    const endpoint = "/api/city-report?" + new URLSearchParams(data);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(endpoint, options).then(async (value: any) => {
      const response = await value.json();

      setReport(
        response.data.map((value: any) => {
          return (
            <>
              <tr className={styles.boderTable}>
                <td className={styles.boderRow}>{value.nomecidade}</td>
                <td className={styles.boderRow}>{value.iata_code}</td>
                <td className={styles.boderRow}>{value.nome_aeroporto}</td>
                <td className={styles.boderRow}>{value.cidade_aeroporto}</td>
                <td className={styles.boderRow}>{value.distancia_c_a}</td>
                <td className={styles.boderRow}>{value.tipo_aeroporto}</td>
              </tr>
            </>
          );
        })
      );
    });
  };

  return (
    <div>
      <Header></Header>
      <h2>Relatório de Aeroportos e Cidades</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cityName">Nome da Cidade:</label>
        <input
          type="text"
          placeholder="Nome da Cidade"
          id="cityName"
          name="cityName"
          required
        />
        <button type="submit">Gerar Relatório</button>
      </form>
      <table className={styles.boderTable}>
        <tr className={styles.boderTable}>
          <th className={styles.boderRow}>nomecidade</th>
          <th className={styles.boderRow}>iata_code</th>
          <th className={styles.boderRow}>nome_aeroporto</th>
          <th className={styles.boderRow}>cidade_aeroporto</th>
          <th className={styles.boderRow}>distancia_c_a</th>
          <th className={styles.boderRow}>tipo_aeroporto</th>
        </tr>
        {report}
      </table>
      <br />
      <HomeButton></HomeButton>
    </div>
  );
};

export default RegisterTeam;
