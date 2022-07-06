import Header from "@/components/header";
import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import styles from "../styles/Form.module.css";

const RegisterTeam: NextPage = () => {
  return <>
  <Header></Header>
  <h2>Cadastrar Escuderia</h2>
  <form action="" className={styles.form}>
    <label htmlFor="ConsctructorRef">Nome de referência para o Construtor (apenas caracteres alfabeticos e o underscore):</label>
    <input className={styles.input} type="text" placeholder="escuderia_x" id="ConsctructorRef" name="ConsctructorRef" pattern="[a-zA-Z_]+"/>
    <label htmlFor="ConsctructorRef">Nome do Construtor</label>
    <input className={styles.input} type="text" placeholder="Escuderia X" id="Name" name="Name" />
    <label htmlFor="ConsctructorRef">Nacionalidade da Escuderia</label>
    <input className={styles.input} type="text" placeholder="Pais Y" id="Nationality" name="Nationality" />
    <label htmlFor="ConsctructorRef">URL da escuderia</label>
    <input className={styles.input} type="text" placeholder="https://wikipedia.com/escuderia-x" id="URL" name="URL" />
    <br />
    <button type="submit">Adicionar Escuderia</button>
  </form>
  <br />
  <HomeButton></HomeButton>
  </>;
};

export default RegisterTeam;
