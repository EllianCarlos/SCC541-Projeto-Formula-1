import Header from "@/components/header";
import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";

const RegisterTeam: NextPage = () => {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      name: event.target.Name.value,
      nationality: event.target.Nationality.value,
      constructorref: event.target.ConsctructorRef.value,
      url: event.target.url.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/escuderia";

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
        router.push("register-team");
      } else {
        alert("Houve um erro ao cadastrar a escuderia.");
      }
    } catch (error) {
      alert("Houve um erro ao cadastrar a escuderia.");
    }
  };

  return (
    <>
      <Header></Header>
      <h2>Cadastrar Escuderia</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="ConsctructorRef">
          Nome de referência para o Construtor (apenas caracteres alfabeticos e
          o underscore):
        </label>
        <input
          className={styles.input}
          type="text"
          placeholder="escuderia_x"
          id="ConsctructorRef"
          name="ConsctructorRef"
          pattern="[a-zA-Z_]+"
          required
        />
        <label htmlFor="Name">Nome do Construtor</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Escuderia X"
          id="Name"
          name="Name"
          required
        />
        <label htmlFor="Nationality">Nacionalidade da Escuderia</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Pais Y"
          id="Nationality"
          name="Nationality"
          required
        />
        <label htmlFor="url">url da escuderia</label>
        <input
          className={styles.input}
          type="text"
          placeholder="https://wikipedia.com/escuderia-x"
          id="url"
          name="url"
          required
        />
        <br />
        <button type="submit">Adicionar Escuderia</button>
      </form>
      <br />
      <HomeButton></HomeButton>
    </>
  );
};

export default RegisterTeam;
