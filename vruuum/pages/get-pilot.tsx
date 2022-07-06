import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import { useState } from "react";

const Overview: NextPage = () => {
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
      // setPiloto(json);
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
      {piloto}
      <HomeButton></HomeButton>
    </>
  );
};

export default Overview;
