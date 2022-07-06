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
          <th className={styles.boderRow}>Cidade</th>
          <th className={styles.boderRow}>IATA</th>
          <th className={styles.boderRow}>Nome do Aeroporto</th>
          <th className={styles.boderRow}>Cidade do Aeroporto</th>
          <th className={styles.boderRow}>Distância</th>
          <th className={styles.boderRow}>Tipo do Aeroporto</th>
        </tr>
        {report}
      </table>
      <br />
      <HomeButton></HomeButton>
    </div>
  );
};

export default RegisterTeam;
