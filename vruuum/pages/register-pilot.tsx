import Header from "@/components/header";
import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";

const RegisterPilot: NextPage = () => {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      forename: event.target.Forename.value,
      surname: event.target.Surname.value,
      code: event.target.Code.value,
      number: event.target.Number.value,
      birthDate: event.target.BirthDate.value,
      nationality: event.target.Nationality.value,
      url: event.target.url.value,
      driverref: event.target.Driverref.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/pilot";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      const response = await fetch(endpoint, options);
      console.log(response);
      if (response.ok) {
        router.push("register-pilot");
      } else {
        alert("Houve um erro ao cadastrar o piloto.");
      }
    } catch (error) {
      alert("Houve um erro ao cadastrar o piloto.");
    }
  };

  return (
    <>
      <Header></Header>
      <h2>Cadastrar Piloto</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="Driverref">Nome de referência para o Piloto:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="jose_da_silva"
          id="Driverref"
          name="Driverref"
          pattern="[a-zA-Z_]+"
          title="apenas caracteres alfabeticos e o underscore"
          required
        />
        <label htmlFor="Number">Número do Piloto</label>
        <input
          className={styles.input}
          type="text"
          placeholder="908098"
          id="Number"
          name="Number"
          pattern="[0-9]+"
          title="apenas caracteres numéricos"
          required
        />
        <label htmlFor="Code">Código do Piloto</label>
        <input
          className={styles.input}
          type="text"
          placeholder="C20020"
          id="Code"
          name="Code"
          required
        />
        <label htmlFor="Forename">Primeiro Nome</label>
        <input
          className={styles.input}
          type="text"
          placeholder="José"
          id="Forename"
          name="Forename"
          required
        />
        <label htmlFor="Surname">Segundo Nome</label>
        <input
          className={styles.input}
          type="text"
          placeholder="da Silva"
          id="Surname"
          name="Surname"
          required
        />
        <label htmlFor="BirthDate">Data de Nascimento</label>
        <input
          className={styles.input}
          type="date"
          placeholder="19/09/2000"
          id="BirthDate"
          name="BirthDate"
          required
        />
        <label htmlFor="Nationality">Nacionalidade</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Pais Y"
          id="Nationality"
          name="Nationality"
          required
        />
        <label htmlFor="url">URL</label>
        <input
          className={styles.input}
          type="text"
          placeholder="https://luis.com"
          id="url"
          name="url"
          required
        />
        <br />
        <button type="submit">Adicionar Piloto</button>
      </form>
      <br />
      <HomeButton></HomeButton>
    </>
  );
};

export default RegisterPilot;
